'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = 'http://localhost:4000/cart';

  // Helper function to get auth token
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  // Fetch cart from API
  const fetchCart = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      setCart(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError(err.message);
      toast.error('Failed to load cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Add to cart function
  const addToCart = async (productId, quantity = 1, size = '') => {
    const token = getAuthToken();
    if (!token) {
      // Redirect to login or show login modal
      window.location.href = '/login';
      return { success: false, error: 'Not authenticated' };
    }

    // Validate size parameter
    if (!size || size.trim() === '') {
      return { success: false, error: 'Size is required' };
    }

    try {
      setLoading(true);
      
      const requestBody = {
        productId: productId,  
        quantity: Number(quantity),
        size: size.trim()
      };
      
      console.log('Sending request to cart API:', requestBody);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add to cart');
      }

      // Refresh cart after successful addition
      await fetchCart();
      toast.success('Item added to cart!');
      return { success: true, data };
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to add item to cart');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove from cart');
      }

      await fetchCart();
      toast.success('Item removed from cart');
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err.message);
      toast.error('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${productId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: Number(quantity) }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      await fetchCart();
      toast.success('Cart updated');
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError(err.message);
      toast.error('Failed to update cart');
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      setCart([]);
      toast.success('Cart cleared');
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err.message);
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + (parseFloat(item.price) * item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
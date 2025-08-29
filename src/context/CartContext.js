'use client';

import { createContext, useContext, useState, useEffect } from 'react';

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
    } finally {
      setLoading(false);
    }
  };

  // Load cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Add to cart function
  const addToCart = async (productId, quantity = 1) => {
    const token = getAuthToken();
    if (!token) {
      // Redirect to login or show login modal
      window.location.href = '/login';
      return { success: false, error: 'Not authenticated' };
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,  
          quantity: Number(quantity)
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add to cart');
      }

      // Refresh cart after successful addition
      await fetchCart();
      return { success: true, data };
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.message);
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
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err.message);
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
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError(err.message);
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
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err.message);
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
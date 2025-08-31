'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/component/header';
import BelowNavLinks from '@/component/belowNavLinks';
import Footer from '@/component/footer';
import { FiPlus, FiMinus, FiTrash2, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import dynamic from 'next/dynamic';

// Dynamically import the modal to avoid SSR issues
const CheckoutModal = dynamic(() => import('@/component/CheckoutModal'), {
  ssr: false
});

export default function CartPage() {
  const [cartData, setCartData] = useState({
    items: [],
    summary: {
      subtotal: 0,
      shipping: 0,
      total: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://localhost:4000/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      setCartData(data.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`http://localhost:4000/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }
        throw new Error('Failed to remove item from cart');
      }

      // Refresh cart data after successful removal
      await fetchCart();
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item. Please try again.');
    }
  };

  const handleCheckoutComplete = async (orderData) => {
    try {
      // Clear the cart after successful payment
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:4000/cart/clear', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
      
      // Update the UI to show empty cart
      setCartData({
        items: [],
        summary: {
          subtotal: 0,
          shipping: 0,
          total: 0
        }
      });
      
      setIsCheckoutOpen(false);
      
      // Show success message or redirect to order confirmation
    } catch (error) {
      console.error('Error clearing cart after payment:', error);
      // Even if clearing cart fails, we still want to close the modal
      setIsCheckoutOpen(false);
      alert('Order placed successfully! There was an issue clearing your cart. Please contact support if items still appear in your cart.');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiRefreshCw className="animate-spin h-8 w-8 text-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-gray-600">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={fetchCart}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (cartData.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col text-gray-600">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/" 
              className="inline-flex items-center text-black hover:underline"
            >
              <FiArrowLeft className="mr-2" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl text-black font-medium">Your Cart</h1>
          <p className="text-gray-500 text-sm">{cartData.items.length} {cartData.items.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {cartData.items.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row border-b pb-6 text-gray-600">
                <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg mb-4 md:mb-0 md:mr-6 overflow-hidden">
                  {item.product.images?.[0] && (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-grow text-gray-600">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{item.product.title}</h3>
                    
                  </div>
                  <p className="text-gray-600">₹{(item.product.price).toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                </div>
                <div className="mt-4 md:mt-0 text-right text-gray-600">
                  <div className="flex justify-between gap-4">
                  <p className="font-medium">₹{((item.product.price * item.quantity)).toFixed(2)}</p>
                  <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1 text-gray-600">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{(cartData.summary.subtotal).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="flex justify-between border-t pt-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">₹{(cartData.summary.total).toFixed(2)}</span> 
                </div>
                
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  disabled={cartData.items.length === 0}
                  className={`cursor-pointer w-full bg-gray-900 text-white py-3 rounded-md font-medium hover:bg-gray-700 transition-colors ${cartData.items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Proceed to Checkout
                </button>
                
                <p className="text-sm text-gray-500 text-center mt-4">
                  or{' '}
                  <Link href="/" className="text-gray-700 hover:underline">
                    Continue Shopping
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BelowNavLinks />
      <Footer />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onComplete={handleCheckoutComplete}
        orderTotal={cartData.summary.total}
      />
    </div>
  );
}

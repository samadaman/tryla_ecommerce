'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/component/header';
import BelowNavLinks from '@/component/belowNavLinks';
import Footer from '@/component/footer';
import { FiPlus, FiMinus, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { featuredProducts } from '@/data/products';

// Create cart items from featured products
const getCartItems = () => {
  // Take first 2 products and add quantity and selected size/color
  return featuredProducts.slice(0, 2).map((product, index) => ({
    ...product,
    quantity: 1,
    size: product.sizes ? product.sizes[0] : 'M',
    color: product.colors ? product.colors[0] : '#000000',
    colorName: Array.isArray(product.colors) ? 
      (typeof product.colors[0] === 'string' ? product.colors[0] : 'Black') : 'Black'
  }));
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState(getCartItems());

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <BelowNavLinks />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/shop" 
              className="inline-flex items-center text-black hover:underline"
            >
              <FiArrowLeft className="mr-2" /> Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BelowNavLinks />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl text-black font-medium">Your Cart</h1>
          <p className="text-gray-500 text-sm">{cartItems.length} items</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <div key={item.id} className="border-b border-gray-100 py-6 last:border-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-black font-medium">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-black"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mt-1">
                      {item.colorName || 'Black'} • Size {item.size}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-500 hover:bg-gray-50"
                        >
                          <FiMinus size={16} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-500 hover:bg-gray-50"
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <p className="text-gray-600 font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        {item.oldPrice && (
                          <p className="text-xs text-gray-400 line-through">${(item.oldPrice * item.quantity).toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="md:w-80">
            <div className="bg-gray-50 p-6 rounded-md">
              <h2 className="font-medium mb-4 text-black">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-700">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-700">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex justify-between font-medium">
                  <span className="text-black">Total</span>
                  <span className="text-gray-700">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                Proceed to Checkout
              </button>
              
              <p className="mt-4 text-center text-xs text-gray-500">
                or{' '}
                <Link href="/" className="text-black hover:underline">
                  Continue Shopping
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

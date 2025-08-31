'use client';

import { useState, useEffect } from 'react';
import { FiX, FiArrowLeft, FiCreditCard, FiDollarSign, FiMapPin, FiUser, FiCheckCircle, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutModal = ({ isOpen, onClose, onComplete, orderTotal }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    paymentMethod: 'card',
    upiId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    try {
      setIsProcessing(true);
      
      // Prepare the order data according to the API requirements
      const orderData = {
        shippingAddress: formData.address,
        recipientName: formData.name,
        recipientPhone: formData.phone,
        paymentMethod: formData.paymentMethod === 'cod' ? 'CASH_ON_DELIVERY' : 'ONLINE'
      };

      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success animation
      setOrderSuccess(true);
      
      // Call onComplete after a delay to show the animation
      setTimeout(() => {
        if (onComplete) {
          onComplete({});
        }
        onClose();
        // Reset state when modal closes
        setTimeout(() => {
          setOrderSuccess(false);
          setStep(1);
          setIsProcessing(false);
        }, 300);
      }, 2500);
      
    } catch (error) {
      console.error('Order processing failed:', error);
      alert(error.message || 'Failed to process order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50 text-gray-700">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          {orderSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                }}
                className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
              >
                <FiCheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-600">Order Total</p>
                  <p className="text-xl font-bold">₹{orderTotal?.toLocaleString('en-IN') || '0.00'}</p>
                </div>
                
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    onClose();
                  }}
                  className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {step === 1 ? 'Delivery Details' : 'Payment'}
                </h2>
                <button 
                  onClick={onClose} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="px-6 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 1 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step > 1 ? '✓' : '1'}
                    </div>
                    <span className="text-xs mt-1 text-gray-600">Delivery</span>
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 2 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      2
                    </div>
                    <span className="text-xs mt-1 text-gray-600">Payment</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {step === 1 ? (
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                          placeholder=""
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                          //   placeholder="your@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                          //   placeholder="+91 1234567890"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          rows="2"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                          placeholder="Full address, Home, Floor Number, Street."
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                            placeholder="123456"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                            placeholder="State"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="card"
                          name="paymentMethod"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                          checked={formData.paymentMethod === 'card'}
                          onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                        />
                        <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                          Credit/Debit Card
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="cod"
                          name="paymentMethod"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                        />
                        <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                          Cash on Delivery (COD)
                        </label>
                      </div>
                      {formData.paymentMethod === 'card' && (
                        <div className="mt-4 space-y-4 pl-7">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {formData.paymentMethod === 'cod' && (
                        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-yellow-700">
                                Pay with cash when your order is delivered. An additional ₹50 may be charged for COD orders.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Order Total:</span>
                    <span className="font-semibold">₹{orderTotal?.toLocaleString('en-IN') || '0.00'}</span>
                  </div>
                  
                  <div className="flex space-x-3">
                    {step === 2 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
                        step === 1 ? 'bg-black hover:bg-gray-900' : 'bg-gray-900 hover:bg-gray-700'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : step === 1 ? (
                        'Continue to Payment'
                      ) : (
                        `Pay ₹${orderTotal?.toLocaleString('en-IN') || '0.00'}`
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheckoutModal;

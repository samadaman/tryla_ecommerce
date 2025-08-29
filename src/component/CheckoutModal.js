'use client';

import { useState } from 'react';
import { FiX, FiArrowLeft, FiCreditCard, FiDollarSign, FiMapPin, FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';

const CheckoutModal = ({ isOpen, onClose, onComplete, orderTotal }) => {
  const [step, setStep] = useState(1);
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
      // In a real app, you would call your backend API to process the payment
      // and get the redirect URL. Here's a simplified example:
      
      let paymentUrl = '';
      
      switch(formData.paymentMethod) {
        case 'card':
          // Process card payment (in a real app, you would use a payment processor like Stripe Elements)
          paymentUrl = `/api/payments/process-card`;
          break;
          
        case 'upi':
          // Generate UPI payment URL
          paymentUrl = `upi://pay?pa=${encodeURIComponent(formData.upiId || 'merchant@upi')}&pn=Tryla&am=${orderTotal}&cu=INR&tn=Tryla%20Order`;
          break;
          
        case 'paypal':
          // Redirect to PayPal
          paymentUrl = `https://www.paypal.com/checkoutnow?token=YOUR_PAYPAL_TOKEN`;
          break;
          
        case 'stripe':
          // Redirect to Stripe Checkout
          paymentUrl = `https://checkout.stripe.com/pay/cs_test_${Math.random().toString(36).substring(2, 15)}`;
          break;
          
        default:
          throw new Error('Invalid payment method');
      }
      
      // In a real app, you would handle the payment processing on your backend
      // and then redirect to the payment gateway
      window.location.href = paymentUrl;
      
      // For demo purposes, we'll just log the payment data
      console.log('Processing payment:', {
        ...formData,
        amount: orderTotal,
        currency: 'INR',
        paymentMethod: formData.paymentMethod
      });
      
      // Call the onComplete callback with the form data
      onComplete(formData);
      
    } catch (error) {
      console.error('Payment processing failed:', error);
      alert('Payment processing failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50 text-gray-700">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
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
              <div className="space-y-3">
                {['card', 'upi', 'paypal', 'stripe'].map((method) => (
                  <div
                    key={method}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method }))}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.paymentMethod === method ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        formData.paymentMethod === method ? 'border-black' : 'border-gray-300'
                      }`}>
                        {formData.paymentMethod === method && (
                          <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                        )}
                      </div>
                      <span className="capitalize">
                        {method === 'upi' ? 'UPI' : 
                         method === 'stripe' ? 'Stripe' : 
                         method.charAt(0).toUpperCase() + method.slice(1)}
                      </span>
                      {method === 'upi' && (
                        <span className="ml-2 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-3 mt-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
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

              {formData.paymentMethod === 'upi' && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="yourname@upi"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Complete the payment using your preferred UPI app.
                  </p>
                </div>
              )}

              {formData.paymentMethod === 'stripe' && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <p className="text-sm text-gray-600 text-center">
                    You'll be redirected to Stripe to complete your payment securely.
                  </p>
                  <div className="flex justify-center mt-2">
                    <div className="bg-white p-2 rounded border">
                      {/* Stripe logo or payment method icons */}
                      <div className="flex space-x-2">
                        <div className="w-10 h-6 bg-gray-100 rounded"></div>
                        <div className="w-10 h-6 bg-gray-100 rounded"></div>
                        <div className="w-10 h-6 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {formData.paymentMethod === 'card' && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <p className="text-sm text-gray-600 text-center">
                    Your card will be charged securely. We don't store your card details.
                  </p>
                </div>
              )}
              
              {formData.paymentMethod === 'paypal' && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <p className="text-sm text-gray-600 text-center">
                    You'll be redirected to PayPal to complete your purchase.
                  </p>
                </div>
              )}
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
                className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
                  step === 1 ? 'bg-black hover:bg-gray-800' : 'bg-gray-900 hover:bg-gray-700'
                }`}
              >
                {step === 1 ? 'Continue to Payment' : `Pay ₹${orderTotal?.toLocaleString('en-IN') || '0.00'}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;

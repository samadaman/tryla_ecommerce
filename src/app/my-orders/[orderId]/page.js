'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/component/header';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiArrowLeft, FiMapPin, FiCreditCard } from 'react-icons/fi';

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`http://localhost:4000/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch order details');
      }

      const data = await response.json();
      setOrder(data.data);
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusDetails = (status) => {
    const statuses = {
      'pending': {
        icon: <FiClock className="text-yellow-500" />,
        color: 'bg-yellow-100 text-yellow-800',
        message: 'Your order is being processed',
        steps: [
          { id: 'ordered', name: 'Ordered', status: 'complete' },
          { id: 'processed', name: 'Processed', status: 'current' },
          { id: 'shipped', name: 'Shipped', status: 'upcoming' },
          { id: 'delivered', name: 'Delivered', status: 'upcoming' },
        ]
      },
      'processing': {
        icon: <FiPackage className="text-blue-500" />,
        color: 'bg-blue-100 text-blue-800',
        message: 'Your order is being prepared for shipment',
        steps: [
          { id: 'ordered', name: 'Ordered', status: 'complete' },
          { id: 'processed', name: 'Processed', status: 'complete' },
          { id: 'shipped', name: 'Shipped', status: 'current' },
          { id: 'delivered', name: 'Delivered', status: 'upcoming' },
        ]
      },
      'shipped': {
        icon: <FiTruck className="text-indigo-500" />,
        color: 'bg-indigo-100 text-indigo-800',
        message: 'Your order is on the way',
        steps: [
          { id: 'ordered', name: 'Ordered', status: 'complete' },
          { id: 'processed', name: 'Processed', status: 'complete' },
          { id: 'shipped', name: 'Shipped', status: 'complete' },
          { id: 'delivered', name: 'Delivered', status: 'current' },
        ]
      },
      'delivered': {
        icon: <FiCheckCircle className="text-green-500" />,
        color: 'bg-green-100 text-green-800',
        message: 'Your order has been delivered',
        steps: [
          { id: 'ordered', name: 'Ordered', status: 'complete' },
          { id: 'processed', name: 'Processed', status: 'complete' },
          { id: 'shipped', name: 'Shipped', status: 'complete' },
          { id: 'delivered', name: 'Delivered', status: 'complete' },
        ]
      },
      'cancelled': {
        icon: <FiClock className="text-red-500" />,
        color: 'bg-red-100 text-red-800',
        message: 'Your order has been cancelled',
        steps: []
      }
    };

    return statuses[status.toLowerCase()] || {
      icon: <FiPackage className="text-gray-500" />,
      color: 'bg-gray-100 text-gray-800',
      message: 'Your order status is being updated',
      steps: []
    };
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-gray-600">
        <p className="text-red-500 mb-4">Error: {error || 'Order not found'}</p>
        <button
          onClick={fetchOrderDetails}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        >
          Retry
        </button>
        <Link 
          href="/my-orders" 
          className="mt-4 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const statusDetails = getStatusDetails(order.status);
  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button 
              onClick={() => router.back()}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <FiArrowLeft className="mr-2" /> Back to orders
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900">
                  Order #{order.orderNumber}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Placed on {formattedDate}
                </p>
              </div>
              <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${statusDetails.color}`}>
                {statusDetails.icon}
                <span className="ml-1.5">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </span>
            </div>

            {/* Order Status Steps */}
            {statusDetails.steps.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="max-w-3xl mx-auto">
                  <p className="text-sm text-gray-500 mb-4">{statusDetails.message}</p>
                  <div className="relative">
                    <div className="absolute top-4 left-4 h-full w-0.5 bg-gray-200"></div>
                    <ul className="relative">
                      {statusDetails.steps.map((step, stepIdx) => (
                        <li key={step.id} className="mb-10">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <span className={`flex items-center justify-center h-8 w-8 rounded-full ${step.status === 'complete' ? 'bg-indigo-600' : step.status === 'current' ? 'bg-white border-2 border-indigo-600' : 'bg-gray-200'}`}>
                                {step.status === 'complete' ? (
                                  <FiCheckCircle className="h-5 w-5 text-white" />
                                ) : step.status === 'current' ? (
                                  <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full"></span>
                                ) : (
                                  <span className="h-2.5 w-2.5 bg-gray-300 rounded-full"></span>
                                )}
                              </span>
                            </div>
                            <div className="ml-4">
                              <h3 className={`text-sm font-medium ${step.status === 'complete' ? 'text-indigo-600' : 'text-gray-500'}`}>
                                {step.name}
                              </h3>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
                </div>
                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="p-4 sm:p-6">
                        <div className="flex items-start sm:items-center">
                          <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                            {item.product.images?.[0] && (
                              <img
                                src={item.product.images[0]}
                                alt={item.product.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="ml-6 flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-base font-medium text-gray-900">
                                {item.product.title}
                              </h3>
                              <p className="ml-4 text-sm font-medium text-gray-900">
                                ₹{item.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                              Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              {/* Shipping Address */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiMapPin className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {order.shippingAddress.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.shippingAddress.street}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                        {order.shippingAddress.country}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Phone: {order.shippingAddress.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCreditCard className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {order.paymentMethod}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.paymentMethod === 'credit_card' && `Ending with ${order.paymentDetails.last4}`}
                        {order.paymentMethod === 'paypal' && order.paymentDetails.email}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Billing address same as shipping
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <dl className="space-y-4">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">₹{order.subtotal.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {order.shippingCost === 0 ? 'Free' : `₹${order.shippingCost.toFixed(2)}`}
                      </dd>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-sm text-green-600">Discount</dt>
                        <dd className="text-sm font-medium text-green-600">-₹{order.discount.toFixed(2)}</dd>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <dt className="text-base font-medium text-gray-900">Total</dt>
                      <dd className="text-base font-medium text-gray-900">₹{order.totalAmount.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

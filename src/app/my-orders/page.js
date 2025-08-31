'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/component/header';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiX, FiArrowLeft } from 'react-icons/fi';

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
          router.push('/login');
          return;
        }

        const response = await fetch('http://localhost:4000/orders/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const { data } = await response.json();
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <FiClock className="mr-1.5 h-4 w-4" />,
        text: 'Pending'
      },
      PROCESSING: {
        color: 'bg-blue-100 text-blue-800',
        icon: <FiPackage className="mr-1.5 h-4 w-4" />,
        text: 'Processing'
      },
      SHIPPED: {
        color: 'bg-indigo-100 text-indigo-800',
        icon: <FiTruck className="mr-1.5 h-4 w-4" />,
        text: 'Shipped'
      },
      DELIVERED: {
        color: 'bg-green-100 text-green-800',
        icon: <FiCheckCircle className="mr-1.5 h-4 w-4" />,
        text: 'Delivered'
      },
      CANCELLED: {
        color: 'bg-red-100 text-red-800',
        icon: <FiX className="mr-1.5 h-4 w-4" />,
        text: 'Cancelled'
      }
    };

    const config = statusConfig[status] || {
      color: 'bg-gray-100 text-gray-800',
      text: status
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 p-1 rounded-full hover:bg-gray-100"
            >
              <FiArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="mt-1 text-sm text-gray-500">View and manage your orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
              <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-sm text-gray-500">Order #{order.id.slice(-8).toUpperCase()}</p>
                      <p className="text-sm font-medium text-gray-900">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                      <div className="mt-1">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-500">Total Amount</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ₹{(order.total / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Order Items</h3>
                    <div className="space-y-4">
                      {order.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-start">
                          <div className="flex-shrink-0 h-16 w-16 overflow-hidden rounded-md border border-gray-200">
                            {item.product?.images?.[0] ? (
                              <img
                                src={item.product.images[0]}
                                alt={item.product.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                <FiPackage className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between text-sm">
                              <h4 className="text-gray-900 font-medium">
                                {item.product?.title || 'Product not available'}
                              </h4>
                              <p className="ml-4 text-gray-900">
                                ₹{(item.price / 100).toFixed(2)}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-sm text-gray-500">
                              Subtotal: ₹{((item.price * item.quantity) / 100).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <p className="text-gray-500">Shipping Address</p>
                        <p className="text-gray-900">{order.shippingAddress}</p>
                        <p className="text-gray-900">{order.recipientName}</p>
                        <p className="text-gray-900">{order.recipientPhone}</p>
                      </div>
                      <button
                        onClick={() => router.push(`/my-orders/${order.id}`)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

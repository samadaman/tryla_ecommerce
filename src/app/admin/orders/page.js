'use client';

import { useEffect, useState } from 'react';

const styles = `
  .glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  }
  .glass-dark {
    background: rgba(17, 24, 39, 0.75);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
`;

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState('PENDING');

  const API_URL = 'http://localhost:4000/orders';

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const res = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.status === 401) {
        // Handle unauthorized (token expired or invalid)
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to fetch orders');
      }

      const result = await res.json();
      if (result.ok && Array.isArray(result.data)) {
        setOrders(result.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Update order status
  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }
  
      const response = await fetch(`http://localhost:4000/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status }),
      });
  
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
        return;
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update order status');
      }
  
      // Update the order in the local state
      setOrders(orders.map(order => 
        order.orderId === orderId ? { ...order, status } : order
      ));
      
      // Update the selected order if it's the one being viewed
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message);
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PAID':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Helper function to get the next status in the workflow
  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'PENDING': 'PAID',
      'PAID': 'SHIPPED',
      'SHIPPED': 'DELIVERED',
      'DELIVERED': 'DELIVERED',
      'CANCELLED': 'CANCELLED'
    };
    return statusFlow[currentStatus] || currentStatus;
  };

  // Get action button label based on status
  const getActionLabel = (status) => {
    const labels = {
      'PENDING': 'Mark as Paid',
      'PAID': 'Mark as Shipped',
      'SHIPPED': 'Mark as Delivered',
      'DELIVERED': 'Delivered',
      'CANCELLED': 'Cancelled'
    };
    return labels[status] || 'Update';
  };

  // Group orders by status
  const groupedOrders = orders.reduce((acc, order) => {
    const status = order.status || 'PENDING';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(order);
    return acc;
  }, {});

  // Status display configuration
  const statusConfig = {
    'PENDING': {
      title: 'Pending',
      icon: '⏳',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200'
    },
    'PAID': {
      title: 'Paid',
      icon: '💳',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200'
    },
    'SHIPPED': {
      title: 'Shipped',
      icon: '🚚',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-800',
      borderColor: 'border-indigo-200'
    },
    'DELIVERED': {
      title: 'Delivered',
      icon: '✅',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    },
    'CANCELLED': {
      title: 'Cancelled',
      icon: '❌',
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      borderColor: 'border-red-200'
    }
  };

  // Order statuses in the desired display order
  const statusOrder = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <style jsx global>{styles}</style>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Status Tabs */}
      <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
        {statusOrder.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeStatus === status
                ? `${statusConfig[status].bgColor} ${statusConfig[status].textColor} shadow-sm`
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {statusConfig[status].icon} {statusConfig[status].title} 
            <span className="ml-1">
              ({groupedOrders[status]?.length || 0})
            </span>
          </button>
        ))}
      </div>

      {/* Status Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-gray-600">
        {statusOrder.map((status) => (
          <div key={status} className="space-y-4">
            <div className={`flex items-center justify-between p-3 rounded-lg ${statusConfig[status].bgColor} ${statusConfig[status].borderColor} border-l-4`}>
              <h2 className="font-medium flex items-center">
                <span className="mr-2">{statusConfig[status].icon}</span>
                {statusConfig[status].title}
              </h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status].bgColor.replace('50', '100')} ${statusConfig[status].textColor}`}>
                {groupedOrders[status]?.length || 0}
              </span>
            </div>
            <div className="space-y-3">
              {groupedOrders[status]?.map((order) => (
                <div 
                  key={order.id}
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsModalOpen(true);
                  }}
                  className={`p-4 bg-white rounded-lg shadow-sm border ${statusConfig[status].borderColor} border-l-4 hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">Order #{order.id.slice(-6).toUpperCase()}</p>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig[status].textColor} ${statusConfig[status].bgColor}`}>
                      {statusConfig[status].title}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">{order.items?.length} items</p>
                    <p className="text-sm font-medium text-gray-700 font-semibold mt-1">${(parseInt(order.total)).toFixed(2)}</p>
                  </div>
                </div>
              )) || (
                <div className="p-4 text-center text-gray-500 text-sm bg-gray-50 rounded-lg">
                  No {status.toLowerCase()} orders
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Existing Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-start p-4 z-50 overflow-y-auto">
          <div className="glass w-full max-w-5xl my-8 rounded-2xl overflow-hidden transform transition-all duration-300 ease-in-out">
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-3">
                    <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                      Order #{selectedOrder.id.slice(-6).toUpperCase()}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1 text-sm">
                    <span className="font-medium">Placed on</span> {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Items */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Order Items
                    </h3>
                    <div className="overflow-hidden rounded-xl border border-gray-100">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedOrder.items?.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                      className="h-full w-full object-cover"
                                      src={item.product?.images?.[0] || '/placeholder-product.jpg'}
                                      alt={item.product?.title}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{item.product?.title}</div>
                                    <div className="text-xs text-gray-500 mt-1">SKU: {item.productId}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                ${(parseInt(item.price))}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                ${(parseInt(item.price) * item.quantity ).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Order Summary
                    </h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${(parseInt(selectedOrder.total)).toFixed(2)}</span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span className="text-indigo-600">${(parseInt(selectedOrder.total)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Customer Information
                    </h3>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {selectedOrder.user?.name?.charAt(0) || 'U'}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{selectedOrder.user?.name || 'Guest'}</h4>
                        <p className="text-sm text-gray-500">{selectedOrder.user?.email || 'No email'}</p>
                        <div className="mt-2 text-sm space-y-1">
                          <p className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10l-4 4m0 0l-4-4m4 4V5a3 3 0 0116 0v1m0 0a3 3 0 01-6 0M5 9a2 2 0 00-2 2v1a2 2 0 110 4v-1a2 2 0 012-2m0-1a2 2 0 012-2v1a2 2 0 01-2 2m0 0a2 2 0 01-2-2v1a2 2 0 012 2m0-1a2 2 0 012-2v1a2 2 0 01-2 2" />
                            </svg>
                            Member since {formatDate(selectedOrder.user?.createdAt)}
                          </p>
                          <p className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            {selectedOrder.user?.role || 'Customer'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Shipping Information
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/50 rounded-lg border border-gray-100">
                        <p className="font-medium text-gray-900">{selectedOrder.recipientName}</p>
                        <p className="text-gray-600">{selectedOrder.shippingAddress}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {selectedOrder.recipientPhone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Update Status
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(selectedOrder.id, status)}
                          className={` px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selectedOrder.status === status
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                              : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all font-medium flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

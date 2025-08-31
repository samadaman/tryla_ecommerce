'use client';

import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      const response = await fetch(`${API_URL}/${orderId}/status`, {
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
        throw new Error('Failed to update order status');
      }

      // Update the order in the local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
      
      // Update the selected order if it's the one being viewed
      if (selectedOrder && selectedOrder.id === orderId) {
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

  return (
    <div className="container mx-auto p-6">
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

      {loading && !orders.length ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer?.name || 'Guest'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customer?.email || 'No email'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${(order.total / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Order #{selectedOrder.id.slice(-6).toUpperCase()}</h2>
                  <p className="text-sm text-gray-500">Placed on {formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.items?.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-16 w-16">
                                  <img
                                    className="h-16 w-16 rounded-md object-cover"
                                    src={item.product?.images?.[0] || '/placeholder-product.jpg'}
                                    alt={item.product?.name}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{item.product?.name}</div>
                                  <div className="text-sm text-gray-500">{item.variant?.name || 'Default'}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                              ${(item.price / 100).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                              ${((item.price * item.quantity) / 100).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${(selectedOrder.subtotal / 100).toFixed(2)}</span>
                      </div>
                      {selectedOrder.discount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount</span>
                          <span className="text-green-600">-${(selectedOrder.discount / 100).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">${(selectedOrder.shipping / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">${(selectedOrder.tax / 100).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${(selectedOrder.total / 100).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Information</h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="font-medium">{selectedOrder.customer?.name || 'Guest'}</p>
                      <p className="text-gray-600">{selectedOrder.customer?.email || 'No email provided'}</p>
                      <p className="text-gray-600">{selectedOrder.customer?.phone || 'No phone provided'}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping Address</h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      {selectedOrder.shippingAddress ? (
                        <>
                          <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                          <p>{selectedOrder.shippingAddress.line1}</p>
                          {selectedOrder.shippingAddress.line2 && <p>{selectedOrder.shippingAddress.line2}</p>}
                          <p>
                            {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                          </p>
                          <p>{selectedOrder.shippingAddress.country}</p>
                          <p className="mt-2">
                            <span className="font-medium">Phone:</span> {selectedOrder.shippingAddress.phone}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-500">No shipping address provided</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Update Status</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(selectedOrder.id, status)}
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            selectedOrder.status === status
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Add print functionality
                  window.print();
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

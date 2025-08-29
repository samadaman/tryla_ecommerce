'use client';

import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const API_URL = 'http://localhost:4000/orders';

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch single order details
  const viewOrderDetails = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setSelectedOrder(data);
    } catch (err) {
      console.error('Error fetching order details:', err);
    }
  };

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchOrders();
      setSelectedOrder(null);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">${order.total}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => viewOrderDetails(order.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p><strong>ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
            <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Total:</strong> ${selectedOrder.total}</p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Update Status</h3>
              {['PAID', 'SHIPPED', 'DELIVERED'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(selectedOrder.id, status)}
                  className="mr-2 mb-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FaBox, 
  FaShoppingCart, 
  FaClipboardList, 
  FaPlus, 
  FaUsers, 
  FaChartLine, 
  FaDollarSign, 
  FaBoxOpen,
  FaSpinner,
  FaArrowRight
} from 'react-icons/fa';

// Glassmorphism styles
const glassStyle = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    products: 0,
    productsInStock: 0,
    orders: 0,
    totalRevenue: 0,
    loading: true
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.role !== "ADMIN") {
        router.push("/");
        return;
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true }));
        
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
        
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
        
        // Fetch products and orders in parallel with auth headers
        const [productsRes, ordersRes] = await Promise.all([
          fetch('http://localhost:4000/products', { 
            headers 
          }),
          fetch('http://localhost:4000/orders', { 
            headers 
          })
        ]);
        
        if (!productsRes.ok || !ordersRes.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();
        
        console.log('Products Data:', productsData);
        console.log('Orders Data:', ordersData);
        
        // Calculate stats
        const totalProductsInStock = productsData?.data?.reduce(
          (total, product) => total + (parseInt(product.stock) || 0), 
          0
        ) || 0;

        // Calculate total revenue from delivered orders
        const totalRevenue = ordersData?.data?.reduce(
          (total, order) => {
            // Only count delivered orders for revenue
            if (order.status === 'DELIVERED') {
              return total + (parseFloat(order.total) || 0);
            }
            return total;
          },
          0
        ) || 0;

        // Count all orders regardless of status
        const totalOrders = ordersData?.data?.length || 0;

        setStats({
          products: productsData?.data?.length || 0,
          productsInStock: totalProductsInStock,
          orders: totalOrders,
          totalRevenue: totalRevenue,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setOrdersLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('http://localhost:4000/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch orders');
        
        const data = await response.json();
        setRecentOrders(data.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  const StatusBadge = ({ status }) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'Admin'}! Here's what's happening today.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Products"
          value={stats.products}
          icon={<FaBox className="text-blue-500 text-xl" />}
          loading={stats.loading}
          color="blue"
        />
        
        <StatCard 
          title="In Stock"
          value={stats.productsInStock}
          icon={<FaBoxOpen className="text-green-500 text-xl" />}
          loading={stats.loading}
          color="green"
        />
        
        <StatCard 
          title="Total Orders"
          value={stats.orders}
          icon={<FaClipboardList className="text-purple-500 text-xl" />}
          loading={stats.loading}
          color="purple"
        />
        
        <StatCard 
          title="Total Revenue" 
          value={`${(stats.totalRevenue || 0).toLocaleString()}`}
          icon={<FaDollarSign className="text-yellow-500 text-xl" />}
          loading={stats.loading}
          color="yellow"
          isCurrency={true}
        />
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div style={glassStyle} className="p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaChartLine className="mr-2 text-indigo-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ActionButton 
                icon={<FaPlus className="text-blue-500" />}
                title="Add Product"
                description="Create a new product"
                onClick={() => router.push('/admin/products')}
                color="blue"
              />
              
              <ActionButton 
                icon={<FaClipboardList className="text-purple-500" />}
                title="View Orders"
                description="Manage all orders"
                onClick={() => router.push('/admin/orders')}
                color="purple"
              />
              
              <ActionButton 
                icon={<FaBox className="text-green-500" />}
                title="Manage Inventory"
                description="View and update stock"
                onClick={() => router.push('/admin/products')}
                color="green"
              />
              
              <ActionButton 
                icon={<FaUsers className="text-yellow-500" />}
                title="Manage Users"
                description="User management"
                onClick={() => {}}
                color="yellow"
                disabled={true}
              />
            </div>
          </div>
        </div>
        
        <div>
          <div style={glassStyle} className="p-6 rounded-2xl h-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaChartLine className="mr-2 text-indigo-500" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              <ActivityItem 
                title="New order received"
                time="2 min ago"
                icon="🛒"
              />
              <ActivityItem 
                title="Product low in stock"
                time="1 hour ago"
                icon="⚠️"
              />
              <ActivityItem 
                title="New user registered"
                time="3 hours ago"
                icon="👤"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div style={glassStyle} className="p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          <button 
            onClick={() => router.push('/admin/orders')}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            View All <FaArrowRight className="ml-1 text-xs" />
          </button>
        </div>
        
        {ordersLoading ? (
          <div className="flex justify-center py-8">
            <FaSpinner className="animate-spin text-indigo-500 text-xl" />
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FaClipboardList className="mx-auto text-3xl mb-2 opacity-30" />
            <p>No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.slice(0, 5).map((order) => (
                  <tr key={order._id || Math.random().toString(36).substr(2, 9)} className="hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/admin/orders/${order._id || ''}`)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.orderNumber || (order._id ? order._id.substring(0, 6) : 'N/A')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.user?.name || 'Guest User'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt || new Date())}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={order.status || 'pending'} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      ${parseFloat(order.total || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, loading, color, isCurrency = false }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };

  return (
    <div style={glassStyle} className="p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {loading ? (
            <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse mt-2"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-800">
              {isCurrency ? `$${value}` : value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Action Button Component
function ActionButton({ icon, title, description, onClick, color, disabled = false }) {
  const colorClasses = {
    blue: 'hover:bg-blue-50 border-blue-100',
    green: 'hover:bg-green-50 border-green-100',
    purple: 'hover:bg-purple-50 border-purple-100',
    yellow: 'hover:bg-yellow-50 border-yellow-100'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-start p-4 border rounded-xl transition-colors ${colorClasses[color]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div className="mr-3 mt-0.5">
        {icon}
      </div>
      <div className="text-left">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
}

// Activity Item Component
function ActivityItem({ title, time, icon }) {
  return (
    <div className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mr-3">
        {icon}
      </div>
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
}

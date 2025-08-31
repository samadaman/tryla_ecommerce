'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/component/header';
import { FiUser, FiPackage, FiClock, FiCheckCircle, FiTruck, FiLogOut, FiEdit2, FiInfo, FiX } from 'react-icons/fi';

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
          router.push('/login');
          return;
        }

        const user = JSON.parse(userData);
        setUser(user);
        
        // Initialize form data with user data
        setFormData({
          name: user.name || '',
          phone: user.phone || '',
          address: user.address || ''
        });

        // Fetch user orders
        const ordersResponse = await fetch('http://localhost:4000/orders/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (ordersResponse.ok) {
          const { data } = await ordersResponse.json();
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    // Check URL for tab parameter
    const tab = searchParams.get('tab');
    if (tab === 'orders') {
      setActiveTab('orders');
    } else {
      setActiveTab('profile');
    }
  }, [searchParams]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For phone number, only allow numbers and limit to 10 digits
    let processedValue = value;
    if (name === 'phone') {
      // Remove any non-digit characters
      processedValue = value.replace(/\D/g, '');
      // Limit to 10 digits
      processedValue = processedValue.slice(0, 10);
    }
    
    // Only update the form data state
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSaveProfile = async () => {
    try {
      // Basic validation
      if (!formData.name.trim()) {
        alert('Please enter your name');
        return;
      }

      if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
      }

      // Get current user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      // Update user data with new values
      const updatedUser = {
        ...userData,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        updatedAt: new Date().toISOString()
      };

      // Save updated user data to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      setIsEditing(false);
      
      // Optional: Show success message
      alert('Profile updated successfully!');
      
      // Optional: You can also update the backend here if needed in the future
      /*
      const response = await fetch('http://localhost:4000/api/users/update-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim()
        })
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsEditing(false);
      } else {
        throw new Error('Failed to update profile');
      }
      */

    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

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
      icon: <FiInfo className="mr-1.5 h-4 w-4" />,
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="border-b border-gray-100">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-5 px-6 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center`}
              >
                <FiUser className="mr-2.5" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`${
                  activeTab === 'orders'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-5 px-6 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center`}
              >
                <FiPackage className="mr-2.5" />
                My Orders
              </button>
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'profile' ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm text-gray-500">Update your personal details and address</p>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                      <FiEdit2 className="mr-2 h-4 w-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveProfile();
                }} className="space-y-6">
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`block w-full px-4 py-3 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' : 'border-transparent bg-gray-50'} text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out`}
                        placeholder="Enter your full name"
                      />
                      {!isEditing && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <FiEdit2 className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        disabled
                        className="block w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <span className="text-xs text-gray-500">
                          Can't change
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">+91</span>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`block w-full pl-12 pr-4 py-3 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' : 'border-transparent bg-gray-50'} text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out`}
                        placeholder="98765 43210"
                        maxLength="10"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Delivery Address
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`block w-full px-4 py-3 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' : 'border-transparent bg-gray-50'} text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out`}
                        placeholder="Enter your complete delivery address"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Include apartment/floor number, street, city, and PIN code
                    </p>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          // Reset form data from user data in state
                          setFormData({
                            name: user.name,
                            phone: user.phone || '',
                            address: user.address || ''
                          });
                        }}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>

                <div className="pt-6 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                    <p className="mt-1 text-sm text-gray-500">Your recent order history and details</p>
                  </div>
                  <button
                    onClick={() => router.push('/my-orders')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    View All Orders
                  </button>
                </div>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <FiPackage className="mx-auto h-16 w-16 text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Your orders will appear here once you've made a purchase.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => router.push('/')}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                      >
                        Start Shopping
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <h3 className="text-lg font-medium text-gray-900">Order #{order.id.slice(-8).toUpperCase()}</h3>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
                              <p className="mt-2 text-sm text-gray-500">
                                {order.items.length} item{order.items.length !== 1 ? 's' : ''} • Total: 
                                <span className="ml-1 font-medium text-gray-900">₹{(order.total / 100).toFixed(2)}</span>
                              </p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                              <button
                                onClick={() => router.push(`/my-orders/${order.id}`)}
                                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-6 pt-6 border-t border-gray-100">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Items</h4>
                            <div className="space-y-4">
                              {order.items.slice(0, 2).map((item, idx) => (
                                <div key={idx} className="flex items-start">
                                  <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                    {item.product?.images?.[0] ? (
                                      <img
                                        src={item.product.images[0]}
                                        alt={item.product.title}
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                                        <FiPackage className="h-6 w-6" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="ml-4 flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                      {item.product?.title || 'Product not available'}
                                    </h4>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Qty: {item.quantity} • ₹{(item.price / 100).toFixed(2)} each
                                    </p>
                                    {item.size && (
                                      <p className="mt-1 text-xs text-gray-500">Size: {item.size}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            {order.items.length > 2 && (
                              <div className="mt-4 text-center">
                                <span className="text-sm text-gray-500">+{order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {orders.length > 3 && (
                      <div className="text-center">
                        <button
                          onClick={() => router.push('/my-orders')}
                          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                        >
                          View all {orders.length} orders
                          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

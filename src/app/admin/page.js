'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBox, FaShoppingCart, FaList, FaPlusCircle, FaTags, FaClipboardList, FaUsers, FaSpinner } from 'react-icons/fa';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    products: 0,
    productsInStock: 0,
    orders: 0,
    loading: true
  });

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
        
        // Fetch products
        const productsRes = await fetch('http://localhost:4000/products');
        const productsData = await productsRes.json();

        
        // Debug: Log the first few products if they exist
        if (productsData.data && Array.isArray(productsData.data)) {
          console.log('First product:', productsData.data[0]);
          console.log('Number of products:', productsData.data.length);
        }
        
        // Fetch orders
        const ordersRes = await fetch('http://localhost:4000/orders');
        const ordersData = await ordersRes.json();
        
        // Calculate total products in stock
        const totalProductsInStock = productsData.data?.reduce(
          (total, product) => total + (parseInt(product.stock) || 0), 
          0
        );

        setStats({
          products: productsData.data?.length || 0,
          productsInStock: totalProductsInStock,
          orders: ordersData.data?.length || 0,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user?.name || 'Admin'}! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your store today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              {stats.loading ? (
                <FaSpinner className="animate-spin text-blue-500 mt-2" />
              ) : (
                <p className="text-2xl font-bold text-gray-800">{stats.products}</p>
              )}
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaBox className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Products in Stock</p>
              {stats.loading ? (
                <FaSpinner className="animate-spin text-green-500 mt-2" />
              ) : (
                <p className="text-2xl font-bold text-gray-800">{stats.productsInStock}</p>
              )}
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FaShoppingCart className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            {stats.loading ? (
              <FaSpinner className="animate-spin text-yellow-500 mt-2" />
            ) : (
              <p className="text-2xl font-bold text-gray-800">{stats.orders}</p>
            )}
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <FaClipboardList className="text-yellow-600 text-xl" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => router.push('/admin/products/new')}
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaPlusCircle className="text-blue-500 mr-2" />
            Add Product
          </button>
          <button 
            onClick={() => router.push('/admin/orders')}
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaClipboardList className="text-yellow-500 mr-2" />
            View Orders
          </button>
          <button 
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            disabled
            title="Coming soon"
          >
            <FaUsers className="text-purple-500 mr-2" />
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
}

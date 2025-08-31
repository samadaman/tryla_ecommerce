'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/component/header';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch category details
        const categoryResponse = await fetch(`http://localhost:4000/categories/${categoryId}`);
        if (!categoryResponse.ok) throw new Error('Category not found');
        const categoryData = await categoryResponse.json();
        setCategory(categoryData);

        // Fetch products for this category
        const productsResponse = await fetch('http://localhost:4000/products/filters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categories: [{ id: categoryId, name: categoryData.name }],
            availability: ["IN_STOCK"],
            sizes: []
          }),
        });

        if (!productsResponse.ok) throw new Error('Failed to fetch products');
        const productsData = await productsResponse.json();
        setProducts(productsData.data || []);
        
      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'Failed to load category');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryAndProducts();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Category</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category?.name}</h1>
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    <img
                      src={product.images?.[0] || '/placeholder-product.jpg'}
                      alt={product.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
                    <p className="text-indigo-600 font-semibold">
                      ₹{product.price.toLocaleString()}
                    </p>
                    {product.stock > 0 ? (
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">We couldn't find any products in this category.</p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

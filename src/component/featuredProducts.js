'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-body rounded-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="absolute top-3 right-3 bg-white rounded-full p-2">
          <FiHeart className="text-gray-500 hover:text-red-500 transition-colors" />
        </div>
        <div className="relative w-full aspect-[4/4]">
          <Image
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg text-gray-800 font-semibold mb-2 line-clamp-2">{product.title}</h3>
        <div className="flex items-center mb-3">
          <span className="text-xl font-bold text-gray-600">₹{product.price}</span>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Sizes:</span>
            <div className="flex flex-wrap gap-1">
              {product.sizes?.slice(0, 3).map((size, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">{size}</span>
              ))}
              {product.sizes?.length > 3 && (
                <span className="text-xs text-gray-500 self-center">+{product.sizes.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if (data.ok && Array.isArray(data.data)) {
          setProducts(data.data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-16 mt-5 text-center">
        <div className="container mx-auto px-4">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 mt-5 text-center">
        <div className="container mx-auto px-4">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 mt-5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-black font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of top fashion items
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const slug = product.title
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-');
            
            return (
              <Link 
                href={`/products/${slug}-${product.id}`} 
                className="hover:opacity-75 transition-opacity block" 
                key={product.id}
              >
                <ProductCard product={product} />
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
            See More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
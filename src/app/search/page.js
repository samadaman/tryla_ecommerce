'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiFilter, FiGrid, FiList, FiChevronLeft, FiShoppingBag } from 'react-icons/fi';
import Header from '@/component/header';

// Skeleton Loader Component
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 animate-pulse">
    <div className="bg-gray-200 h-64 w-full"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    sort: 'featured',
    availability: 'all',
    priceRange: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  // Fetch products based on search query or category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        
        let url = 'http://localhost:4000/products';
        if (category) {
          url = `http://localhost:4000/products?category=${encodeURIComponent(category)}`;
          setCategoryName(category);
        } else if (query) {
          url = `http://localhost:4000/products?search=${encodeURIComponent(query)}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setAllProducts(data.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, category]);

  // Filter and sort products based on search query and filters
  useEffect(() => {
    if (!allProducts.length) return;

    let results = [...allProducts];
    
    // Apply search query (client-side fallback)
    if (query && !category) {
      const searchTerm = query.toLowerCase();
      results = results.filter(product => 
        product.title?.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm)) ||
        (product.category?.name && product.category.name.toLowerCase().includes(searchTerm))
      );
    }

    // Apply availability filter
    if (filters.availability === 'in-stock') {
      results = results.filter(p => p.stock > 0);
    } else if (filters.availability === 'low-stock') {
      results = results.filter(p => p.stock > 0 && p.stock <= 5);
    }
    
    // Apply price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      results = results.filter(product => {
        const price = Number(product.price);
        if (filters.priceRange === '10000') return price >= 10000;
        return price >= min && price <= max;
      });
    }

    // Apply sorting
    if (filters.sort === 'price-low-high') {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-high-low') {
      results.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'name-asc') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(results);
  }, [allProducts, query, filters]);

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Results</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center mx-auto"
            >
              <FiChevronLeft className="mr-1" /> Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-700 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {category ? `${categoryName} Collection` : query ? `Search Results for "${query}"` : 'All Products'}
              </h1>
              <p className="text-gray-100">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
              </p>
            </div>
            <div className="mt-6 md:mt-0 text-gray-700">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 transition-colors"
              >
                <FiFilter className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sorting */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4 text-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm text-gray-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              </span>
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-50 text-gray-600' : 'text-gray-500 hover:bg-gray-100'}`}
                aria-label="Grid view"
              >
                <FiGrid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-50 text-gray-600' : 'text-gray-500 hover:bg-gray-100'}`}
                aria-label="List view"
              >
                <FiList size={20} />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
              <div className="relative">
                <select
                  value={filters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Products</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-1000">Under ₹1,000</option>
                    <option value="1000-5000">₹1,000 - ₹5,000</option>
                    <option value="5000-10000">₹5,000 - ₹10,000</option>
                    <option value="10000">Over ₹10,000</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'}
          >
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <Link 
                  href={`/products/${product.id}`}
                  className={`${viewMode === 'list' ? 'flex-shrink-0 w-48' : ''}`}
                >
                  <div className={`${viewMode === 'list' ? 'h-full' : 'h-64'} bg-gray-100 overflow-hidden`}>
                    <img
                      src={product.images?.[0] || '/placeholder-product.jpg'}
                      alt={product.title}
                      className={`w-full ${
                        viewMode === 'list' ? 'h-full' : 'h-64'
                      } object-cover hover:scale-105 transition-transform duration-300`}
                    />
                  </div>
                </Link>
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col' : ''}`}>
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">
                          <Link href={`/products/${product.id}`} className="hover:text-gray-600">
                            {product.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {product.category?.name || 'Uncategorized'}
                        </p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                        <FiShoppingBag className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 font-semibold text-lg mt-2">
                      ₹{product.price.toLocaleString('en-IN')}
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    {product.stock > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                        Out of Stock
                      </span>
                    )}
                    
                    {viewMode === 'list' && product.description && (
                      <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FiShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {query 
                ? `We couldn't find any products matching "${query}". Try adjusting your search or filters.`
                : 'Please enter a search term to find products.'}
            </p>
            <div className="space-x-3">
              <button
                onClick={() => {
                  setFilters({
                    sort: 'featured',
                    availability: 'all',
                    priceRange: 'all',
                  });
                  setShowFilters(false);
                }}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Clear Filters
              </button>
              <Link
                href="/"
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

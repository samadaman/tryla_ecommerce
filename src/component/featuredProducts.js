'use client';

import Image from 'next/image';
import { featuredProducts } from '../data/products';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-body rounded-md  overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="absolute top-3 right-3 bg-body rounded-full p-2">
          <FiHeart className="text-gray-500 hover:text-red-500 transition-colors" />
        </div>
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            New
          </div>
        )}
        <div className="relative w-full aspect-[4/4]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
        </div>
        <h3 className="text-lg text-gray-800 font-semibold mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center mb-3">
          <span className="text-xl font-bold text-gray-600">${product.price}</span>
          {product.oldPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">${product.oldPrice}</span>
          )}
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600">In Stock</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Sizes:</span>
            <div className="ml-2 flex space-x-1">
              {product.sizes.slice(0, 3).map((size) => (
                <span key={size} className="text-xs text-gray-500">{size}</span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-xs text-gray-500">+{product.sizes.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
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
          {featuredProducts.slice(0, 9).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
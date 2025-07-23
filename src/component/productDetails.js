'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar, FaShoppingCart, FaHeart, FaChevronLeft, FaChevronRight, FaExpand, FaTimes } from 'react-icons/fa';
import { featuredProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';

// Skeleton Loader Component
const ProductDetailsSkeleton = () => (
  <div className="container mx-auto px-4 py-8 max-w-7xl animate-pulse">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Image Skeleton */}
      <div className="lg:w-[60%] xl:w-[65%] 2xl:w-[50%] space-y-4">
        <div className="h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-gray-200 rounded-lg"></div>
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-20 h-20 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>

      {/* Info Skeleton */}
      <div className="lg:w-[40%] xl:w-[35%] 2xl:w-[60%] space-y-6">
        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        
        <div className="pt-4 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="flex flex-wrap gap-2">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <div key={size} className="w-12 h-10 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <div className="flex border rounded-md overflow-hidden">
            <div className="w-10 h-10 bg-gray-200"></div>
            <div className="w-12 h-10 bg-gray-100 flex items-center justify-center"></div>
            <div className="w-10 h-10 bg-gray-200"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-md flex-1"></div>
        </div>

        <div className="pt-6 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  </div>
);

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = featuredProducts.find(p => p.id === parseInt(productId));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors?.[0] || '');
      setSelectedSize(foundProduct.sizes?.[0] || '');
    }
  }, [productId]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
  };

  if (!product) return <ProductDetailsSkeleton />;

  const currentImage = product.images?.[currentImageIndex] || product.image;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery - Larger on big screens */}
        <div className="lg:w-[60%] xl:w-[65%] 2xl:w-[50%] relative">
          <div 
            className="relative h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-lg overflow-hidden cursor-zoom-in"
            onClick={toggleFullscreen}
          >
            <Image 
              src={currentImage} 
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => 
                    prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
                  );
                }}
                className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => 
                    prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
                  );
                }}
                className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <FaChevronRight />
              </button>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="absolute bottom-4 right-4 bg-white/80 p-2 text-gray-900 rounded-full hover:bg-white transition-colors"
            >
              <FaExpand />
            </button>
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-md overflow-hidden transition-all ${
                  currentImageIndex === idx 
                    ? 'border-blue-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full hover:opacity-90"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="lg:w-[40%] xl:w-[35%] 2xl:w-[60%]">
          <h1 className="text-2xl md:text-4xl lg:text-5xl text-black  font-bold mb-2">{product.name}</h1>

          <div className="mb-6">
            <span className="text-1xl md:text-2xl lg:text-3xl font-bold text-gray-600">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="ml-2 text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
            {product.isNew && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                New
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.description || 'No description available.'}</p>

          {/* Color Selection */}
          {product.colors?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`cursor-pointer px-6 py-2 border border-gray-200 text-gray-900 rounded-md ${
                      selectedSize === size 
                        ? 'bg-gray-900 text-white border-gray-600' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border rounded-md">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-2 text-gray-600 rounded-l-md bg-gray-300 hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-12 text-gray-600 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-2 text-gray-600 rounded-r-md bg-gray-300 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t text-gray-300 pt-4">
            <div className="mb-2 text-gray-600">
              <span className="font-medium ">Category:</span> {product.category}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">Availability:</span> In Stock
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mt-16 border-t border-gray-200 pt-8">
        <div className="flex flex-nowrap overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 pb-8">
          <button 
            className={`py-3 px-6 font-medium whitespace-nowrap ${activeTab === 'description' ? 'text-black bg-gray-300 rounded-lg cursor-pointer' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`py-3 px-6 font-medium whitespace-nowrap ${activeTab === 'details' ? 'text-black bg-gray-300 rounded-lg cursor-pointer' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}`}
            onClick={() => setActiveTab('details')}
          >
            Product Details
          </button>
          <button 
            className={`py-3 px-6 font-medium whitespace-nowrap ${activeTab === 'reviews' ? 'text-black bg-gray-300 rounded-lg cursor-pointer' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviews})
          </button>
        </div>

        <div className="prose max-w-none">
          {activeTab === 'description' && (
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                  <ul className="space-y-2">
                    {product.details?.features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Size & Fit</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Model's Height</span>
                      <span className="font-medium text-gray-400">5'9" (175cm)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Model Wears</span>
                      <span className="font-medium text-gray-400">Size S</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Fit</span>
                      <span className="font-medium text-gray-400">{product.details?.fit}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && product.details && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Information</h3>
                <dl className="space-y-4">
                  <div className="border-b border-gray-100 pb-2">
                    <dt className="text-sm font-medium text-gray-500">Material</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.details.material}</dd>
                  </div>
                  <div className="border-b border-gray-100 pb-2">
                    <dt className="text-sm font-medium text-gray-500">Care Instructions</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.details.care}</dd>
                  </div>
                  <div className="border-b border-gray-100 pb-2">
                    <dt className="text-sm font-medium text-gray-500">Fit</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.details.fit}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Length</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.details.length}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Size Guide</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">{product.details.sizeGuide}</p>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View size guide <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-700">
                  {product.rating} out of 5
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Based on {product.reviews} customer ratings
              </p>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Write a review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={toggleFullscreen}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <FaTimes />
          </button>
          <div className="relative w-full h-full max-w-6xl">
            <Image 
              src={product.images?.[currentImageIndex] || product.image} 
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => 
                    prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
                  );
                }}
                className="bg-white/80 p-3 rounded-full hover:bg-white transition-colors"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => 
                    prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
                  );
                }}
                className="bg-white/80 p-3 rounded-full hover:bg-white transition-colors"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function StarIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default ProductDetails;
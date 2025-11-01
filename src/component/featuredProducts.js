'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import cn from 'classnames';

const ProductCard = ({ product }) => {
  // Advanced state management for micro-interactions
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [interactionPhase, setInteractionPhase] = useState(0);

  // Dynamic CSS custom properties for real-time theming
  const cardStyle = {
    '--hover-lift': isHovered ? '12px' : '0px',
    '--shadow-intensity': isHovered ? '0.25' : '0.1',
    '--border-opacity': isHovered ? '0.8' : '0.3',
    '--gradient-angle': interactionPhase * 45 + 'deg',
  };

  return (
    <article
      className={cn(
        // Base revolutionary design system
        "group relative overflow-hidden",
        "bg-white/95 backdrop-blur-xl",
        "rounded-[2.5rem] shadow-2xl",
        "border border-white/20",
        "transition-all duration-700 ease-out",
        "hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,var(--shadow-intensity))]",
        "hover:-translate-y-[var(--hover-lift)]",
        "hover:border-white/[var(--border-opacity)]",
        "before:absolute before:inset-0 before:rounded-[2.5rem]",
        "before:bg-gradient-to-br before:from-white/10 before:to-transparent",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        "after:absolute after:inset-0 after:rounded-[2.5rem]",
        "after:bg-gradient-to-tl after:from-purple-500/5 after:via-transparent after:to-blue-500/5",
        "after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-700"
      )}
      style={cardStyle}
      onMouseEnter={() => {
        setIsHovered(true);
        // Progressive interaction phases
        setTimeout(() => setInteractionPhase(1), 100);
        setTimeout(() => setInteractionPhase(2), 300);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setInteractionPhase(0);
      }}
    >
      {/* Advanced Image System */}
      <div className="relative">
        {/* Morphing background shape */}
        <div className={cn(
          "absolute -inset-4 z-0 transition-all duration-1000 ease-out",
          "bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-100",
          "rounded-[3rem] opacity-0",
          "group-hover:opacity-100 group-hover:scale-105",
          "blur-2xl"
        )} />

        {/* Favorite button with magnetic hover */}
        <button
          className={cn(
            "absolute top-6 right-6 z-20 p-3 rounded-full",
            "bg-white/90 backdrop-blur-md shadow-lg",
            "transition-all duration-500 ease-out",
            "hover:scale-125 hover:rotate-12",
            "hover:bg-red-50 hover:text-red-500",
            "opacity-0 group-hover:opacity-100",
            "animate-pulse group-hover:animate-none",
            "border border-white/50"
          )}
          aria-label={`Add ${product.title} to favorites`}
        >
          <FiHeart className="w-5 h-5 transition-colors duration-300" />
        </button>

        {/* Image container with advanced aspect ratio */}
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          {/* Animated border gradient */}
          <div className={cn(
            "absolute inset-0 z-10 rounded-3xl",
            "bg-gradient-to-r from-transparent via-white/20 to-transparent",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            "animate-pulse"
          )} />

          {/* Main image with advanced loading states */}
          <Image
            src={product.images?.[0] || '/images/dress1.jpg'}
            alt={product.title}
            fill
            className={cn(
              "object-cover transition-all duration-1000 ease-out",
              "group-hover:scale-110 group-hover:rotate-1",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Sophisticated overlay system */}
          <div className={cn(
            "absolute inset-0 z-5",
            "bg-gradient-to-t from-black/60 via-transparent to-transparent",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          )} />

          {/* Advanced light effects */}
          <div className={cn(
            "absolute top-0 left-1/4 w-1/2 h-1/2",
            "bg-gradient-radial from-white/30 via-white/10 to-transparent",
            "rounded-full blur-3xl",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-1000",
            "animate-pulse"
          )} />
        </div>

        {/* Progressive disclosure overlay */}
        <div className={cn(
          "absolute inset-0 z-15 flex items-center justify-center",
          "bg-black/40 backdrop-blur-sm",
          "opacity-0 group-hover:opacity-100 transition-all duration-500",
          "translate-y-8 group-hover:translate-y-0"
        )}>
          <div className="flex space-x-3">
            <button className={cn(
              "px-6 py-3 rounded-full font-semibold text-sm",
              "bg-white/95 text-gray-900 backdrop-blur-sm",
              "shadow-lg hover:shadow-xl transition-all duration-300",
              "hover:scale-110 hover:-translate-y-1",
              "border border-white/20"
            )}>
              Quick View
            </button>
            <button className={cn(
              "px-6 py-3 rounded-full font-semibold text-sm",
              "bg-white/10 text-white backdrop-blur-sm",
              "shadow-lg hover:shadow-xl transition-all duration-300",
              "hover:scale-110 hover:bg-white/20",
              "border border-white/30"
            )}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Content section with advanced typography */}
      <div className="relative z-10 p-8">
        {/* Dynamic title with advanced text effects */}
        <h3 className={cn(
          "text-xl font-bold text-gray-900 mb-3",
          "line-clamp-2 leading-tight",
          "transition-all duration-500",
          "group-hover:text-gray-800",
          "group-hover:tracking-wide"
        )}>
          {product.title}
        </h3>

        {/* Advanced price display */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className={cn(
              "text-3xl font-black text-gray-900",
              "transition-all duration-300",
              "group-hover:scale-110 group-hover:text-indigo-600"
            )}>
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through decoration-2 decoration-red-300">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          {product.discount && (
            <div className={cn(
              "relative px-3 py-1.5 rounded-full",
              "bg-gradient-to-r from-red-500 to-pink-500",
              "text-white text-sm font-bold",
              "shadow-lg animate-pulse"
            )}>
              -{product.discount}%
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
            </div>
          )}
        </div>

        {/* Advanced size selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Available Sizes
              </span>
              <span className="text-xs text-gray-500">
                {product.sizes.length} options
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.slice(0, 5).map((size, index) => (
                <button
                  key={size}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium",
                    "bg-gray-50 text-gray-700 border border-gray-200",
                    "transition-all duration-300 ease-out",
                    "hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700",
                    "hover:scale-110 hover:shadow-md",
                    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                    `hover:delay-${index * 50}`
                  )}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 5 && (
                <div className={cn(
                  "px-3 py-2 rounded-full text-xs",
                  "bg-gradient-to-r from-gray-100 to-gray-200",
                  "text-gray-600 font-medium flex items-center",
                  "animate-pulse"
                )}>
                  +{product.sizes.length - 5} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Revolutionary CTA button */}
        <button className={cn(
          "w-full py-4 px-8 rounded-2xl font-bold text-base",
          "bg-gradient-to-r from-gray-900 via-black to-gray-900",
          "text-white shadow-2xl",
          "transition-all duration-500 ease-out",
          "hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.4)]",
          "hover:scale-[1.02] hover:-translate-y-1",
          "active:scale-[0.98] active:translate-y-0",
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-r",
          "before:from-white/0 before:via-white/20 before:to-white/0",
          "before:translate-x-[-100%] hover:before:translate-x-[100%]",
          "before:transition-transform before:duration-1000 before:ease-in-out"
        )}>
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <span>Add to Cart</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </span>
        </button>

        {/* Advanced accessibility and interaction hints */}
        <div className="sr-only">
          Product: {product.title}, Price: ₹{product.price}
          {product.sizes && `, Available sizes: ${product.sizes.join(', ')}`}
          {product.discount && `, ${product.discount}% discount applied`}
        </div>
      </div>
    </article>
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
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import cn from 'classnames';

const CategoryCard = ({ category, index }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [interactionPhase, setInteractionPhase] = useState(0);
  const [productCount, setProductCount] = useState(category.productsCount || 0);
  const [isLoadingCount, setIsLoadingCount] = useState(false);
  const router = useRouter();

  // This would be replaced with actual image URL from your API when available
  const imageUrl = category.image || '';

  const handleCategoryClick = () => {
    router.push(`/search?category=${encodeURIComponent(category.name)}`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => setInteractionPhase(1), 100);
    setTimeout(() => setInteractionPhase(2), 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setInteractionPhase(0);
  };

  // Fetch product count for this category
  useEffect(() => {
    const fetchProductCount = async () => {
      if (!category.id || !category.name) {
        console.log('Skipping product count fetch - missing category id or name');
        return;
      }

      console.log('🔍 Fetching product count for category:', category.name, 'with ID:', category.id);

      try {
        setIsLoadingCount(true);

        // Try multiple API approaches to get the product count
        console.log('📡 Trying category-specific endpoint...');

        // Approach 1: Try the direct category endpoint
        const categoryResponse = await fetch(`http://localhost:4000/categories/${category.id}`);
        console.log('📡 Category endpoint status:', categoryResponse.status);

        if (categoryResponse.ok) {
          const categoryResult = await categoryResponse.json();
          console.log('📦 Category API response:', categoryResult);

          // Handle different response structures
          let products = null;

          if (Array.isArray(categoryResult)) {
            products = categoryResult;
          } else if (categoryResult.products && Array.isArray(categoryResult.products)) {
            products = categoryResult.products;
          } else if (categoryResult.data && Array.isArray(categoryResult.data)) {
            products = categoryResult.data;
          } else if (categoryResult.data && categoryResult.data.products && Array.isArray(categoryResult.data.products)) {
            products = categoryResult.data.products;
          }

          if (products) {
            setProductCount(products.length);
            console.log('✅ Found', products.length, 'products for category', category.name);
            return;
          }
        }

        // Approach 2: Try fetching all products and filter
        console.log('📡 Trying products endpoint for filtering...');
        try {
          const allProductsResponse = await fetch('http://localhost:4000/products');
          console.log('📡 Products endpoint status:', allProductsResponse.status);

          if (allProductsResponse.ok) {
            const allProductsResult = await allProductsResponse.json();
            console.log('📦 All products response type:', typeof allProductsResult);

            let allProducts = [];

            // Handle different response structures for products
            if (Array.isArray(allProductsResult)) {
              allProducts = allProductsResult;
            } else if (allProductsResult.data && Array.isArray(allProductsResult.data)) {
              allProducts = allProductsResult.data;
            } else if (allProductsResult.products && Array.isArray(allProductsResult.products)) {
              allProducts = allProductsResult.products;
            }

            console.log('📦 Total products available:', allProducts.length);

            // Filter products for this category
            const productsInCategory = allProducts.filter(product => {
              const matchesId = product.categoryId === category.id;
              const matchesName = product.category === category.name;
              const matchesNameLower = product.category && product.category.toLowerCase() === category.name.toLowerCase();

              if (matchesId || matchesName || matchesNameLower) {
                console.log('✅ Product matched:', product.title, 'for category', category.name);
                return true;
              }
              return false;
            });

            const count = productsInCategory.length;
            setProductCount(count);
            console.log('✅ Filtered count for', category.name, ':', count, 'products');
            return;
          }
        } catch (productsError) {
          console.error('❌ Products endpoint error:', productsError);
        }

        // Approach 3: Try a more general endpoint
        console.log('📡 Trying general categories endpoint...');
        try {
          const generalResponse = await fetch('http://localhost:4000/categories');
          if (generalResponse.ok) {
            const generalResult = await generalResponse.json();
            console.log('📦 General categories response:', generalResult);

            // Look for this category in the response and get its product count
            if (Array.isArray(generalResult)) {
              const foundCategory = generalResult.find(cat =>
                cat.id === category.id || cat.name === category.name
              );
              if (foundCategory && foundCategory.productsCount !== undefined) {
                setProductCount(foundCategory.productsCount);
                console.log('✅ Found category with productsCount:', foundCategory.productsCount);
                return;
              }
            }
          }
        } catch (generalError) {
          console.error('❌ General categories endpoint error:', generalError);
        }

        // If all approaches fail, use the original count
        console.warn('⚠️ All API approaches failed, using original count');
        setProductCount(category.productsCount || 0);

      } catch (error) {
        console.error('❌ Fatal error fetching product count for', category.name, ':', error);
        setProductCount(category.productsCount || 0);
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchProductCount();
  }, [category.id, category.name, category.productsCount]);

  return (
    <article
      className={cn(
        // Revolutionary base design system
        "group relative overflow-hidden",
        "bg-white/95 backdrop-blur-xl",
        "rounded-[3rem] shadow-2xl",
        "border border-white/20",
        "transition-all duration-700 ease-out",
        "hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)]",
        "hover:-translate-y-4",
        "hover:border-white/40",
        "before:absolute before:inset-0 before:rounded-[3rem]",
        "before:bg-gradient-to-br before:from-indigo-500/5 before:via-purple-500/5 before:to-pink-500/5",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        "after:absolute after:inset-0 after:rounded-[3rem]",
        "after:bg-gradient-to-tl after:from-cyan-500/3 after:via-transparent after:to-violet-500/3",
        "after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-700"
      )}
      style={{
        '--hover-delay': `${index * 150}ms`,
        '--animation-delay': `${index * 100}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCategoryClick}
      role="button"
      tabIndex={0}
      aria-label={`Browse ${category.name} category`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCategoryClick();
        }
      }}
    >
      {/* Morphing background shape */}
      <div className={cn(
        "absolute -inset-6 z-0 transition-all duration-1000 ease-out",
        "bg-gradient-to-br from-indigo-100/50 via-purple-50/50 to-cyan-100/50",
        "rounded-[4rem] opacity-0",
        "group-hover:opacity-100 group-hover:scale-105",
        "blur-3xl animate-pulse",
        "delay-[var(--animation-delay)]"
      )} />

      {/* Advanced image system */}
      <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        {/* Animated border gradient */}
        <div className={cn(
          "absolute inset-0 z-10 rounded-[2.5rem]",
          "bg-gradient-to-r from-transparent via-white/30 to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "animate-pulse"
        )} />

        {!imageError && imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={category.name}
              fill
              className={cn(
                "object-cover transition-all duration-1000 ease-out",
                "group-hover:scale-110 group-hover:rotate-2",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            )}

            {/* Sophisticated overlay system */}
            <div className={cn(
              "absolute inset-0 z-5",
              "bg-gradient-to-t from-black/40 via-transparent to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            )} />

            {/* Advanced light effects */}
            <div className={cn(
              "absolute top-0 left-1/4 w-1/2 h-1/2 z-5",
              "bg-gradient-radial from-white/40 via-white/20 to-transparent",
              "rounded-full blur-2xl",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-1000",
              "animate-pulse"
            )} />
          </>
        ) : (
          <div className={cn(
            "relative w-32 h-32 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100",
            "transition-all duration-700 ease-out",
            "group-hover:scale-125 group-hover:rotate-12",
            "shadow-2xl group-hover:shadow-3xl",
            "border border-indigo-200/50 group-hover:border-indigo-300",
            "before:absolute before:inset-0 before:rounded-full",
            "before:bg-gradient-to-br before:from-white/20 before:to-transparent",
            "before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500"
          )}>
            {/* Custom sophisticated icons based on category */}
            <div className="relative z-10">
              {category.name.toLowerCase().includes('fashion') || category.name.toLowerCase().includes('clothing') ? (
                <svg className="w-16 h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ) : category.name.toLowerCase().includes('electronic') || category.name.toLowerCase().includes('tech') ? (
                <svg className="w-16 h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ) : category.name.toLowerCase().includes('home') || category.name.toLowerCase().includes('furniture') ? (
                <svg className="w-16 h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ) : category.name.toLowerCase().includes('beauty') || category.name.toLowerCase().includes('cosmetic') ? (
                <svg className="w-16 h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              ) : category.name.toLowerCase().includes('sport') || category.name.toLowerCase().includes('fitness') ? (
                <svg className="w-16 h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ) : category.name.toLowerCase().includes('book') || category.name.toLowerCase().includes('education') ? (
                <svg className="w-16 h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              ) : category.name.toLowerCase().includes('food') || category.name.toLowerCase().includes('grocery') ? (
                <svg className="w-16 h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 18h12l3-18H3zm0 0l.5-3h17l.5 3H3zM9 9v6m6-6v6" />
                </svg>
              ) : category.name.toLowerCase().includes('toy') || category.name.toLowerCase().includes('game') ? (
                <svg className="w-16 h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7.5-4l1.5 1.5L12 4l3.5 3.5L17 6M9 9l.01 0M15 9l.01 0" />
                </svg>
              ) : category.name.toLowerCase().includes('automotive') || category.name.toLowerCase().includes('car') ? (
                <svg className="w-16 h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17l4-4m0 0l4 4m-4-4v8m8-12l-4-4m0 0l-4 4m4-4v8" />
                </svg>
              ) : (
                // Default sophisticated icon
                <svg className="w-16 h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              )}

              {/* Animated ring around icon */}
              <div className={cn(
                "absolute inset-0 rounded-full",
                "border-2 border-indigo-300/50",
                "animate-ping opacity-0 group-hover:opacity-100",
                "transition-opacity duration-500"
              )} />

              {/* Pulsing dot indicator */}
              <div className={cn(
                "absolute -top-1 -right-1 w-3 h-3",
                "bg-gradient-to-r from-pink-500 to-purple-500",
                "rounded-full animate-pulse",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              )} />
            </div>
          </div>
        )}
      </div>

      {/* Progressive disclosure overlay */}
      <div className={cn(
        "absolute inset-0 z-15 flex items-center justify-center",
        "bg-black/30 backdrop-blur-sm",
        "opacity-0 group-hover:opacity-100 transition-all duration-500",
        "translate-y-8 group-hover:translate-y-0"
      )}>
        <div className="flex flex-col items-center space-y-4">
          <button className={cn(
            "px-8 py-4 rounded-full font-bold text-base",
            "bg-white/95 text-gray-900 backdrop-blur-sm",
            "shadow-lg hover:shadow-xl transition-all duration-300",
            "hover:scale-110 hover:-translate-y-1",
            "border border-white/20",
            "animate-bounce",
            "cursor-pointer"
          )}>
            Explore Category
          </button>
          <div className="text-white text-sm font-medium opacity-90">
            {isLoadingCount ? 'Loading...' : productCount} products available
          </div>
        </div>
      </div>

      {/* Content section with advanced typography */}
      <div className="relative z-10 p-8">
        <h3 className={cn(
          "text-2xl font-bold text-gray-900 mb-3 capitalize",
          "line-clamp-2 leading-tight",
          "transition-all duration-500",
          "group-hover:text-indigo-900",
          "group-hover:tracking-wide"
        )}>
          {category.name}
        </h3>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className={cn(
              "text-sm font-semibold text-gray-700",
              "transition-all duration-300",
              "group-hover:text-indigo-700 group-hover:scale-105"
            )}>
              {isLoadingCount ? 'Loading...' : productCount} products
            </span>
          </div>
          <div className={cn(
            "px-4 py-2 rounded-full text-sm font-medium",
            "bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50",
            "text-indigo-700 border border-indigo-200",
            "transition-all duration-300",
            "group-hover:bg-indigo-100 group-hover:border-indigo-300",
            "group-hover:scale-110 group-hover:shadow-md"
          )}>
            Browse →
          </div>
        </div>
      </div>

      {/* Advanced accessibility hints */}
      <div className="sr-only">
        Category: {category.name}, Products: {isLoadingCount ? 'Loading...' : productCount}, Click to explore
      </div>
    </article>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className={cn(
      "bg-white/95 backdrop-blur-xl rounded-[3rem]",
      "shadow-2xl overflow-hidden",
      "animate-pulse"
    )}>
      <div className="h-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      <div className="p-8">
        <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/3"></div>
          <div className="h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-24"></div>
        </div>
      </div>
    </div>
  );
};

const CategoriesExplore = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:4000/categories');
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch categories');
        }

        // Handle the nested data structure
        const categoriesData = result.data || [];
        console.log('Categories data:', categoriesData);

        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message || 'Failed to load categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return (
      <div className="py-16 mt-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-700 font-semibold mb-2">Error loading categories</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      <div className="container mx-auto px-4">
        {/* Revolutionary header section */}
        <div className="text-center mb-20">
          <div className={cn(
            "inline-block p-1 rounded-full",
            "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
            "mb-6 animate-pulse"
          )}>
            <div className="bg-white rounded-full px-6 py-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold">
                Discover Collections
              </span>
            </div>
          </div>

          <h2 className={cn(
            "text-5xl md:text-6xl font-black text-gray-900 mb-6",
            "leading-tight",
            "animate-fade-in-up"
          )}>
            Shop by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Category
            </span>
          </h2>

          <p className={cn(
            "text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed",
            "animate-fade-in-up animation-delay-300"
          )}>
            Explore our curated collections and discover products that match your unique style and preferences
          </p>

          {/* Animated decorative elements */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <div className={cn(
              "w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500",
              "rounded-full animate-pulse"
            )} />
            <div className={cn(
              "w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500",
              "rounded-full animate-bounce"
            )} />
            <div className={cn(
              "w-16 h-1 bg-gradient-to-r from-pink-500 to-indigo-500",
              "rounded-full animate-pulse"
            )} />
          </div>
        </div>

        {loading ? (
          <div className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
            "animate-fade-in-up animation-delay-500"
          )}>
            {[...Array(8)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
            "animate-fade-in-up animation-delay-500"
          )}>
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        )}

        {/* Revolutionary CTA section */}
        {!loading && categories.length > 0 && (
          <div className={cn(
            "text-center mt-16",
            "animate-fade-in-up animation-delay-1000"
          )}>
            <div className={cn(
              "inline-block p-8 rounded-[3rem]",
              "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50",
              "border border-indigo-100 shadow-lg"
            )}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Browse our complete product catalog or contact our style experts for personalized recommendations.
              </p>
              <button className={cn(
                "px-8 py-4 rounded-full font-bold text-base",
                "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600",
                "text-white shadow-lg hover:shadow-xl",
                "transition-all duration-300",
                "hover:scale-105 hover:-translate-y-1",
                "animate-pulse"
              )}>
                View All Products
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Accessibility enhancements */}
      <div className="sr-only">
        Categories section with {categories.length} available categories for browsing
      </div>
    </section>
  );
};

export default CategoriesExplore;
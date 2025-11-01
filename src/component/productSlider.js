'use client';

import Image from 'next/image';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const createSlug = (name, id) => {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${id}`;
};

const ProductSlider = () => {
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
        const result = await response.json();
        if (result.ok && Array.isArray(result.data)) {
          // Map the API response to match our component's expected structure
          const formattedProducts = result.data.map(product => ({
            id: product.id,
            name: product.title,
            price: parseFloat(product.price) / 100, // Convert from cents to dollars
            image: product.images?.[0] || '/images/dress1.jpg',
            isNew: product.availability === 'IN_STOCK',
            // Add any other mappings needed
          }));
          setProducts(formattedProducts);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-16 mt-16 text-center">
        <div className="container mx-auto px-4 mt-5">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 mt-16 text-center">
        <div className="container mx-auto px-4 mt-5">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 mt-16">
      <div className="container mx-auto px-4 mt-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-black font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of top fashion items
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper"
        >
          {products.slice(0, 9).map((product) => {
            const slug = createSlug(product.name, product.id);
            return (
              <SwiperSlide key={product.id}>
                <Link href={`/products/${slug}`} target="_blank">
                  <div className="bg-body rounded-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative">
                      <div className="absolute top-3 right-3 bg-body rounded-full p-2 z-10" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Add to wishlist functionality here
                      }}>
                        <FiHeart className="text-gray-500 hover:text-red-500 transition-colors" />
                      </div>
                      {product.isNew && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          New
                        </div>
                      )}
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        width={400}
                        height={600}
                        className="w-full h-[600px] object-cover"
                        onError={(e) => {
                          e.target.src = '/images/dress1.jpg';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
                          {product.oldPrice && (
                            <span className="text-gray-400 line-through ml-2">${product.oldPrice.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
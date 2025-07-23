'use client';

import Image from 'next/image';
import { featuredProducts } from '../data/products';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

const createSlug = (name, id) => {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${id}`;
};

const ProductSlider = () => {
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
          {featuredProducts.slice(0, 9).map((product) => {
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
                        <div className="flex items-center">
                          {/* <StarIcon className="h-4 w-4 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">{product.rating}</span> */}
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

// const StarIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//     {...props}
//   >
//     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//   </svg>
// );

export default ProductSlider;
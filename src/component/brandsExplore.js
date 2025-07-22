'use client';

import Image from 'next/image';
import { brands } from '../data/brands';

const BrandCard = ({ brand }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer mt-5">
      <div className="relative h-24 flex items-center justify-center">
        <div className="w-20 h-20 flex items-center justify-center">
          <Image
            src={brand.logo}
            alt={brand.name}
            width={100}
            height={100}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg text-black font-semibold mb-2">{brand.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{brand.description}</p>
       <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="text-sm text-gray-500">{brand.category}</span>
          <span className="px-3 py-1 bg-gray-400 text-white-700 rounded-full text-xs font-semibold">
            {brand.offer}
          </span>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="bg-gray-100 rounded-xl animate-pulse">
      <div className="h-24 mb-4" />
      <div className="px-4">
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
        <div className="h-3 bg-gray-200 rounded mb-2 w-1/2" />
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-3 bg-gray-200 rounded w-1/6" />
        </div>
      </div>
    </div>
  );
};

const BrandsExplore = () => {
  return (
    <div className="py-16 mt-16">
      <div className="container mx-auto px-4 mt-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-black font-bold mb-4">Discover Your Favorite Brands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of top brands with exclusive offers and amazing deals.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsExplore;
'use client';

import { useParams } from 'next/navigation';
import ProductDetails from '@/component/productDetails';
import Header from '@/component/header';
import Footer from '@/component/footer';
import BelowNavLinks from '@/component/belowNavLinks';

export default function ProductPage() {
  const { slug } = useParams();
  
  // Extract the ID from the slug (it's the part after the last hyphen)
  const productId = slug.split('-').pop();

  if (!productId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600">The requested product could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <BelowNavLinks />
      <div className="container mx-auto px-4 py-8">
        <ProductDetails productId={productId} />
      </div>
      <Footer />
    </main>
  );
}

import React from 'react';
import Footer from '@/component/footer';

export const metadata = {
  title: 'Terms & Conditions | Krylaa',
  description: 'Read our terms and conditions for using Krylaa services and purchasing our products.',
};

const TermsPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-[url('/images/terms-bg.jpg')] bg-cover bg-center opacity-30" />
        
        <div className="container mx-auto px-6 relative z-20 text-center">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
              <img className='rounded-full p-2' src="/images/logo.avif" alt="Krylaa Logo" width={80} height={80} />
            </div>
            <h2 className="text-2xl font-light tracking-widest mb-2">KRYLAA</h2>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <div className="w-20 h-0.5 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Please read our terms and conditions carefully before using our services.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose max-w-none">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                By accessing or purchasing from www.krylaa.com, you agree to these Terms & Conditions. Please read them carefully before using our services.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">2. Use of Website</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to misuse our website, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Uploading false or harmful content.</li>
                <li>Violating any applicable laws.</li>
                <li>Attempting unauthorized access to our systems.</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">3. Product Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We make every effort to display product colors and details accurately. However, minor differences may occur due to screen variations or lighting.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">4. Pricing & Payment</h2>
              <p className="text-gray-700 leading-relaxed">
                Prices are displayed in your selected currency. We reserve the right to update prices or offers without prior notice. All payments are processed securely via trusted gateways.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">5. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content on this site — logos, designs, text, and images — are property of Krylaa and protected by copyright laws. Reproduction without permission is prohibited.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">6. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Krylaa is not liable for indirect, incidental, or consequential damages arising from product use, shipping delays, or third-party errors.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">7. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and interpreted in accordance with the laws of India, with international applicability for global customers.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
              <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@krylaa.com</span>
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span>www.krylaa.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;

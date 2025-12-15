import React from 'react';
import Footer from '@/component/footer';
import { Truck, Clock, Shield, RefreshCw, Mail, Globe, Package, CheckCircle, XCircle } from 'lucide-react';

export const metadata = {
  title: 'Shipping Policy | Krylaa',
  description: 'Learn about our shipping policies, delivery times, and order tracking.',
};

const InfoCard = ({ icon, title, children }) => (
  <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
    <div className="absolute -top-5 left-6 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl transform group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-2 pl-2">{title}</h3>
    <div className="space-y-4 text-gray-600">
      {children}
    </div>
  </div>
);

const ShippingPolicy = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-6 px-6 py-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
              <Truck className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium tracking-wider">WORLDWIDE SHIPPING</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Krylaa Shipping Policy
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about our shipping process
            </p>
            
            <div className="mt-12 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="relative py-20">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-900 to-transparent -mt-64"></div>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard 
              icon={<Globe className="w-6 h-6" />} 
              title="1. Shipping Coverage"
            >
              <div className="space-y-3">
                <p className="text-gray-700">
                  We proudly ship worldwide. Our products are available for delivery to most countries across the globe.
                </p>
              </div>
            </InfoCard>

            <InfoCard 
              icon={<Clock className="w-6 h-6" />} 
              title="2. Processing Time"
            >
              <div className="space-y-3">
                <p className="text-gray-700">
                  Orders are processed within 2-4 business days after payment confirmation. During peak seasons or sale events, processing may take slightly longer.
                </p>
              </div>
            </InfoCard>

            <InfoCard 
              icon={<Truck className="w-6 h-6" />} 
              title="3. Shipping Time"
            >
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-gray-700">Domestic (within India)</span>
                    <span className="text-gray-900">4-7 business days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-gray-700">International (Standard)</span>
                    <span className="text-gray-900">7-15 business days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2.5 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">* Varies by destination and customs process</p>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Processing time: 2-4 business days</span>
                  </div>
                </div>
              </div>
            </InfoCard>

            <InfoCard 
              icon={<Package className="w-6 h-6" />} 
              title="4. Tracking Orders"
            >
              <div className="space-y-3">
                <p className="text-gray-700">
                  Once your order ships, you'll receive an email with a tracking number to monitor your package's journey.
                </p>
                <div className="mt-4">
                  <button className="w-full text-left group">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors border border-gray-200">
                      <span>Track Your Order</span>
                      <span className="text-gray-400 group-hover:text-black">→</span>
                    </div>
                  </button>
                </div>
              </div>
            </InfoCard>

            <InfoCard 
              icon={<Shield className="w-6 h-6" />} 
              title="5. Customs & Import Duties"
            >
              <div className="space-y-3">
                <p className="text-gray-700">
                  For international orders, customs duties or import taxes (if applicable) are the customer's responsibility. These charges vary by country.
                </p>
              </div>
            </InfoCard>

            <InfoCard 
              icon={<RefreshCw className="w-6 h-6" />} 
              title="6. Delayed or Lost Shipments"
            >
              <div className="space-y-3">
                <p className="text-gray-700">
                  If your order is delayed or missing, contact us at shipping@kryla.com. We'll assist in tracking or resolving the issue promptly.
                </p>
                <div className="mt-4">
                  <a 
                    href="mailto:shipping@kryla.com" 
                    className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Shipping Support
                  </a>
                </div>
              </div>
            </InfoCard>
          </div>

          {/* Contact Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-black/5 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">7. Contact Us</h3>
                    <p className="text-gray-600 mb-4">
                      Need help with your order? Our customer service team is here to assist you with any shipping-related questions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="mailto:support@krylaa.com" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    shipping@kryla.com
                  </a>
                  <a 
                    href="tel:+919876543210" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 9XXXX XXXX0
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Need More Information?</h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-center text-gray-600">
                For any additional questions about our shipping policy, please don't hesitate to contact our customer support team.
              </p>
              {[
                {
                  question: "How can I track my order?",
                  answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this number to track your package on our website or the courier's tracking page."
                },
                {
                  question: "What if I'm not available to receive my delivery?",
                  answer: "If you're not available, our delivery partner will attempt delivery two more times. After three failed attempts, your package will be returned to us. You can contact customer service to reschedule delivery."
                },
                {
                  question: "Do you offer international shipping?",
                  answer: "Yes, we ship to select international destinations. Shipping costs and delivery times vary by country. Please check the shipping options at checkout for your specific location."
                },
                {
                  question: "What should I do if my package is damaged?",
                  answer: "Please contact our customer service within 48 hours of delivery with photos of the damaged items and packaging. We'll assist you with a replacement or refund."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;

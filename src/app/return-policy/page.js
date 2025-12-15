import React from 'react';
import { RefreshCw, Clock, CheckCircle, XCircle, Mail, Phone, HelpCircle } from 'lucide-react';
import Footer from '@/component/footer';

export const metadata = {
  title: 'Return & Refund Policy | Krylaa',
  description: 'Learn about our return and refund policies, conditions, and process for a hassle-free shopping experience.',
};

const PolicyCard = ({ icon, title, children }) => (
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

const ReturnPolicy = () => {
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
              <RefreshCw className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium tracking-wider">HASSLE-FREE RETURNS</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Return & Refund Policy
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Our commitment to your complete satisfaction
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
            <PolicyCard 
              icon={<CheckCircle className="w-6 h-6" />} 
              title="1. Eligibility for Returns"
            >
              <div className="space-y-3">
                <p className="text-gray-700">
                  We want you happy with your order. Returns are accepted if:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Request is made within 15 days of delivery</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Items are unused, unwashed, and in original condition with tags</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Returns apply to wrong, defective, or damaged items</span>
                  </li>
                </ul>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
                  <p className="font-medium text-red-700">Items not eligible for return:</p>
                  <ul className="list-disc list-inside text-red-600 mt-1 space-y-1">
                    <li>Innerwear</li>
                    <li>Clearance sale items</li>
                    <li>Custom-made pieces</li>
                  </ul>
                </div>
              </div>
            </PolicyCard>

            <PolicyCard 
              icon={<HelpCircle className="w-6 h-6" />} 
              title="2. How to Request a Return"
            >
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <ol className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-800 rounded-full text-xs font-bold mr-3 flex-shrink-0">1</span>
                      <span>Email <a href="mailto:returns@kryla.com" className="text-blue-600 font-medium">returns@kryla.com</a> with Order ID and reason for return</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-800 rounded-full text-xs font-bold mr-3 flex-shrink-0">2</span>
                      <span>Provide clear photos if the item is damaged/wrong</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-800 rounded-full text-xs font-bold mr-3 flex-shrink-0">3</span>
                      <span>Our team will respond within 48 hours with return instructions</span>
                    </li>
                  </ol>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Please include your order number in the subject line for faster processing.</p>
                </div>
              </div>
            </PolicyCard>

            <PolicyCard 
              icon={<RefreshCw className="w-6 h-6" />} 
              title="3. Return Shipping"
            >
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-800 mb-3">Who Pays for Return Shipping?</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Our Mistake (wrong/damaged item)</span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">FREE RETURN</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">We'll provide a prepaid return label</p>
                    </div>
                    
                    <div className="h-px bg-gray-200"></div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Customer's Choice (size/change of mind)</span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">CUSTOMER PAYS</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">You're responsible for return shipping costs</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        For your protection, we recommend using a trackable shipping service and purchasing shipping insurance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </PolicyCard>

            <PolicyCard 
              icon={<XCircle className="w-6 h-6" />} 
              title="4. Refunds"
            >
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Refund Processing</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.99 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                      </div>
                      <p className="ml-2 text-sm text-gray-600">
                        Processed within <span className="font-medium">5-7 business days</span> after we receive and inspect your return
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L3.99 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                      </div>
                      <p className="ml-2 text-sm text-gray-600">
                        Refund is credited to your <span className="font-medium">original payment method</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <h4 className="font-medium text-red-800 mb-2">Missing Refunds?</h4>
                  <p className="text-sm text-red-700">
                    If you haven't received your refund after 10 business days:
                  </p>
                  <ol className="list-decimal list-inside text-sm text-red-700 mt-2 space-y-1">
                    <li>Check with your bank/payment provider</li>
                    <li>Contact us at <a href="mailto:returns@kryla.com" className="text-blue-600 hover:underline">returns@kryla.com</a> if still unresolved</li>
                  </ol>
                </div>
              </div>
            </PolicyCard>
          </div>

          {/* Contact Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="flex items-start">
                  <div className="bg-black/5 p-3 rounded-lg">
                    <HelpCircle className="w-6 h-6 text-black" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Need Help?</h3>
                    <p className="text-gray-600 mb-4">
                      Our customer service team is here to assist you with any questions about returns or refunds.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="mailto:returns@kryla.com" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    returns@kryla.com
                  </a>
                  <a 
                    href="tel:+919876543210" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    +91 9XXXX XXXX0
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
            <div className="space-y-6 max-w-3xl mx-auto text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2 text-gray-500" />
                  <a href="mailto:returns@kryla.com" className="hover:underline">returns@kryla.com</a>
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <a href="https://www.kryla.com" target="_blank" rel="noopener noreferrer" className="hover:underline">www.kryla.com</a>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Effective Date: September 4, 2025
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

export default ReturnPolicy;

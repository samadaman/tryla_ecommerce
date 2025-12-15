import React from 'react';
import Footer from '@/component/footer';
import { Shield, Lock, User, Bell, Share2, Key, Cookie, RefreshCw, Mail, Globe } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Krylaa',
  description: 'Learn how Krylaa collects, uses, and protects your personal information.',
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

const PrivacyPage = () => {
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
              <Shield className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium tracking-wider">YOUR PRIVACY MATTERS</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Privacy Policy
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <div className="mt-12 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="relative py-20">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-900 to-transparent -mt-64"></div>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <PolicyCard 
              icon={<User className="w-6 h-6" />} 
              title="Information We Collect"
            >
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-black rounded-full mr-3"></div>
                  <span>Name, email address, shipping and billing details</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-black rounded-full mr-3"></div>
                  <span>Secure payment information processed by trusted third-parties</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-black rounded-full mr-3"></div>
                  <span>Browsing data and analytics to enhance your experience</span>
                </li>
              </ul>
            </PolicyCard>

            <PolicyCard 
              icon={<Bell className="w-6 h-6" />} 
              title="How We Use Your Data"
            >
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-black rounded-full mr-3"></div>
                  <span>Process and fulfill your orders efficiently</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-black rounded-full mr-3"></div>
                  <span>Continuously improve our website and services</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-black rounded-full mr-3"></div>
                  <span>Send relevant updates (only with your consent)</span>
                </li>
              </ul>
            </PolicyCard>

            <PolicyCard 
              icon={<Share2 className="w-6 h-6" />} 
              title="Information Sharing"
            >
              <p className="mb-4 text-gray-700">We value your privacy and never sell your information. Limited sharing only with:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-black rounded-full mr-3"></div>
                  <span>Trusted payment and shipping partners</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-black rounded-full mr-3"></div>
                  <span>When required by law or legal process</span>
                </li>
              </ul>
            </PolicyCard>

            <PolicyCard 
              icon={<Lock className="w-6 h-6" />} 
              title="Data Protection"
            >
              <p className="mb-4 text-gray-700">We implement robust security measures including:</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-black mb-1">256-bit</div>
                  <div className="text-xs text-gray-500">ENCRYPTION</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-black mb-1">24/7</div>
                  <div className="text-xs text-gray-500">MONITORING</div>
                </div>
              </div>
            </PolicyCard>

            <PolicyCard 
              icon={<Key className="w-6 h-6" />} 
              title="Your Rights"
            >
              <p className="mb-4 text-gray-700">You have full control over your data:</p>
              <div className="space-y-3">
                <button className="w-full text-left group">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                    <span>Request data access</span>
                    <span className="text-gray-400 group-hover:text-black">→</span>
                  </div>
                </button>
                <button className="w-full text-left group">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                    <span>Update your information</span>
                    <span className="text-gray-400 group-hover:text-black">→</span>
                  </div>
                </button>
                <button className="w-full text-left group">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                    <span>Delete your data</span>
                    <span className="text-gray-400 group-hover:text-black">→</span>
                  </div>
                </button>
              </div>
            </PolicyCard>

            <PolicyCard 
              icon={<Cookie className="w-6 h-6" />} 
              title="Cookie Policy"
            >
              <p className="mb-4 text-gray-700">We use cookies to enhance your experience:</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Essential</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Always Active</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Analytics</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Help us improve our services</p>
                </div>
              </div>
            </PolicyCard>
          </div>

          {/* Policy Updates Card */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-black/5 p-3 rounded-lg">
                    <RefreshCw className="w-6 h-6 text-black" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Policy Updates</h3>
                    <p className="text-gray-600 mb-4">
                      We may update this policy periodically. We'll notify you of significant changes through our website or email.
                    </p>
                    <p className="text-sm text-gray-500">
                      Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Need help?</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="mailto:privacy@krylaa.com" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    privacy@krylaa.com
                  </a>
                  <a 
                    href="https://krylaa.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Our Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPage;

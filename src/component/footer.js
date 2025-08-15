'use client';

import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          
          {/* Column 1 - Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Tryla</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for fashion essentials. Shop the latest trends and styles.
            </p>
            
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter className="w-6 h-6" />
              </a>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <FiMail className="w-5 h-5 mr-2" />
                <span>support@tryla.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FiPhone className="w-5 h-5 mr-2" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FiMapPin className="w-5 h-5 mr-2" />
                <span>110025 Mohan Estate, New Delhi</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a>
              </li>
              <li>
                <a href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns Policy</a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <div className="space-y-4">
              <div className="flex items-center text-gray-400">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Free Shipping</h4>
                  <p className="text-sm">On Orders Above ₹299</p>
                </div>
              </div>

              <div className="flex items-center text-gray-400">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Easy Returns</h4>
                  <p className="text-sm">15-Day Return Policy</p>
                </div>
              </div>

              <div className="flex items-center text-gray-400">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">100% Authentic</h4>
                  <p className="text-sm">1900+ Brands • 1.2 Lakh+ Products</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 - Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter and get 10% off your first purchase.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400"> 2025 Tryla. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

const navigationLinks = [
  { href: '/shop', label: 'Categories' },
  { href: '/about', label: 'Brands' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                Tryla Clothing
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center justify-center mt-4">
              <div className="flex items-center justify-center space-x-6">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-base md:text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input type="text" placeholder="Search..." className="px-4 text-gray-400 py-2 border rounded-full" />
                <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/cart" className="text-gray-600 hover:text-gray-800">
                <FiShoppingCart size={24} />
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-800">
                <FiUser size={24} />
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-800">
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/shop" className="text-gray-600 hover:text-gray-800">Shop</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link>
              <div className="relative">
                <input type="text" placeholder="Search..." className="px-4 py-2 border rounded-full w-full" />
                <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/cart" className="text-gray-600 hover:text-gray-800">
                  <FiShoppingCart size={24} />
                </Link>
                <Link href="/login" className="text-gray-600 hover:text-gray-800">
                  <FiUser size={24} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
     
    </>
  );
};

export default Header;
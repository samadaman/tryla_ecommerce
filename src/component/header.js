'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

const navigationLinks = [
  { href: '/shop', label: 'Categories' },
  { href: '/Fashion', label: 'Fashion' },
  { href: '/Newlook', label: 'Newlook' },
  { href: '/about', label: 'Brands' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user in localStorage on component mount
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex justify-between items-center py-3">
          
          {/* Logo */}
          <Link href="/" className="text-lg sm:text-2xl font-bold text-gray-800 whitespace-nowrap">
            Tryla Clothing
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm xl:text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Search + Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative w-40 xl:w-56">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 text-sm border rounded-full pr-10 text-gray-600"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Cart */}
            <Link href="/cart" className="text-gray-600 hover:text-gray-800 ">
              <FiShoppingCart size={24} />
            </Link>

            {/* Profile */}
            <div className="relative profile-dropdown flex items-center">
            
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none relative cursor-pointer"
              >
                <FiUser size={24} />
              </button>
                {user && (
                <span className="text-sm font-medium text-gray-700 relative left-3 hidden md:inline-block">
                  Hi, {user.name.split(' ')[0]}
                </span>
              )}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-4 border-t border-gray-200">
          {user && (
            <div className="py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Hi, {user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          )}
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-600 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-full text-gray-600 pr-10"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-600 hover:text-gray-800">
              <FiShoppingCart size={22} />
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800"
              >
                Sign out
              </button>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-gray-800">
                <FiUser size={22} />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;

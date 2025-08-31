'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiBell, FiMenu, FiLogOut, FiChevronDown } from 'react-icons/fi';

export default function Topbar({ toggleSidebar, isSidebarCollapsed }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState('Admin');
  
  useEffect(() => {
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
    if (user?.name) {
      setAdminName(user.name.split(' ')[0]); // Get first name only
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const welcomeText = `Welcome back, ${adminName}! 👋`;
  const currentTime = new Date().getHours();
  let greeting = 'Good day';
  
  if (currentTime < 12) greeting = 'Good morning';
  else if (currentTime >= 18) greeting = 'Good evening';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left section - Toggle button */}
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <FiMenu className="w-5 h-5" />
          </button>
          
          {/* Welcome message */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center ml-6"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg ring-1 ring-gray-200">
                <p className="text-sm font-medium text-gray-700">{greeting}</p>
                <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                  {welcomeText}
                </h2>
              </div>
              
              {/* Animated dots */}
              <div className="absolute -right-2 -top-2 flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500 focus:outline-none transition-all"
              placeholder="Search..."
            />
          </motion.div>

          {/* Notifications */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-500 hover:text-gray-700 relative rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </motion.button>

          {/* User dropdown */}
          <div className="relative ml-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-sm">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:flex items-center">
                <span className="text-sm font-medium text-gray-700">{adminName}</span>
                <FiChevronDown className={`ml-1 h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </div>
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{adminName}</p>
                    <p className="text-xs text-gray-500 truncate">Administrator</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <FiLogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

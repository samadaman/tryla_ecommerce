'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaBox, 
  FaList, 
  FaShoppingCart, 
  FaTachometerAlt, 
  FaUserCog, 
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { 
    href: '/admin', 
    label: 'Dashboard', 
    icon: <FaTachometerAlt className="text-lg" />,
    exact: true
  },
  { 
    href: '/admin/categories', 
    label: 'Categories', 
    icon: <FaList className="text-lg" />,
    exact: false
  },
  { 
    href: '/admin/products', 
    label: 'Products', 
    icon: <FaBox className="text-lg" />,
    exact: false
  },
  { 
    href: '/admin/orders', 
    label: 'Orders', 
    icon: <FaShoppingCart className="text-lg" />,
    exact: false
  },
  { 
    href: '/admin/users', 
    label: 'Users', 
    icon: <FaUserCog className="text-lg" />,
    exact: false
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (href, exact = false) => {
    return exact ? pathname === href : pathname.startsWith(href);
  };

  const sidebarVariants = {
    open: { width: '16rem' },
    closed: { width: '5rem' }
  };

  const contentVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 }
  };

  return (
    <motion.div 
      className={`h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col fixed z-50 shadow-xl ${isCollapsed ? 'w-20' : 'w-64'}`}
      initial={isMobile ? 'closed' : 'open'}
      animate={isCollapsed ? 'closed' : 'open'}
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <motion.div 
            className="flex items-center"
            initial="open"
            animate={isCollapsed ? 'closed' : 'open'}
            variants={contentVariants}
          >
            <div className="bg-white text-gray-900 p-2 rounded-lg mr-3">
              <FaTachometerAlt className="text-xl" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              KRYLA
            </h2>
          </motion.div>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navLinks.map((link) => {
          const active = isActive(link.href, link.exact);
          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                  active 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`${active ? 'text-white' : 'text-gray-400'}`}>
                  {link.icon}
                </span>
                {!isCollapsed && (
                  <motion.span 
                    className="ml-3 font-medium"
                    initial="open"
                    animate={isCollapsed ? 'closed' : 'open'}
                    variants={contentVariants}
                  >
                    {link.label}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User & Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {typeof window !== 'undefined' && localStorage.getItem('user') 
              ? JSON.parse(localStorage.getItem('user')).name.charAt(0).toUpperCase()
              : 'A'}
          </div>
          {!isCollapsed && (
            <motion.div 
              className="ml-3"
              initial="open"
              animate={isCollapsed ? 'closed' : 'open'}
              variants={contentVariants}
            >
              <p className="text-sm font-medium text-white">
                {typeof window !== 'undefined' && localStorage.getItem('user') 
                  ? JSON.parse(localStorage.getItem('user')).name
                  : 'Admin'}
              </p>
              <p className="text-xs text-gray-400">Administrator</p>
            </motion.div>
          )}
        </div>
        
        {!isCollapsed && (
          <motion.div 
            className="mt-4 text-xs text-gray-500 text-center"
            initial="open"
            animate={isCollapsed ? 'closed' : 'open'}
            variants={contentVariants}
          >
            <p> {new Date().getFullYear()} KRYLA CLOTHING</p>
            <p className="text-2xs mt-1 opacity-50">v1.0.0</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

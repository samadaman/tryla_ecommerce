'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBox, FaList, FaShoppingCart, FaTachometerAlt } from 'react-icons/fa';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: <FaTachometerAlt className="mr-3" /> },
  { href: '/admin/categories', label: 'Categories', icon: <FaList className="mr-3" /> },
  { href: '/admin/products', label: 'Products', icon: <FaBox className="mr-3" /> },
  { href: '/admin/orders', label: 'Orders', icon: <FaShoppingCart className="mr-3" /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="px-3 py-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="bg-gray-800 text-white p-2 rounded-lg mr-3">
            <FaTachometerAlt />
          </span>
          <span className="text-gray-800">KRYLA CLOTHING</span>
        </h2>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              pathname === link.href
                ? 'bg-blue-100 text-blue-800 font-semibold'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <span className={pathname === link.href ? 'text-blue-600' : 'text-gray-500'}>
              {link.icon}
            </span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-600">
          {new Date().getFullYear()} KRYLA CLOTHING
        </div>
      </div>
    </div>
  );
}

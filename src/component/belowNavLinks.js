'use client';

import Link from 'next/link';

const BelowNavLinks = () => {
  const links = [
    { href: '/mens', text: 'Men' },
    { href: '/womens', text: 'Women' },
    { href: '/kids', text: 'Kids' },
    { href: '/accessories', text: 'Accessories' },
    { href: '/shoes', text: 'Shoes' },
    { href: '/bags', text: 'Bags' },
    { href: '/jewelry', text: 'Jewelry' },
    { href: '/sale', text: 'Sale' },
    { href: '/new-arrivals', text: 'New Arrivals' },
    { href: '/best-sellers', text: 'Best Sellers' },
    { href: '/custom-fit', text: 'Custom Fit' }
  ];

  return (
    <div className="bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* On small screens: horizontal scroll, On large: centered */}
        <div className="flex space-x-4 sm:space-x-6 py-2 sm:py-3 overflow-x-auto scrollbar-hide md:justify-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex-shrink-0 whitespace-nowrap text-gray-600 hover:text-gray-800 transition-colors px-2 sm:px-0 text-sm sm:text-base"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BelowNavLinks;

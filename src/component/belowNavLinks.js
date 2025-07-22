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
    <div className="hidden md:block bg-gray-50 border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap md:flex-nowrap justify-center space-x-4 md:space-x-8 py-2 md:py-4">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-gray-600 hover:text-gray-800 transition-colors px-2 md:px-0"
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
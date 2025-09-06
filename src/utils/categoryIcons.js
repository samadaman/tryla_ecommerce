/**
 * Category Icons Utility
 * 
 * This file provides consistent, modern line icons for product categories.
 * Each icon is implemented as an SVG component that can be easily used throughout the application.
 */

import React from 'react';

// Base SVG icon component with consistent styling
const BaseIcon = ({ children, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-6 h-6 ${className}`}
  >
    {children}
  </svg>
);

// Individual category icons
const icons = {
  // Electronics
  electronics: (
    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zM12 22V12M22 12l-10 7L2 12" />
  ),
  
  // Clothing
  clothing: (
    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
  ),
  
  // Books
  books: (
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v15H6.5a2.5 2.5 0 0 0 0 5H20" />
  ),
  
  // Home
  home: (
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  ),
  
  // Sports
  sports: (
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
  ),
  
  // Beauty
  beauty: (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  ),
  
  // Toys
  toys: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  ),
  
  // Food
  food: (
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z" />
  ),
  
  // Default icon (for uncategorized items)
  default: (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  )
};

// Auto-generate icon based on category name
export const getCategoryIcon = (categoryName = '') => {
  if (!categoryName) return icons.default;
  
  const normalized = categoryName.toLowerCase().trim();
  
  // Check for direct matches first
  if (icons[normalized]) {
    return icons[normalized];
  }
  
  // Common category mappings
  const categoryMappings = {
    electronic: 'electronics',
    cloth: 'clothing',
    book: 'books',
    house: 'home',
    sport: 'sports',
    cosmetic: 'beauty',
    toy: 'toys',
    grocery: 'food',
    furniture: 'home',
    kitchen: 'home',
    accessory: 'clothing'
  };
  
  // Check for partial matches
  for (const [key, value] of Object.entries(categoryMappings)) {
    if (normalized.includes(key)) {
      return icons[value];
    }
  }
  
  // Default to a generic icon
  return icons.default;
};

// CategoryIcon component
export const CategoryIcon = ({ category, className = '', ...props }) => {
  const icon = getCategoryIcon(category);
  return (
    <BaseIcon className={className} {...props}>
      {icon}
    </BaseIcon>
  );
};

export default CategoryIcon;

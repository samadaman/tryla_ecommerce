import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CategoriesDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const leaveTimer = useRef(null);
  const isMouseOverDropdown = useRef(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:4000/categories');
        const result = await response.json();
        
        if (response.ok) {
          const categoriesData = result.data || [];
          setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        } else {
          throw new Error(result.message || 'Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div 
      className="relative h-full" 
      ref={dropdownRef}
      onMouseEnter={() => {
        clearTimeout(leaveTimer.current);
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        // Add a small delay before closing to allow moving to dropdown
        leaveTimer.current = setTimeout(() => {
          if (!isMouseOverDropdown.current) {
            setIsOpen(false);
          }
        }, 200);
      }}
    >
      <button
        onClick={toggleDropdown}
        className="h-full flex items-center px-2 text-gray-700 hover:text-primary-600 text-sm font-medium border-b-2 border-transparent hover:border-primary-600 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-base">Categories</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 ml-1" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform duration-200" />
        )}
      </button>

      <div 
        className={`bg-white absolute left-0 mt-1 w-72 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 z-50 ${
          isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={() => {
          clearTimeout(leaveTimer.current);
          isMouseOverDropdown.current = true;
        }}
        onMouseLeave={() => {
          isMouseOverDropdown.current = false;
          leaveTimer.current = setTimeout(() => {
            setIsOpen(false);
          }, 200);
        }}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-2" role="none">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">Shop by Category</h3>
          </div>
          {categories.length > 0 ? (
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group relative flex items-center px-5 py-3.5 text-sm text-gray-700 hover:text-gray-500 transition-all duration-300 hover:pl-6"
                  role="menuitem"
                >
                  <span className="relative z-10 flex items-center w-full">
                    <span className="w-2 h-2 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 mr-3 transition-all duration-300 transform -translate-x-1 group-hover:translate-x-0"></span>
                    <span className="capitalize font-medium">{category.name}</span>
                    <span className="ml-auto flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                      <span className="text-xs mr-2 text-gray-500 group-hover:text-gray-200">Shop now</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-5 py-4 text-sm text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              No categories found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesDropdown;

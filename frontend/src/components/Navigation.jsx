// src/components/Navigation.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../config/navigationItems';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="flex justify-between items-center w-full">
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-4">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            title={item.description}
            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center 
              ${isActive(item.path) 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full md:hidden">
          <div className="bg-white shadow-lg">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`block px-4 py-3 border-b 
                  ${isActive(item.path) 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <Link to="/">
              <img className="h-8 w-auto" src="/src/assets/images/logo.svg" alt="Logo" />
            </Link>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="flex justify-center md:justify-end space-x-6">
              <Link to="/about" className="text-gray-500 hover:text-gray-700">
                About
              </Link>
              <Link to="/safety" className="text-gray-500 hover:text-gray-700">
                Safety
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-700">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-gray-700">
                Privacy
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-gray-700">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Skill Share Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
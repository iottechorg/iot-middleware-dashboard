// src/components/layout/Footer.jsx
import React from 'react';

/**
 * Footer component for main layout
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            © {currentYear} IoT Middleware Dashboard
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Documentation
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Support
          </a>
          <div className="flex items-center text-sm text-gray-500">
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
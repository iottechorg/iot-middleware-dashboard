
// src/components/layout/MainLayout.jsx
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

/**
 * Main layout component that provides the app structure
 * @param {Object} props
 * @param {React.ReactNode} props.children - Main content
 */
const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`
          ${sidebarOpen ? 'w-64' : 'w-20'} 
          transition-all duration-300 ease-in-out
          fixed inset-y-0 left-0 z-30 
          bg-gray-800 
          md:relative
        `}
      >
        <Sidebar collapsed={!sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      
      {/* Main Content */}
      <div className={`
        flex-1 flex flex-col
        transition-all duration-300 ease-in-out
        ml-0 md:ml-${sidebarOpen ? '64' : '20'}
      `}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children}
        </main>
        
        <Footer />
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default MainLayout;
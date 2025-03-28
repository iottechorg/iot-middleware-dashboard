// src/components/layout/Header.jsx
import React from 'react'; // Import React

import { Search, Bell, Settings, Menu } from 'lucide-react';
import { useState } from 'react';

const Header = ({ activePanel }) => {
  const [notifications, setNotifications] = useState(3);
  
  // Map panel IDs to display titles
  const panelTitles = {
    overview: 'Overview Dashboard',
    devices: 'Device Management',
    protocols: 'Protocol Handlers',
    dataProcessing: 'Data Processing',
    taskOffloading: 'Task Offloading',
    systemConfig: 'System Configuration',
    alerts: 'Alerts & Notifications'
  };

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button className="mr-4 lg:hidden">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold">{panelTitles[activePanel]}</h1>
      </div>
      
      <div className="flex items-center">
        <div className="relative mr-4">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        
        <div className="relative mr-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>
        
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
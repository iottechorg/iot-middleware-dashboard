// src/components/layout/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Computer, 
  Network, 
  Database, 
  Server, 
  Settings, 
  Bell,
  Pin,
  PinOff
} from 'lucide-react';

const Sidebar = ({ activePanel, setActivePanel }) => {
  // Whether the sidebar is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(true);
  // Whether the sidebar is pinned (stays open) or not
  const [isPinned, setIsPinned] = useState(true);
  // Track if we're currently hovering
  const [isHovering, setIsHovering] = useState(false);

  const navItems = [
    { id: 'overview', name: 'Overview Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'devices', name: 'Device Management', icon: <Computer size={20} /> },
    { id: 'protocols', name: 'Protocol Handlers', icon: <Network size={20} /> },
    { id: 'dataProcessing', name: 'Data Processing', icon: <Database size={20} /> },
    { id: 'taskOffloading', name: 'Task Offloading', icon: <Server size={20} /> },
    { id: 'systemConfig', name: 'System Configuration', icon: <Settings size={20} /> },
    { id: 'alerts', name: 'Alerts & Notifications', icon: <Bell size={20} /> },
  ];

  // Toggle whether the sidebar is pinned or not
  const togglePin = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    
    // If unpinning, collapse the sidebar immediately
    if (!newPinnedState) {
      setIsExpanded(false);
    } else {
      // If pinning, expand the sidebar
      setIsExpanded(true);
    }
    
    // Save to localStorage
    localStorage.setItem('sidebarPinned', newPinnedState.toString());
    localStorage.setItem('sidebarExpanded', newPinnedState.toString());
  };

  // Handle mouse enter/leave events for hover functionality
  const handleMouseEnter = () => {
    setIsHovering(true);
    // Only temporarily expand if not pinned
    if (!isPinned && !isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Only collapse if not pinned
    if (!isPinned) {
      setIsExpanded(false);
    }
  };

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedPinned = localStorage.getItem('sidebarPinned');
    
    if (savedPinned !== null) {
      const isPinnedValue = savedPinned === 'true';
      setIsPinned(isPinnedValue);
      // Set expanded state based on pinned state
      setIsExpanded(isPinnedValue);
    }
  }, []);

  return (
    <div 
      className={`${isExpanded ? 'w-64' : 'w-16'} bg-gray-800 text-white flex flex-col h-full transition-all duration-300 ease-in-out relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Pin button - only shown when expanded */}
      {isExpanded && (
        <button 
          onClick={togglePin}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
          title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
        >
          {isPinned ? <Pin size={16} /> : <PinOff size={16} />}
        </button>
      )}

      <div className={`p-4 border-b border-gray-700 flex items-center ${!isExpanded ? 'justify-center' : ''}`}>
        {!isExpanded 
          ? <span className="font-bold text-lg">IoT</span>
          : <h1 className="text-xl font-bold">IoT Middleware</h1>
        }
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className={!isExpanded ? 'px-1' : 'px-2'}>
              <button
                onClick={() => setActivePanel(item.id)}
                className={`w-full flex items-center ${!isExpanded ? 'justify-center' : ''} p-3 mb-1 rounded-lg text-left ${
                  activePanel === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                title={!isExpanded ? item.name : ''}
              >
                <span className={!isExpanded ? '' : 'mr-3'}>
                  {item.icon}
                </span>
                {isExpanded && (
                  <span>{item.name}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  );
};

export default Sidebar;
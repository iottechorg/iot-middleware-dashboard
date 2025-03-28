// src/components/panels/devices/DeviceList.jsx
import React, { useState, useEffect } from 'react';
import StatusIndicator from '../common/StatusIndicator';
import Card from '../common/Card';

/**
 * Device list component with filtering and pagination
 * @param {Object} props
 * @param {Array} props.devices - List of devices
 * @param {Function} [props.onSelectDevice] - Callback when a device is selected
 * @param {boolean} [props.loading=false] - Whether data is loading
 */
const DeviceList = ({
  devices = [],
  onSelectDevice,
  loading = false,
  ...props
}) => {
  const [filteredDevices, setFilteredDevices] = useState(devices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProtocol, setFilterProtocol] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Update filtered devices when filters change
  useEffect(() => {
    let result = [...devices];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(device => 
        device.name.toLowerCase().includes(term) || 
        device.id.toLowerCase().includes(term) ||
        (device.location && device.location.toLowerCase().includes(term))
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(device => device.status === filterStatus);
    }
    
    // Apply protocol filter
    if (filterProtocol !== 'all') {
      result = result.filter(device => device.protocol === filterProtocol);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'lastSeen':
          // Convert relative time to timestamp for comparison
          const getTimestamp = (relativeTime) => {
            if (relativeTime.includes('just now')) return Date.now();
            if (relativeTime.includes('min')) {
              const mins = parseInt(relativeTime);
              return Date.now() - (mins * 60 * 1000);
            }
            if (relativeTime.includes('hour')) {
              const hours = parseInt(relativeTime);
              return Date.now() - (hours * 60 * 60 * 1000);
            }
            // Default to current time if format not recognized
            return Date.now();
          };
          
          comparison = getTimestamp(b.lastSeen) - getTimestamp(a.lastSeen);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredDevices(result);
    setCurrentPage(1); // Reset to first page after filtering
  }, [devices, searchTerm, filterStatus, filterProtocol, sortBy, sortOrder]);
  
  // Get unique protocol values for filter
  const protocols = ['all', ...new Set(devices.map(device => device.protocol))];
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle sort header click
  const handleSortClick = (field) => {
    if (sortBy === field) {
      // Toggle sort order if already sorting by this field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field with default ascending order
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  // Render loading state
  if (loading) {
    return (
      <Card className="overflow-hidden" {...props}>
        <div className="p-4">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden" {...props}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search devices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="warning">Warning</option>
            </select>
            
            <select
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterProtocol}
              onChange={(e) => setFilterProtocol(e.target.value)}
            >
              {protocols.map((protocol) => (
                <option key={protocol} value={protocol}>
                  {protocol === 'all' ? 'All Protocols' : protocol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick('name')}
              >
                <div className="flex items-center">
                  Device
                  {sortBy === 'name' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 ${sortOrder === 'asc' ? '' : 'transform rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Protocol
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick('status')}
              >
                <div className="flex items-center">
                  Status
                  {sortBy === 'status' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 ${sortOrder === 'asc' ? '' : 'transform rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick('lastSeen')}
              >
                <div className="flex items-center">
                  Last Seen
                  {sortBy === 'lastSeen' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 ${sortOrder === 'asc' ? '' : 'transform rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedDevices.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No devices found matching your filters.
                </td>
              </tr>
            ) : (
              paginatedDevices.map((device) => (
                <tr 
                  key={device.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onSelectDevice && onSelectDevice(device)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <StatusIndicator status={device.status} size="sm" className="mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.protocol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      device.status === 'online' 
                        ? 'bg-green-100 text-green-800' 
                        : device.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.lastSeen}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.location || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDevice && onSelectDevice(device);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {Math.min(((currentPage - 1) * itemsPerPage) + 1, filteredDevices.length)} to {Math.min(currentPage * itemsPerPage, filteredDevices.length)} of {filteredDevices.length} devices
          </div>
          
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DeviceList;
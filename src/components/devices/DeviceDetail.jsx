// src/components/panels/devices/DeviceDetail.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import StatusIndicator from '../common/StatusIndicator';
import { formatDate } from '../../utils/dateUtils';

/**
 * Device detail view component
 * @param {Object} props
 * @param {Object} props.device - Device object
 * @param {Function} [props.onClose] - Callback when detail view is closed
 * @param {Function} [props.onEdit] - Callback to edit device
 * @param {Function} [props.onDelete] - Callback to delete device
 * @param {boolean} [props.loading=false] - Whether data is loading
 */
const DeviceDetail = ({
  device,
  onClose,
  onEdit,
  onDelete,
  loading = false,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState('info');
  
  // Render loading state
  if (loading) {
    return (
      <Card className="h-full" {...props}>
        <div className="p-4">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 gap-4">
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </Card>
    );
  }
  
  // Render empty state if no device
  if (!device) {
    return (
      <Card className="h-full flex items-center justify-center p-8" {...props}>
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No device selected</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a device from the list to view its details.
          </p>
        </div>
      </Card>
    );
  }
  
  // Function to get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get mock telemetry data
  const getTelemetryData = () => {
    // In a real app, this would come from the API
    return [
      { name: 'Temperature', value: '24.5°C', timestamp: new Date(Date.now() - 60000) },
      { name: 'Humidity', value: '45%', timestamp: new Date(Date.now() - 60000) },
      { name: 'Battery', value: '87%', timestamp: new Date(Date.now() - 60000) },
      { name: 'Signal Strength', value: '-72 dBm', timestamp: new Date(Date.now() - 60000) },
    ];
  };
  
  // Get mock event log
  const getEventLog = () => {
    // In a real app, this would come from the API
    return [
      { 
        id: 'evt-001', 
        type: 'connection', 
        message: 'Device connected', 
        timestamp: new Date(Date.now() - 3600000) 
      },
      { 
        id: 'evt-002', 
        type: 'data', 
        message: 'Telemetry data received', 
        timestamp: new Date(Date.now() - 3000000) 
      },
      { 
        id: 'evt-003', 
        type: 'config', 
        message: 'Configuration updated', 
        timestamp: new Date(Date.now() - 2400000) 
      },
      { 
        id: 'evt-004', 
        type: 'warning', 
        message: 'High temperature alert', 
        timestamp: new Date(Date.now() - 1800000) 
      },
      { 
        id: 'evt-005', 
        type: 'data', 
        message: 'Telemetry data received', 
        timestamp: new Date(Date.now() - 600000) 
      },
    ];
  };
  
  // Get event type badge color
  const getEventTypeBadgeColor = (type) => {
    switch (type) {
      case 'connection':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'config':
        return 'bg-blue-100 text-blue-800';
      case 'data':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'telemetry':
        return (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Latest Telemetry</h4>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getTelemetryData().map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.timestamp, 'time')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="secondary" size="sm">
                View All Telemetry
              </Button>
            </div>
          </div>
        );
        
      case 'events':
        return (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Event Log</h4>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getEventLog().map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeBadgeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(event.timestamp, 'datetime')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="secondary" size="sm">
                View All Events
              </Button>
            </div>
          </div>
        );
        
      case 'config':
        return (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Device Configuration</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-sm text-gray-700 overflow-auto">
                {JSON.stringify({
                  reportingInterval: 300,
                  thresholds: {
                    temperature: { min: 10, max: 35 },
                    humidity: { min: 20, max: 80 }
                  },
                  powerSaving: true,
                  firmware: {
                    version: '1.2.4',
                    updateAvailable: false
                  }
                }, null, 2)}
              </pre>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="secondary" size="sm" className="mr-2">
                Update Configuration
              </Button>
              <Button variant="secondary" size="sm">
                Check for Updates
              </Button>
            </div>
          </div>
        );
        
      case 'info':
      default:
        return (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Device Information</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Device ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{device.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{device.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{device.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Protocol</dt>
                  <dd className="mt-1 text-sm text-gray-900">{device.protocol}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{device.location || '—'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Seen</dt>
                  <dd className="mt-1 text-sm text-gray-900">{device.lastSeen}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">IP Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">192.168.1.105</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Firmware Version</dt>
                  <dd className="mt-1 text-sm text-gray-900">1.2.4</dd>
                </div>
              </dl>
            </div>
          </div>
        );
    }
  };
  
  return (
    <Card className="h-full" {...props}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <StatusIndicator status={device.status} className="mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
              <p className="text-sm text-gray-500">{device.id}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit && onEdit(device)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete && onDelete(device)}
            >
              Delete
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {['info', 'telemetry', 'events', 'config'].map((tab) => (
            <button
              key={tab}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="p-4">
        {renderTabContent()}
      </div>
    </Card>
  );
};

export default DeviceDetail;
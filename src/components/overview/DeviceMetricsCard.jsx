// src/components/panels/overview/DeviceMetricsCard.jsx
import React from 'react';
import Card from '../common/Card';
import StatusIndicator from '../common/StatusIndicator';

/**
 * Card that displays key device metrics
 * @param {Object} props
 * @param {number} props.connectedDevices - Total connected devices
 * @param {number} props.activeDevices - Number of active devices
 * @param {number} props.messagesPerMinute - Messages processed per minute
 * @param {number} props.changePercentage - Percentage change from previous period
 */
const DeviceMetricsCard = ({
  connectedDevices = 0,
  activeDevices = 0,
  messagesPerMinute = 0,
  changePercentage = 0,
  ...props
}) => {
  // Determine if change is positive or negative
  const isPositiveChange = changePercentage >= 0;
  
  return (
    <Card className="h-full" {...props}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Device Metrics</h3>
        <StatusIndicator 
          status={activeDevices > 0 ? 'online' : 'offline'} 
          label={activeDevices > 0 ? 'Active' : 'No active devices'}
          pulse={activeDevices > 0}
        />
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Connected Devices</p>
            <p className="text-2xl font-bold">{connectedDevices.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Active Devices</p>
            <p className="text-2xl font-bold">{activeDevices.toLocaleString()}</p>
            <p className="text-xs text-gray-500">
              {((activeDevices / connectedDevices) * 100).toFixed(1)}% of total
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Messages Per Minute</p>
          <div className="flex items-end space-x-2">
            <p className="text-2xl font-bold">{messagesPerMinute.toLocaleString()}</p>
            <div className={`text-sm ${isPositiveChange ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              <span>
                {isPositiveChange ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              <span>{Math.abs(changePercentage).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DeviceMetricsCard;
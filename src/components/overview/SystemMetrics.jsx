// src/components/panels/overview/SystemMetrics.jsx
import React from 'react';
import Card from '../common/Card';

/**
 * System metrics summary card
 * @param {Object} props
 * @param {number} props.cpuUsage - CPU usage percentage
 * @param {number} props.memoryUsage - Memory usage percentage
 * @param {number} props.diskUsage - Disk usage percentage
 * @param {number} props.uptime - System uptime in seconds
 * @param {string} props.version - System version
 * @param {boolean} [props.loading=false] - Whether data is loading
 */
const SystemMetrics = ({
  cpuUsage = 0,
  memoryUsage = 0,
  diskUsage = 0,
  uptime = 0,
  version = '',
  loading = false,
  ...props
}) => {
  // Helper to format uptime from seconds to days, hours, minutes
  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    
    return parts.join(' ');
  };
  
  // Helper to get color based on usage percentage
  const getUsageColor = (percentage) => {
    if (percentage < 60) return 'text-green-500';
    if (percentage < 85) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Render loading state
  if (loading) {
    return (
      <Card title="System Information" className="h-full" {...props}>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card title="System Information" className="h-full" {...props}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">CPU Usage</h4>
          <div className="flex items-baseline">
            <span className={`text-2xl font-bold ${getUsageColor(cpuUsage)}`}>
              {cpuUsage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${
                cpuUsage < 60 ? 'bg-green-500' :
                cpuUsage < 85 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(cpuUsage, 100)}%` }}
            />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Memory Usage</h4>
          <div className="flex items-baseline">
            <span className={`text-2xl font-bold ${getUsageColor(memoryUsage)}`}>
              {memoryUsage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${
                memoryUsage < 60 ? 'bg-green-500' :
                memoryUsage < 85 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(memoryUsage, 100)}%` }}
            />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Disk Usage</h4>
          <div className="flex items-baseline">
            <span className={`text-2xl font-bold ${getUsageColor(diskUsage)}`}>
              {diskUsage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${
                diskUsage < 60 ? 'bg-green-500' :
                diskUsage < 85 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(diskUsage, 100)}%` }}
            />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">System Uptime</h4>
          <p className="text-2xl font-bold text-gray-800">{formatUptime(uptime)}</p>
          <p className="text-xs text-gray-500 mt-2">Version: {version}</p>
        </div>
      </div>
    </Card>
  );
};

export default SystemMetrics;
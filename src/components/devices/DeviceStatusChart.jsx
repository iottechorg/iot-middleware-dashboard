// src/components/panels/devices/DeviceStatusChart.jsx
import React from 'react';
import Card from '../common/Card';
import PieChart from '../charts/PieChart';

/**
 * Component for displaying device status distribution
 * @param {Object} props
 * @param {Array} props.devices - List of all devices
 * @param {boolean} [props.loading=false] - Whether data is loading
 */
const DeviceStatusChart = ({
  devices = [],
  loading = false,
  ...props
}) => {
  // Count devices by status
  const getStatusCounts = () => {
    const counts = {
      online: 0,
      offline: 0,
      warning: 0
    };
    
    devices.forEach((device) => {
      if (counts[device.status] !== undefined) {
        counts[device.status]++;
      } else {
        counts.offline++;
      }
    });
    
    return [
      { name: 'Online', value: counts.online },
      { name: 'Offline', value: counts.offline },
      { name: 'Warning', value: counts.warning }
    ];
  };
  
  // Get status distribution data
  const statusData = getStatusCounts();
  
  // Custom colors for status
  const statusColors = ['#10B981', '#6B7280', '#F59E0B'];
  
  // Count devices by protocol
  const getProtocolCounts = () => {
    const counts = {};
    
    devices.forEach((device) => {
      counts[device.protocol] = (counts[device.protocol] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };
  
  // Get protocol distribution data
  const protocolData = getProtocolCounts();
  
  // Custom colors for protocols
  const protocolColors = ['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899'];
  
  // Count devices by type
  const getTypeCounts = () => {
    const counts = {};
    
    devices.forEach((device) => {
      counts[device.type] = (counts[device.type] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };
  
  // Get type distribution data
  const typeData = getTypeCounts();
  
  // Render loading state
  if (loading) {
    return (
      <Card {...props}>
        <div className="p-4">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card {...props}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Device Statistics</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Status Distribution */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2 text-center">Status Distribution</h4>
            <div className="h-48">
              <PieChart
                data={statusData}
                nameKey="name"
                dataKey="value"
                colors={statusColors}
                height="100%"
              />
            </div>
            <div className="mt-2 flex justify-center gap-4">
              {statusData.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: statusColors[index] }}
                  />
                  <span className="text-xs">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Protocol Distribution */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2 text-center">Protocol Distribution</h4>
            <div className="h-48">
              <PieChart
                data={protocolData}
                nameKey="name"
                dataKey="value"
                colors={protocolColors}
                height="100%"
              />
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
              {protocolData.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: protocolColors[index % protocolColors.length] }}
                  />
                  <span className="text-xs">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Type Distribution */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2 text-center">Type Distribution</h4>
            <div className="h-48">
              <PieChart
                data={typeData}
                nameKey="name"
                dataKey="value"
                colors={protocolColors.slice().reverse()}
                height="100%"
              />
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
              {typeData.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: protocolColors.slice().reverse()[index % protocolColors.length] }}
                  />
                  <span className="text-xs">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Summary statistics */}
        <div className="mt-6 bg-gray-50 p-4 rounded-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Total Devices</h4>
              <p className="text-2xl font-semibold text-gray-900">{devices.length}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Online Devices</h4>
              <p className="text-2xl font-semibold text-green-600">{statusData[0].value}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Device Types</h4>
              <p className="text-2xl font-semibold text-gray-900">{typeData.length}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Protocols</h4>
              <p className="text-2xl font-semibold text-gray-900">{protocolData.length}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DeviceStatusChart;
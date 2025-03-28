// src/components/panels/OverviewDashboard.jsx
import React, { useState, useEffect } from 'react';
import DeviceMetricsCard from '../overview/DeviceMetricsCard';
import ProtocolDistribution from '../overview/ProtocolDistribution';
import ResourceUtilization from '../overview/ResourceUtilization';
import StatusCard from '../overview/StatusCard';
import SystemMetrics from '../overview/SystemMetrics';

// Fallback data generator for when API is not available
const generateFallbackTimeSeriesData = (points = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      devices: Math.floor(85 + Math.random() * 25),
      messages: Math.floor(300 + Math.random() * 150),
      cpu: Math.floor(20 + Math.random() * 40),
      memory: Math.floor(30 + Math.random() * 30),
      diskIo: Math.floor(15 + Math.random() * 25),
      network: Math.floor(25 + Math.random() * 35)
    });
  }
  
  return data;
};

// Helper for getting system component icons
const getComponentIcon = (componentName) => {
  const name = componentName.toLowerCase();
  
  if (name.includes('api') || name.includes('gateway')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  } else if (name.includes('device')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    );
  } else if (name.includes('data') || name.includes('processor')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    );
  } else if (name.includes('storage') || name.includes('database')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    );
  } else {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    );
  }
};

/**
 * Overview Dashboard panel component
 */
const OverviewDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [systemStatus, setSystemStatus] = useState([]);
  const [protocolData, setProtocolData] = useState([]);
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    uptime: 0,
    version: '',
  });
  const [deviceMetrics, setDeviceMetrics] = useState({
    connectedDevices: 0,
    activeDevices: 0,
    messagesPerMinute: 0,
    changePercentage: 0,
  });
  
  // Load initial data
  useEffect(() => {
    // Simulate API loading delay
    const loadingTimeout = setTimeout(() => {
      // Set fallback time series data
      setTimeSeriesData(generateFallbackTimeSeriesData());
      
      // Set protocol distribution data
      setProtocolData([
        { name: 'MQTT', value: 65 },
        { name: 'HTTP', value: 20 },
        { name: 'CoAP', value: 15 }
      ]);
      
      // Set system status
      setSystemStatus([
        { name: 'API Gateway', status: 'healthy', message: 'All endpoints operational' },
        { name: 'Device Gateway', status: 'warning', message: 'High latency detected' },
        { name: 'Data Processor', status: 'healthy', message: 'Processing at normal capacity' },
        { name: 'Storage Layer', status: 'healthy', message: '88% available capacity' }
      ]);
      
      // Set system metrics
      setSystemMetrics({
        cpuUsage: 42.5,
        memoryUsage: 68.3,
        diskUsage: 57.2,
        uptime: 259200, // 3 days in seconds
        version: 'v1.5.2',
      });
      
      // Set device metrics
      setDeviceMetrics({
        connectedDevices: 128,
        activeDevices: 98,
        messagesPerMinute: 4523,
        changePercentage: 3.2,
      });
      
      setLoading(false);
      setRefreshTime(new Date());
    }, 1500);
    
    return () => clearTimeout(loadingTimeout);
  }, []);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        // Update time series data with new point
        setTimeSeriesData(prevData => {
          const newData = [...prevData.slice(1)];
          const last = prevData[prevData.length - 1];
          
          const next = {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            devices: Math.max(80, Math.min(120, last.devices + Math.floor(Math.random() * 10) - 5)),
            messages: Math.max(250, Math.min(500, last.messages + Math.floor(Math.random() * 30) - 15)),
            cpu: Math.max(15, Math.min(90, last.cpu + Math.floor(Math.random() * 10) - 5)),
            memory: Math.max(25, Math.min(90, last.memory + Math.floor(Math.random() * 8) - 4)),
            diskIo: Math.max(10, Math.min(80, last.diskIo + Math.floor(Math.random() * 8) - 4)),
            network: Math.max(15, Math.min(85, last.network + Math.floor(Math.random() * 10) - 5))
          };
          
          newData.push(next);
          return newData;
        });
        
        // Update system metrics
        setSystemMetrics(prev => ({
          ...prev,
          cpuUsage: Math.max(10, Math.min(95, prev.cpuUsage + (Math.random() * 6 - 3))),
          memoryUsage: Math.max(20, Math.min(95, prev.memoryUsage + (Math.random() * 4 - 2))),
          diskUsage: Math.max(30, Math.min(95, prev.diskUsage + (Math.random() * 2 - 1))),
          uptime: prev.uptime + 5, // Add 5 seconds
        }));
        
        // Update device metrics
        setDeviceMetrics(prev => ({
          ...prev,
          activeDevices: Math.max(80, Math.min(prev.connectedDevices, prev.activeDevices + Math.floor(Math.random() * 5) - 2)),
          messagesPerMinute: Math.max(3000, Math.min(6000, prev.messagesPerMinute + Math.floor(Math.random() * 200) - 100)),
          changePercentage: Math.max(-10, Math.min(10, prev.changePercentage + (Math.random() * 2 - 1))),
        }));
        
        setRefreshTime(new Date());
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [loading]);
  
  return (
    <div className="space-y-6">
      {/* Header with refresh time */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">System Overview</h2>
        <div className="text-sm text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Last updated: {refreshTime.toLocaleTimeString()}</span>
        </div>
      </div>
      
      {/* Metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DeviceMetricsCard 
          connectedDevices={deviceMetrics.connectedDevices}
          activeDevices={deviceMetrics.activeDevices}
          messagesPerMinute={deviceMetrics.messagesPerMinute}
          changePercentage={deviceMetrics.changePercentage}
        />
        
        <SystemMetrics 
          cpuUsage={systemMetrics.cpuUsage}
          memoryUsage={systemMetrics.memoryUsage}
          diskUsage={systemMetrics.diskUsage}
          uptime={systemMetrics.uptime}
          version={systemMetrics.version}
          loading={loading}
        />
        
        <ProtocolDistribution 
          data={protocolData}
          loading={loading}
        />
      </div>
      
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <ResourceUtilization 
          data={timeSeriesData}
          loading={loading}
        />
      </div>
      
      {/* Status cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStatus.map((component) => (
            <StatusCard
              key={component.name}
              title={component.name}
              status={component.status}
              details={component.message}
              icon={getComponentIcon(component.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
// src/hooks/useSystemMetrics.js
import { useState, useEffect, useCallback } from 'react';
import { useWebSocket } from '../contexts/WebSocketContext';

/**
 * Hook to fetch and manage system metrics data
 * @param {Object} options
 * @param {number} [options.refreshInterval=30000] - Auto-refresh interval in milliseconds
 * @param {boolean} [options.autoRefresh=true] - Whether to auto-refresh data
 * @returns {Object} System metrics data and control functions
 */
const useSystemMetrics = ({
  refreshInterval = 30000,
  autoRefresh = true
} = {}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // System metrics state
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [version, setVersion] = useState('');
  
  // Time series data for charts
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  
  // Protocol distribution
  const [protocolDistribution, setProtocolDistribution] = useState([]);
  
  // System status
  const [systemStatus, setSystemStatus] = useState([]);
  
  // WebSocket for real-time updates
  const { isConnected, lastMessage } = useWebSocket();
  
  // Fetch initial data
  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      
      // In a real implementation, you would fetch from your API
      // For now, we'll simulate a successful API response with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock time series data
      const mockTimeSeriesData = generateMockTimeSeriesData(24);
      setTimeSeriesData(mockTimeSeriesData);
      
      // Set latest values
      const latestPoint = mockTimeSeriesData[mockTimeSeriesData.length - 1];
      setCpuUsage(latestPoint.cpu);
      setMemoryUsage(latestPoint.memory);
      setDiskUsage(latestPoint.diskUsage || 55.3);
      
      // Mock protocol distribution
      setProtocolDistribution([
        { name: 'MQTT', value: 65 },
        { name: 'HTTP', value: 20 },
        { name: 'CoAP', value: 15 }
      ]);
      
      // Mock system status
      setSystemStatus([
        { name: 'API Gateway', status: 'healthy', message: 'All endpoints operational' },
        { name: 'Device Gateway', status: 'warning', message: 'High latency detected' },
        { name: 'Data Processor', status: 'healthy', message: 'Processing at normal capacity' },
        { name: 'Storage Layer', status: 'healthy', message: '88% available capacity' }
      ]);
      
      // Mock uptime and version
      setUptime(259200); // 3 days in seconds
      setVersion('v1.5.2');
      
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching system metrics:', err);
      setError('Failed to fetch system metrics');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Initialize data on mount
  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);
  
  // Auto-refresh data
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      fetchMetrics();
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [autoRefresh, fetchMetrics, refreshInterval]);
  
  // Handle WebSocket messages
  useEffect(() => {
    if (!lastMessage) return;
    
    // Handle different message types
    if (lastMessage.type === 'METRICS_UPDATE') {
      // Update metrics
      setCpuUsage(lastMessage.data.cpuUsage);
      setMemoryUsage(lastMessage.data.memoryUsage);
      setDiskUsage(lastMessage.data.diskUsage);
      
      // Update time series data
      setTimeSeriesData(prevData => {
        const newData = [...prevData.slice(1)];
        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cpu: lastMessage.data.cpuUsage,
          memory: lastMessage.data.memoryUsage,
          diskUsage: lastMessage.data.diskUsage,
          network: lastMessage.data.networkUsage || 0
        };
        newData.push(newPoint);
        return newData;
      });
      
      setLastUpdated(new Date());
    }
    
    if (lastMessage.type === 'STATUS_UPDATE') {
      setSystemStatus(lastMessage.data.components);
      setLastUpdated(new Date());
    }
    
    if (lastMessage.type === 'PROTOCOL_UPDATE') {
      setProtocolDistribution(lastMessage.data.distribution);
      setLastUpdated(new Date());
    }
  }, [lastMessage]);
  
  // Helper to generate mock time series data
  const generateMockTimeSeriesData = (points) => {
    const data = [];
    const now = new Date();
    
    for (let i = points - 1; i >= 0; i--) {
      const time = new Date(now);
      time.setHours(now.getHours() - i);
      
      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cpu: Math.floor(20 + Math.random() * 40),
        memory: Math.floor(30 + Math.random() * 30),
        diskUsage: Math.floor(40 + Math.random() * 20),
        network: Math.floor(25 + Math.random() * 35)
      });
    }
    
    return data;
  };
  
  return {
    // Data
    cpuUsage,
    memoryUsage,
    diskUsage,
    uptime,
    version,
    timeSeriesData,
    protocolDistribution,
    systemStatus,
    
    // Status
    loading,
    error,
    lastUpdated,
    isRealTimeEnabled: isConnected,
    
    // Actions
    refresh: fetchMetrics,
  };
};

export default useSystemMetrics;

import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';
// Create the device context
export const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: null,
    status: null,
    protocol: null,
    location: null,
    searchQuery: ''
  });

  // Load devices on mount and when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchDevices();
    } else {
      setDevices([]);
      setSelectedDevice(null);
    }
  }, [isAuthenticated]);

  // Fetch devices from API (mocked)
  const fetchDevices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual API call
      // const response = await api.get('/devices');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockDevices = await api.getDeviceContextDevices();
      // Use mock data
      setDevices(mockDevices);
    } catch (err) {
      console.error('Error fetching devices:', err);
      setError('Failed to fetch devices');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get a specific device by ID
  const getDevice = useCallback(async (deviceId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if device already exists in state
      let device = devices.find(d => d.id === deviceId);
      
      if (device) {
        setSelectedDevice(device);
        return device;
      }
      
      // Mock API call for a specific device - replace with actual API call
      // const response = await api.get(`/devices/${deviceId}`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find in mock data
      device = mockDevices.find(d => d.id === deviceId);
      
      if (device) {
        setSelectedDevice(device);
        return device;
      } else {
        throw new Error('Device not found');
      }
    } catch (err) {
      console.error(`Error fetching device ${deviceId}:`, err);
      setError(`Failed to fetch device: ${err.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [devices]);

  // Add a new device
  const addDevice = useCallback(async (deviceData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual API call
      // const response = await api.post('/devices', deviceData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a new device with mock ID and timestamps
      const newDevice = {
        ...deviceData,
        id: `device-${Date.now()}`,
        lastSeen: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      // Update local state
      setDevices(prevDevices => [...prevDevices, newDevice]);
      
      return {
        success: true,
        device: newDevice
      };
    } catch (err) {
      console.error('Error adding device:', err);
      setError('Failed to add device');
      return {
        success: false,
        error: err.message || 'Failed to add device'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update an existing device
  const updateDevice = useCallback(async (deviceId, deviceData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual API call
      // const response = await api.put(`/devices/${deviceId}`, deviceData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update local state
      setDevices(prevDevices => 
        prevDevices.map(device => 
          device.id === deviceId 
            ? { ...device, ...deviceData, lastUpdated: new Date().toISOString() } 
            : device
        )
      );
      
      // Update selected device if it's the one being edited
      if (selectedDevice && selectedDevice.id === deviceId) {
        setSelectedDevice(prev => ({ ...prev, ...deviceData, lastUpdated: new Date().toISOString() }));
      }
      
      return { success: true };
    } catch (err) {
      console.error(`Error updating device ${deviceId}:`, err);
      setError('Failed to update device');
      return {
        success: false,
        error: err.message || 'Failed to update device'
      };
    } finally {
      setIsLoading(false);
    }
  }, [selectedDevice]);

  // Delete a device
  const deleteDevice = useCallback(async (deviceId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual API call
      // const response = await api.delete(`/devices/${deviceId}`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Update local state
      setDevices(prevDevices => prevDevices.filter(device => device.id !== deviceId));
      
      // Clear selected device if it's the one being deleted
      if (selectedDevice && selectedDevice.id === deviceId) {
        setSelectedDevice(null);
      }
      
      return { success: true };
    } catch (err) {
      console.error(`Error deleting device ${deviceId}:`, err);
      setError('Failed to delete device');
      return {
        success: false,
        error: err.message || 'Failed to delete device'
      };
    } finally {
      setIsLoading(false);
    }
  }, [selectedDevice]);

  // Update device filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  // Apply filters to devices
  const filteredDevices = useCallback(() => {
    return devices.filter(device => {
      // Apply type filter
      if (filters.type && device.type !== filters.type) {
        return false;
      }
      
      // Apply status filter
      if (filters.status && device.status !== filters.status) {
        return false;
      }
      
      // Apply protocol filter
      if (filters.protocol && device.protocol !== filters.protocol) {
        return false;
      }
      
      // Apply location filter
      if (filters.location && device.location !== filters.location) {
        return false;
      }
      
      // Apply search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          device.name.toLowerCase().includes(query) ||
          device.id.toLowerCase().includes(query) ||
          (device.tags && device.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      }
      
      return true;
    });
  }, [devices, filters]);

  // Get device statistics
  const getDeviceStats = useCallback(() => {
    const total = devices.length;
    const online = devices.filter(d => d.status === 'online').length;
    const offline = devices.filter(d => d.status === 'offline').length;
    const warning = devices.filter(d => d.status === 'warning').length;
    const error = devices.filter(d => d.status === 'error').length;
    
    const typeStats = devices.reduce((acc, device) => {
      acc[device.type] = (acc[device.type] || 0) + 1;
      return acc;
    }, {});
    
    const protocolStats = devices.reduce((acc, device) => {
      acc[device.protocol] = (acc[device.protocol] || 0) + 1;
      return acc;
    }, {});
    
    return {
      total,
      status: { online, offline, warning, error },
      types: typeStats,
      protocols: protocolStats
    };
  }, [devices]);

  // Context value
  const deviceContextValue = {
    devices,
    filteredDevices: filteredDevices(),
    selectedDevice,
    isLoading,
    error,
    filters,
    fetchDevices,
    getDevice,
    addDevice,
    updateDevice,
    deleteDevice,
    setSelectedDevice,
    updateFilters,
    getDeviceStats
  };

  return (
    <DeviceContext.Provider value={deviceContextValue}>
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;
// src/components/panels/DeviceManagement.jsx
import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import DeviceList from '../devices/DeviceList';
import DeviceDetail from '../devices/DeviceDetail';
import DeviceForm from '../devices/DeviceForm';
import DeviceStatusChart from '../devices/DeviceStatusChart';
import api from '../../services/api';

/**
 * Device management panel component
 */
const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  
  // Load devices (simulated API call)
  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockDevices = await api.getDeviceManagementDevices();  
        // In a real app, this would be an API call
        setDevices(mockDevices);
      } catch (error) {
        console.error('Error fetching devices:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDevices();
  }, []);
  
  // Handle device selection
  const handleSelectDevice = (device) => {
    setSelectedDevice(device);
    setIsFormOpen(false);
  };
  
  // Open form for creating a new device
  const handleAddDevice = () => {
    setSelectedDevice(null);
    setIsEditing(false);
    setIsFormOpen(true);
  };
  
  // Open form for editing a device
  const handleEditDevice = (device) => {
    setSelectedDevice(device);
    setIsEditing(true);
    setIsFormOpen(true);
  };
  
  // Handle form submission
  const handleSubmitForm = async (deviceData) => {
    setFormSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditing) {
        // Update existing device
        setDevices(prev => 
          prev.map(device => 
            device.id === deviceData.id ? { ...deviceData } : device
          )
        );
        
        // Update selected device if it's the one being edited
        setSelectedDevice(deviceData);
      } else {
        // Add new device
        setDevices(prev => [...prev, deviceData]);
      }
      
      // Close form
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error saving device:', error);
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Handle device deletion
  const handleDeleteDevice = async (device) => {
    if (window.confirm(`Are you sure you want to delete ${device.name}?`)) {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Remove device from list
        setDevices(prev => prev.filter(d => d.id !== device.id));
        
        // Clear selection if the deleted device was selected
        if (selectedDevice && selectedDevice.id === device.id) {
          setSelectedDevice(null);
        }
      } catch (error) {
        console.error('Error deleting device:', error);
      }
    }
  };
  
  // Render page content based on state
  const renderContent = () => {
    if (isFormOpen) {
      return (
        <DeviceForm
          device={isEditing ? selectedDevice : null}
          onSubmit={handleSubmitForm}
          onCancel={() => setIsFormOpen(false)}
          loading={formSubmitting}
        />
      );
    }
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DeviceList
            devices={devices}
            onSelectDevice={handleSelectDevice}
            loading={loading}
          />
        </div>
        <div>
          <DeviceDetail
            device={selectedDevice}
            onClose={() => setSelectedDevice(null)}
            onEdit={handleEditDevice}
            onDelete={handleDeleteDevice}
          />
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Device Management</h2>
        
        {!isFormOpen && (
          <Button
            variant="primary"
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
            onClick={handleAddDevice}
          >
            Add Device
          </Button>
        )}
      </div>
      
      {!isFormOpen && !loading && (
        <DeviceStatusChart
          devices={devices}
          loading={loading}
        />
      )}
      
      {renderContent()}
    </div>
  );
};

export default DeviceManagement;
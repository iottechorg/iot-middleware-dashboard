// src/components/panels/devices/DeviceForm.jsx
import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

/**
 * Device form component for adding or editing a device
 * @param {Object} props
 * @param {Object} [props.device] - Existing device for editing (null for new device)
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {Function} props.onCancel - Callback when form is cancelled
 * @param {boolean} [props.loading=false] - Whether submit is in progress
 */
const DeviceForm = ({
  device = null,
  onSubmit,
  onCancel,
  loading = false,
  ...props
}) => {
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: 'Sensor',
    protocol: 'MQTT',
    location: '',
    description: '',
    properties: {}
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Protocol options
  const protocolOptions = ['MQTT', 'HTTP', 'CoAP', 'WebSocket', 'AMQP'];
  
  // Device type options
  const typeOptions = ['Sensor', 'Actuator', 'Gateway', 'Controller'];
  
  // Initialize form with device data if editing
  useEffect(() => {
    if (device) {
      setFormData({
        id: device.id || '',
        name: device.name || '',
        type: device.type || 'Sensor',
        protocol: device.protocol || 'MQTT',
        location: device.location || '',
        description: device.description || '',
        properties: device.properties || {}
      });
    } else {
      // Generate a new ID for new devices
      setFormData(prev => ({
        ...prev,
        id: `dev_${Date.now().toString(36)}`
      }));
    }
  }, [device]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Custom property handling
  const [newPropertyKey, setNewPropertyKey] = useState('');
  const [newPropertyValue, setNewPropertyValue] = useState('');
  
  const addProperty = () => {
    if (!newPropertyKey.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      properties: {
        ...prev.properties,
        [newPropertyKey]: newPropertyValue
      }
    }));
    
    setNewPropertyKey('');
    setNewPropertyValue('');
  };
  
  const removeProperty = (key) => {
    setFormData(prev => {
      const newProperties = { ...prev.properties };
      delete newProperties[key];
      
      return {
        ...prev,
        properties: newProperties
      };
    });
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.id.trim()) {
      newErrors.id = 'ID is required';
    }
    
    if (!formData.type) {
      newErrors.type = 'Type is required';
    }
    
    if (!formData.protocol) {
      newErrors.protocol = 'Protocol is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        // Add default values for new devices
        status: device ? device.status : 'offline',
        lastSeen: device ? device.lastSeen : 'Never'
      });
    }
  };
  
  return (
    <Card className="h-full" {...props}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {device ? 'Edit Device' : 'Add New Device'}
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Device ID */}
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              Device ID
            </label>
            <input
              type="text"
              name="id"
              id="id"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.id ? 'border-red-300' : ''
              }`}
              value={formData.id}
              onChange={handleChange}
              readOnly={!!device} // ID is readonly when editing
            />
            {errors.id && (
              <p className="mt-1 text-sm text-red-600">{errors.id}</p>
            )}
          </div>
          
          {/* Device Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.name ? 'border-red-300' : ''
              }`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          {/* Device Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              name="type"
              id="type"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.type ? 'border-red-300' : ''
              }`}
              value={formData.type}
              onChange={handleChange}
            >
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type}</p>
            )}
          </div>
          
          {/* Protocol */}
          <div>
            <label htmlFor="protocol" className="block text-sm font-medium text-gray-700">
              Protocol
            </label>
            <select
              name="protocol"
              id="protocol"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.protocol ? 'border-red-300' : ''
              }`}
              value={formData.protocol}
              onChange={handleChange}
            >
              {protocolOptions.map((protocol) => (
                <option key={protocol} value={protocol}>
                  {protocol}
                </option>
              ))}
            </select>
            {errors.protocol && (
              <p className="mt-1 text-sm text-red-600">{errors.protocol}</p>
            )}
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          
          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          
          {/* Custom Properties */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Properties
            </label>
            
            {/* Existing properties */}
            {Object.keys(formData.properties).length > 0 && (
              <div className="mb-4 bg-gray-50 rounded-md p-3">
                <ul className="divide-y divide-gray-200">
                  {Object.entries(formData.properties).map(([key, value]) => (
                    <li key={key} className="py-2 flex justify-between items-center">
                      <div>
                        <span className="font-medium text-sm">{key}:</span>
                        <span className="ml-2 text-sm text-gray-500">{value}</span>
                      </div>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-900 text-sm"
                        onClick={() => removeProperty(key)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Add new property */}
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Property Key"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={newPropertyKey}
                  onChange={(e) => setNewPropertyKey(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Property Value"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={newPropertyValue}
                  onChange={(e) => setNewPropertyValue(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={addProperty}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        
        {/* Form actions */}
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : device ? 'Update Device' : 'Create Device'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DeviceForm;
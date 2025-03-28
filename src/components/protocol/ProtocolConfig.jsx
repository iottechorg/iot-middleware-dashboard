// src/components/protocol/ProtocolConfig.jsx

import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { FiSave, FiX } from 'react-icons/fi';

const ProtocolConfig = ({ protocol, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: '',
    version: '',
    status: 'inactive',
    devices: 0,
    configuration: {}
  });

  // Initialize form with protocol data
  useEffect(() => {
    if (protocol) {
      setFormData({
        ...protocol,
        configuration: protocol.configuration || {}
      });
    }
  }, [protocol]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        [name]: type === 'checkbox' ? checked : 
                type === 'number' ? Number(value) : 
                value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Generate configuration fields based on protocol type
  const renderConfigFields = () => {
    const configFields = [];
    
    // Common fields for all protocol types
    configFields.push(
      <div key="common-fields" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Port
          </label>
          <input
            type="number"
            name="port"
            value={formData.configuration.port || ''}
            onChange={handleConfigChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enable TLS/SSL
          </label>
          <input
            type="checkbox"
            name="tls"
            checked={formData.configuration.tls || false}
            onChange={handleConfigChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
      </div>
    );
    
    // Protocol-specific fields
    switch (formData.type.toLowerCase()) {
      case 'pub/sub':
      case 'mqtt':
        configFields.push(
          <div key="mqtt-fields" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Host
              </label>
              <input
                type="text"
                name="host"
                value={formData.configuration.host || ''}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.configuration.username || ''}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                QoS Level
              </label>
              <select
                name="qos"
                value={formData.configuration.qos || 0}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value={0}>0 - At most once</option>
                <option value={1}>1 - At least once</option>
                <option value={2}>2 - Exactly once</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keep Alive (seconds)
              </label>
              <input
                type="number"
                name="keepAlive"
                value={formData.configuration.keepAlive || 60}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        );
        break;
        
      case 'request/response':
      case 'http':
      case 'coap':
        configFields.push(
          <div key="http-fields" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Connections
              </label>
              <input
                type="number"
                name="maxConnections"
                value={formData.configuration.maxConnections || 1000}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timeout (seconds)
              </label>
              <input
                type="number"
                name="timeout"
                value={formData.configuration.timeout || 30}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            {formData.type.toLowerCase() === 'coap' && (
              <>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Block Size
                  </label>
                  <input
                    type="number"
                    name="blockSize"
                    value={formData.configuration.blockSize || 1024}
                    onChange={handleConfigChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retransmit Count
                  </label>
                  <input
                    type="number"
                    name="retransmitCount"
                    value={formData.configuration.retransmitCount || 4}
                    onChange={handleConfigChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </>
            )}
          </div>
        );
        break;
        
      case 'master/slave':
      case 'modbus':
        configFields.push(
          <div key="modbus-fields" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timeout (seconds)
              </label>
              <input
                type="number"
                name="timeout"
                value={formData.configuration.timeout || 10}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Retries
              </label>
              <input
                type="number"
                name="retries"
                value={formData.configuration.retries || 3}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        );
        break;
        
      case 'wireless':
      case 'ble':
        configFields.push(
          <div key="ble-fields" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scan Interval (ms)
              </label>
              <input
                type="number"
                name="scanInterval"
                value={formData.configuration.scanInterval || 5000}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Connection Timeout (ms)
              </label>
              <input
                type="number"
                name="connectionTimeout"
                value={formData.configuration.connectionTimeout || 10000}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MTU Size
              </label>
              <input
                type="number"
                name="mtu"
                value={formData.configuration.mtu || 512}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        );
        break;
        
      case 'mesh':
      case 'zigbee':
        configFields.push(
          <div key="zigbee-fields" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PAN ID
              </label>
              <input
                type="text"
                name="panId"
                value={formData.configuration.panId || '0x1A2B'}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Channel
              </label>
              <select
                name="channel"
                value={formData.configuration.channel || 15}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {Array.from({ length: 16 }, (_, i) => (
                  <option key={i + 11} value={i + 11}>
                    {i + 11}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Security Level
              </label>
              <select
                name="securityLevel"
                value={formData.configuration.securityLevel || 5}
                onChange={handleConfigChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {[0, 1, 2, 3, 4, 5].map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
        break;
        
      default:
        // No additional fields
        break;
    }
    
    return configFields;
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Protocol Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Protocol Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a type</option>
                <option value="Pub/Sub">Pub/Sub</option>
                <option value="Request/Response">Request/Response</option>
                <option value="Master/Slave">Master/Slave</option>
                <option value="Wireless">Wireless</option>
                <option value="Mesh">Mesh</option>
                <option value="MQTT">MQTT</option>
                <option value="CoAP">CoAP</option>
                <option value="HTTP">HTTP</option>
                <option value="Modbus">Modbus</option>
                <option value="BLE">BLE</option>
                <option value="Zigbee">Zigbee</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Protocol Version
              </label>
              <input
                type="text"
                name="version"
                value={formData.version}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Protocol Configuration</h3>
          {renderConfigFields()}
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            icon={<FiX />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={<FiSave />}
          >
            Save Protocol
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProtocolConfig;
// src/components/protocol/ProtocolHandlers.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import ProtocolList from './ProtocolList';
import ProtocolConfig from './ProtocolConfig';
import TrafficMonitor from './TrafficMonitor';
import Button from '../common/Button';
import Card from '../common/Card';
import api from '../../services/api';

const ProtocolHandlers = () => {
  const [protocols, setProtocols] = useState([]);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list', 'config', 'traffic'
  const [trafficData, setTrafficData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch protocols
  useEffect(() => {
    const fetchProtocols = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.getProtocols();
        setProtocols(data);
      } catch (err) {
        console.error('Error fetching protocols:', err);
        setError('Failed to load protocols. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProtocols();
  }, []);

  // Fetch traffic data when a protocol is selected
  useEffect(() => {
    if (selectedProtocol && view === 'traffic') {
      const fetchTrafficData = async () => {
        setIsLoading(true);
        try {
          const data = await api.getProtocolTraffic(selectedProtocol.name);
          setTrafficData(data);
        } catch (err) {
          console.error('Error fetching traffic data:', err);
          setError(`Failed to load traffic data for ${selectedProtocol.name}`);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTrafficData();
    }
  }, [selectedProtocol, view]);

  const handleAddProtocol = () => {
    setSelectedProtocol({
      id: `new-${Date.now()}`,
      name: '',
      type: '',
      version: '',
      status: 'inactive',
      devices: 0,
      configuration: {}
    });
    setView('config');
  };

  const handleEditProtocol = (protocol) => {
    setSelectedProtocol(protocol);
    setView('config');
  };

  const handleDeleteProtocol = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this protocol?')) {
      try {
        await api.deleteProtocol(id);
        setProtocols(prevProtocols => prevProtocols.filter(p => p.id !== id));
        if (selectedProtocol && selectedProtocol.id === id) {
          setSelectedProtocol(null);
          setView('list');
        }
      } catch (err) {
        console.error('Error deleting protocol:', err);
        alert('Failed to delete protocol. Please try again.');
      }
    }
  }, [selectedProtocol]);

  const handleSaveProtocol = async (updatedProtocol) => {
    try {
      const isNew = updatedProtocol.id.startsWith('new-');
      const savedProtocol = isNew 
        ? await api.createProtocol(updatedProtocol)
        : await api.updateProtocol(updatedProtocol.id, updatedProtocol);
      
      setProtocols(prev => {
        if (isNew) {
          return [...prev, savedProtocol];
        } else {
          return prev.map(p => p.id === savedProtocol.id ? savedProtocol : p);
        }
      });
      
      setView('list');
      setSelectedProtocol(null);
    } catch (err) {
      console.error('Error saving protocol:', err);
      alert('Failed to save protocol. Please try again.');
    }
  };

  const handleViewTraffic = (protocol) => {
    setSelectedProtocol(protocol);
    setView('traffic');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedProtocol(null);
  };

  // Render the appropriate view
  const renderContent = () => {
    switch (view) {
      case 'config':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {selectedProtocol && selectedProtocol.id.startsWith('new-') 
                  ? 'Add Protocol' 
                  : `Edit Protocol: ${selectedProtocol?.name}`}
              </h2>
              <Button
                variant="secondary"
                size="sm"
                icon={<FiX />}
                onClick={handleBackToList}
              >
                Cancel
              </Button>
            </div>
            {selectedProtocol && (
              <ProtocolConfig 
                protocol={selectedProtocol} 
                onSave={handleSaveProtocol}
                onCancel={handleBackToList}
              />
            )}
          </div>
        );
      
      case 'traffic':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Traffic Monitoring: {selectedProtocol?.name}
              </h2>
              <Button
                variant="secondary"
                size="sm"
                icon={<FiX />}
                onClick={handleBackToList}
              >
                Back to List
              </Button>
            </div>
            {selectedProtocol && (
              <TrafficMonitor 
                protocol={selectedProtocol}
                trafficData={trafficData}
                isLoading={isLoading}
                error={error}
              />
            )}
          </div>
        );
      
      case 'list':
      default:
        return (
          <div className="grid grid-cols-1 gap-6">
            <ProtocolList 
              protocols={protocols}
              isLoading={isLoading}
              error={error}
              onAdd={handleAddProtocol}
              onEdit={handleEditProtocol}
              onDelete={handleDeleteProtocol}
              onViewTraffic={handleViewTraffic}
            />
            
            {/* Protocol Statistics Summary */}
            <Card>
              <h3 className="text-lg font-semibold mb-4">Protocol Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Total Protocols</p>
                  <p className="text-2xl font-bold">{protocols.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Active Protocols</p>
                  <p className="text-2xl font-bold">{protocols.filter(p => p.status === 'active').length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Total Devices</p>
                  <p className="text-2xl font-bold">{protocols.reduce((acc, p) => acc + p.devices, 0)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Protocols With Issues</p>
                  <p className="text-2xl font-bold">{protocols.filter(p => p.status === 'warning' || p.status === 'error').length}</p>
                </div>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {renderContent()}
    </div>
  );
};

export default ProtocolHandlers;
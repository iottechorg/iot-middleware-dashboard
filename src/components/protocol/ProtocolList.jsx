// src/components/protocol/ProtocolList.jsx

import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlusCircle, FiAlertCircle, FiActivity } from 'react-icons/fi';
import StatusIndicator from '../common/StatusIndicator';
import Button from '../common/Button';
import Card from '../common/Card';

const ProtocolList = ({ 
  protocols = [], 
  onAdd, 
  onEdit, 
  onDelete,
  onViewTraffic,
  isLoading = false,
  error = null
}) => {
  const [filteredProtocols, setFilteredProtocols] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    let result = [...protocols];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(protocol => 
        protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        protocol.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(protocol => protocol.status === filterStatus);
    }
    
    setFilteredProtocols(result);
  }, [protocols, searchTerm, filterStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'gray';
      case 'error':
        return 'red';
      case 'warning':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FiAlertCircle className="w-12 h-12 mb-4 text-gray-400" />
      <h3 className="text-lg font-medium text-gray-900">No protocols found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {searchTerm || filterStatus !== 'all' 
          ? 'Try adjusting your filters to find what you are looking for.' 
          : 'Get started by adding a new protocol.'}
      </p>
      <Button 
        className="mt-6" 
        variant="primary"
        onClick={onAdd}
        icon={<FiPlusCircle />}
      >
        Add Protocol
      </Button>
    </div>
  );

  if (error) {
    return (
      <Card className="h-full">
        <div className="flex flex-col items-center justify-center p-8 text-center h-64">
          <FiAlertCircle className="w-12 h-12 mb-4 text-red-500" />
          <h3 className="text-lg font-medium text-gray-900">Error loading protocols</h3>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Protocol Handlers</h2>
          <Button 
            variant="primary" 
            size="sm"
            onClick={onAdd}
            icon={<FiPlusCircle />}
          >
            Add Protocol
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search protocols..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center flex-grow">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProtocols.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="overflow-x-auto flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Devices</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProtocols.map((protocol) => (
                  <tr key={protocol.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{protocol.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{protocol.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{protocol.version}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusIndicator status={protocol.status} color={getStatusColor(protocol.status)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{protocol.devices}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="xs"
                          icon={<FiEdit />}
                          onClick={() => onEdit(protocol)}
                          aria-label={`Edit ${protocol.name}`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="primary"
                          size="xs"
                          icon={<FiActivity />}
                          onClick={() => onViewTraffic(protocol)}
                          aria-label={`View traffic for ${protocol.name}`}
                        >
                          Traffic
                        </Button>
                        <Button
                          variant="danger"
                          size="xs"
                          icon={<FiTrash2 />}
                          onClick={() => onDelete(protocol.id)}
                          aria-label={`Delete ${protocol.name}`}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProtocolList;
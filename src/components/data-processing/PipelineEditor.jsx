// src/components/data-processing/PipelineEditor.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { FiSave, FiX, FiPlus, FiTrash2, FiMove, FiEdit } from 'react-icons/fi';
import Card from '../common/Card';
import Button from '../common/Button';

const nodeTypes = [
  { value: 'source', label: 'Source', description: 'Data input from devices or systems' },
  { value: 'filter', label: 'Filter', description: 'Filters data based on conditions' },
  { value: 'transform', label: 'Transform', description: 'Transforms or enriches data' },
  { value: 'aggregate', label: 'Aggregate', description: 'Aggregates data over time or group' },
  { value: 'destination', label: 'Destination', description: 'Outputs data to storage or systems' },
  { value: 'cloud', label: 'Cloud Service', description: 'Integrates with cloud services' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' },
];

const NodeEditor = ({ node, onUpdate, onCancel, existingNodes = [] }) => {
  const [formData, setFormData] = useState(node || {
    id: `node-${Date.now()}`,
    type: 'source',
    title: '',
    description: '',
    status: 'inactive',
    position: { x: 100, y: 100 },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Node Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter node title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Node Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {nodeTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter node description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              X Position
            </label>
            <input
              type="number"
              name="positionX"
              value={formData.position?.x || 0}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                position: {
                  ...prev.position,
                  x: parseInt(e.target.value, 10)
                }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Y Position
            </label>
            <input
              type="number"
              name="positionY"
              value={formData.position?.y || 0}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                position: {
                  ...prev.position,
                  y: parseInt(e.target.value, 10)
                }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
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
          Save Node
        </Button>
      </div>
    </form>
  );
};

const ConnectionEditor = ({ connection, onUpdate, onCancel, nodes = [] }) => {
  const [formData, setFormData] = useState(connection || {
    source: '',
    target: '',
    status: 'active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source Node
          </label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select source node</option>
            {nodes.map(node => (
              <option key={node.id} value={node.id}>
                {node.title} ({node.type})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Node
          </label>
          <select
            name="target"
            value={formData.target}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select target node</option>
            {nodes
              .filter(node => node.id !== formData.source) // Can't connect to itself
              .map(node => (
                <option key={node.id} value={node.id}>
                  {node.title} ({node.type})
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Connection Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
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
          Save Connection
        </Button>
      </div>
    </form>
  );
};

const PipelineEditor = ({ pipeline = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState(pipeline || {
    id: `pipeline-${Date.now()}`,
    name: '',
    description: '',
    status: 'inactive',
    nodes: [],
    connections: []
  });

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [editorMode, setEditorMode] = useState(null); // 'node', 'connection', null

  // When pipeline changes, update form data
  useEffect(() => {
    if (pipeline) {
      setFormData(pipeline);
    }
  }, [pipeline]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Node management
  const addNode = () => {
    setSelectedNode(null);
    setEditorMode('node');
  };

  const editNode = (node) => {
    setSelectedNode(node);
    setEditorMode('node');
  };

  const updateNode = (updatedNode) => {
    setFormData(prev => {
      const existingNodeIndex = prev.nodes.findIndex(n => n.id === updatedNode.id);
      
      if (existingNodeIndex >= 0) {
        // Update existing node
        const updatedNodes = [...prev.nodes];
        updatedNodes[existingNodeIndex] = updatedNode;
        return { ...prev, nodes: updatedNodes };
      } else {
        // Add new node
        return { ...prev, nodes: [...prev.nodes, updatedNode] };
      }
    });
    
    setEditorMode(null);
    setSelectedNode(null);
  };

  const deleteNode = (nodeId) => {
    if (window.confirm('Are you sure you want to delete this node? Any connections to or from this node will also be deleted.')) {
      setFormData(prev => ({
        ...prev,
        nodes: prev.nodes.filter(n => n.id !== nodeId),
        // Also remove any connections involving this node
        connections: prev.connections.filter(c => c.source !== nodeId && c.target !== nodeId)
      }));
    }
  };

  // Connection management
  const addConnection = () => {
    setSelectedConnection(null);
    setEditorMode('connection');
  };

  const editConnection = (connection) => {
    setSelectedConnection(connection);
    setEditorMode('connection');
  };

  const updateConnection = (updatedConnection) => {
    // Check if connection already exists to avoid duplicates
    const isDuplicate = formData.connections.some(c => 
      c.source === updatedConnection.source && 
      c.target === updatedConnection.target &&
      (selectedConnection ? c !== selectedConnection : true)
    );

    if (isDuplicate) {
      alert('A connection between these nodes already exists.');
      return;
    }

    setFormData(prev => {
      if (selectedConnection) {
        // Update existing connection
        return {
          ...prev,
          connections: prev.connections.map(c => 
            c === selectedConnection ? updatedConnection : c
          )
        };
      } else {
        // Add new connection
        return {
          ...prev,
          connections: [...prev.connections, updatedConnection]
        };
      }
    });
    
    setEditorMode(null);
    setSelectedConnection(null);
  };

  const deleteConnection = (connection) => {
    if (window.confirm('Are you sure you want to delete this connection?')) {
      setFormData(prev => ({
        ...prev,
        connections: prev.connections.filter(c => c !== connection)
      }));
    }
  };

  return (
    <Card>
      <div className="space-y-6 p-4">
        {editorMode === 'node' ? (
          <div>
            <h3 className="text-lg font-medium mb-4">
              {selectedNode ? 'Edit Node' : 'Add Node'}
            </h3>
            <NodeEditor
              node={selectedNode}
              onUpdate={updateNode}
              onCancel={() => setEditorMode(null)}
              existingNodes={formData.nodes}
            />
          </div>
        ) : editorMode === 'connection' ? (
          <div>
            <h3 className="text-lg font-medium mb-4">
              {selectedConnection ? 'Edit Connection' : 'Add Connection'}
            </h3>
            <ConnectionEditor
              connection={selectedConnection}
              onUpdate={updateConnection}
              onCancel={() => setEditorMode(null)}
              nodes={formData.nodes}
            />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pipeline Details</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pipeline Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter pipeline name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter pipeline description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium">Nodes</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addNode}
                        icon={<FiPlus />}
                      >
                        Add Node
                      </Button>
                    </div>

                    {formData.nodes.length === 0 ? (
                      <div className="bg-gray-50 p-6 text-center rounded-md border border-gray-200">
                        <p className="text-gray-500">No nodes added yet. Click "Add Node" to create your first node.</p>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-md border border-gray-200">
                        <ul className="divide-y divide-gray-200">
                          {formData.nodes.map(node => (
                            <li key={node.id} className="p-4 flex justify-between items-center">
                              <div>
                                <h5 className="font-medium">{node.title}</h5>
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                  <span className="capitalize">{node.type}</span>
                                  <span>•</span>
                                  <span className="capitalize">{node.status}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{node.description}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="secondary"
                                  size="xs"
                                  onClick={() => editNode(node)}
                                  icon={<FiEdit />}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  size="xs"
                                  onClick={() => deleteNode(node.id)}
                                  icon={<FiTrash2 />}
                                >
                                  Delete
                                </Button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium">Connections</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addConnection}
                        icon={<FiPlus />}
                        disabled={formData.nodes.length < 2}
                      >
                        Add Connection
                      </Button>
                    </div>

                    {formData.connections.length === 0 ? (
                      <div className="bg-gray-50 p-6 text-center rounded-md border border-gray-200">
                        <p className="text-gray-500">
                          {formData.nodes.length < 2 
                            ? 'Add at least two nodes to create connections.' 
                            : 'No connections added yet. Click "Add Connection" to create your first connection.'}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-md border border-gray-200">
                        <ul className="divide-y divide-gray-200">
                          {formData.connections.map((connection, index) => {
                            const sourceNode = formData.nodes.find(n => n.id === connection.source);
                            const targetNode = formData.nodes.find(n => n.id === connection.target);
                            
                            return (
                              <li key={index} className="p-4 flex justify-between items-center">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                      {sourceNode ? sourceNode.title : 'Unknown'}
                                    </span>
                                    <span>→</span>
                                    <span className="font-medium">
                                      {targetNode ? targetNode.title : 'Unknown'}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    <span className="capitalize">Status: {connection.status}</span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="secondary"
                                    size="xs"
                                    onClick={() => editConnection(connection)}
                                    icon={<FiEdit />}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="xs"
                                    onClick={() => deleteConnection(connection)}
                                    icon={<FiTrash2 />}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
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
                    disabled={formData.name === '' || formData.nodes.length === 0}
                  >
                    Save Pipeline
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default PipelineEditor;
// src/components/data-processing/RulesEditor.jsx

import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import Card from '../common/Card';
import Button from '../common/Button';

// Available operators for conditions
const operators = [
  { value: 'equals', label: 'Equals' },
  { value: 'notEquals', label: 'Not Equals' },
  { value: 'greaterThan', label: 'Greater Than' },
  { value: 'lessThan', label: 'Less Than' },
  { value: 'contains', label: 'Contains' },
  { value: 'notContains', label: 'Not Contains' },
  { value: 'in', label: 'In (comma separated values)' },
  { value: 'notIn', label: 'Not In (comma separated values)' },
  { value: 'startsWith', label: 'Starts With' },
  { value: 'endsWith', label: 'Ends With' },
  { value: 'regex', label: 'Regex Pattern' }
];

// Available actions
const actions = [
  { value: 'filter', label: 'Filter', description: 'Filter out data based on conditions' },
  { value: 'transform', label: 'Transform', description: 'Transform data values' },
  { value: 'enrich', label: 'Enrich', description: 'Add additional information to the data' },
  { value: 'aggregate', label: 'Aggregate', description: 'Group and aggregate data' },
  { value: 'alert', label: 'Alert', description: 'Generate alerts based on conditions' },
  { value: 'route', label: 'Route', description: 'Route data to different destinations' }
];

// Component for a single condition
const ConditionRow = ({ condition, index, onChange, onRemove, isLast }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(index, { ...condition, [name]: value });
  };

  // Convert array values to string for editing
  const displayValue = () => {
    if (Array.isArray(condition.value)) {
      return condition.value.join(', ');
    }
    return condition.value?.toString() || '';
  };

  // Process value based on operator
  const handleValueChange = (e) => {
    let value = e.target.value;
    
    // Handle array for 'in' and 'notIn' operators
    if (condition.operator === 'in' || condition.operator === 'notIn') {
      value = value.split(',').map(item => item.trim());
    }
    
    onChange(index, { ...condition, value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start mb-3">
      <div className="md:col-span-3">
        <input
          type="text"
          name="field"
          placeholder="Field name"
          value={condition.field || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
        />
      </div>
      
      <div className="md:col-span-3">
        <select
          name="operator"
          value={condition.operator || 'equals'}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
        >
          {operators.map(op => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="md:col-span-5">
        <input
          type="text"
          name="value"
          placeholder="Value"
          value={displayValue()}
          onChange={handleValueChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
        />
      </div>
      
      <div className="md:col-span-1 flex justify-end">
        <Button
          variant="danger"
          size="xs"
          onClick={() => onRemove(index)}
          icon={<FiTrash2 />}
          aria-label="Remove condition"
          className="mt-1"
        />
      </div>
    </div>
  );
};

// Transform action config component
const TransformActionConfig = ({ config, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...config, [name]: value });
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Field
          </label>
          <input
            type="text"
            name="target"
            value={config?.target || ''}
            onChange={handleChange}
            placeholder="Field to transform"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Unit/Type (optional)
          </label>
          <input
            type="text"
            name="newUnit"
            value={config?.newUnit || ''}
            onChange={handleChange}
            placeholder="e.g., celsius, kilometers, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Transformation Formula
        </label>
        <textarea
          name="formula"
          value={config?.formula || ''}
          onChange={handleChange}
          placeholder="e.g., (value - 32) * 5/9 for F to C"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          rows={3}
        />
        <p className="mt-1 text-sm text-gray-500">
          Use 'value' to refer to the current field value in your formula.
        </p>
      </div>
    </div>
  );
};

// Aggregate action config component
const AggregateActionConfig = ({ config, onChange }) => {
  const [functions, setFunctions] = useState(config?.functions || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newConfig = { ...config, [name]: name === 'timeWindow' ? parseInt(value, 10) : value };
    onChange(newConfig);
  };

  const addFunction = () => {
    const newFunctions = [...functions, { field: '', function: 'avg', as: '' }];
    setFunctions(newFunctions);
    onChange({ ...config, functions: newFunctions });
  };

  const updateFunction = (index, updates) => {
    const newFunctions = [...functions];
    newFunctions[index] = { ...newFunctions[index], ...updates };
    setFunctions(newFunctions);
    onChange({ ...config, functions: newFunctions });
  };

  const removeFunction = (index) => {
    const newFunctions = functions.filter((_, i) => i !== index);
    setFunctions(newFunctions);
    onChange({ ...config, functions: newFunctions });
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time Window (seconds)
        </label>
        <input
          type="number"
          name="timeWindow"
          value={config?.timeWindow || 60}
          onChange={handleChange}
          min={1}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div className="form-group">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Aggregation Functions
          </label>
          <Button
            variant="secondary"
            size="xs"
            onClick={addFunction}
            icon={<FiPlus />}
          >
            Add Function
          </Button>
        </div>

        {functions.length === 0 ? (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center text-gray-500">
            No aggregation functions defined. Click "Add Function" to add one.
          </div>
        ) : (
          <div className="space-y-3">
            {functions.map((func, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="md:col-span-4">
                  <label className="block text-xs text-gray-500 mb-1">Field</label>
                  <input
                    type="text"
                    value={func.field || ''}
                    onChange={(e) => updateFunction(index, { field: e.target.value })}
                    placeholder="Field name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs text-gray-500 mb-1">Function</label>
                  <select
                    value={func.function || 'avg'}
                    onChange={(e) => updateFunction(index, { function: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                  >
                    <option value="avg">Average</option>
                    <option value="sum">Sum</option>
                    <option value="min">Minimum</option>
                    <option value="max">Maximum</option>
                    <option value="count">Count</option>
                    <option value="first">First</option>
                    <option value="last">Last</option>
                  </select>
                </div>
                <div className="md:col-span-4">
                  <label className="block text-xs text-gray-500 mb-1">Output As</label>
                  <input
                    type="text"
                    value={func.as || ''}
                    onChange={(e) => updateFunction(index, { as: e.target.value })}
                    placeholder="Result field name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <Button
                    variant="danger"
                    size="xs"
                    onClick={() => removeFunction(index)}
                    icon={<FiTrash2 />}
                    aria-label="Remove function"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Alert action config component
const AlertActionConfig = ({ config, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...config, [name]: value });
  };

  const handleChannelChange = (e) => {
    const channels = e.target.value.split(',').map(c => c.trim()).filter(Boolean);
    onChange({ ...config, notifyChannels: channels });
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alert Level
          </label>
          <select
            name="level"
            value={config?.level || 'info'}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          >
            <option value="info">Info</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alert Message
        </label>
        <textarea
          name="message"
          value={config?.message || ''}
          onChange={handleChange}
          placeholder="Alert message text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          rows={3}
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notification Channels (comma-separated)
        </label>
        <input
          type="text"
          value={(config?.notifyChannels || []).join(', ')}
          onChange={handleChannelChange}
          placeholder="e.g., email, sms, webhook"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Enter comma-separated channel names to notify
        </p>
      </div>
    </div>
  );
};

// Main RulesEditor component
const RulesEditor = ({ rule = null, pipelines = [], onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    status: 'inactive',
    pipeline: '',
    conditions: [],
    action: 'filter',
    createdAt: '',
    updatedAt: ''
  });

  // Additional action-specific configuration
  const [actionConfig, setActionConfig] = useState({});

  // Initialize form data when rule is provided
  useEffect(() => {
    if (rule) {
      setFormData({
        ...rule,
        pipeline: rule.pipeline || (pipelines.length > 0 ? pipelines[0].id : '')
      });

      // Extract action-specific configuration
      const { id, name, description, status, pipeline, conditions, action, createdAt, updatedAt, ...restConfig } = rule;
      setActionConfig(restConfig[action] || {});
    }
  }, [rule, pipelines]);

  // Handle main form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If action changes, reset the action config
    if (name === 'action' && value !== formData.action) {
      setActionConfig({});
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle adding a new condition
  const addCondition = () => {
    setFormData(prev => ({
      ...prev,
      conditions: [...prev.conditions, { field: '', operator: 'equals', value: '' }]
    }));
  };

  // Handle updating a condition
  const updateCondition = (index, updatedCondition) => {
    setFormData(prev => {
      const newConditions = [...prev.conditions];
      newConditions[index] = updatedCondition;
      return { ...prev, conditions: newConditions };
    });
  };

  // Handle removing a condition
  const removeCondition = (index) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  // Handle action configuration changes
  const handleActionConfigChange = (config) => {
    setActionConfig(config);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine form data with action-specific configuration
    const finalData = {
      ...formData,
      // Add the action config under the action name
      [formData.action]: actionConfig
    };
    
    onSave(finalData);
  };

  // Render different configuration sections based on selected action
  const renderActionConfig = () => {
    switch (formData.action) {
      case 'transform':
        return (
          <TransformActionConfig 
            config={actionConfig}
            onChange={handleActionConfigChange}
          />
        );
      case 'aggregate':
        return (
          <AggregateActionConfig 
            config={actionConfig}
            onChange={handleActionConfigChange}
          />
        );
      case 'alert':
        return (
          <AlertActionConfig 
            config={actionConfig}
            onChange={handleActionConfigChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rule Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter rule name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter rule description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pipeline
              </label>
              <select
                name="pipeline"
                value={formData.pipeline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                required
              >
                <option value="">Select a pipeline</option>
                {pipelines.map(pipeline => (
                  <option key={pipeline.id} value={pipeline.id}>
                    {pipeline.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Action
              </label>
              <select
                name="action"
                value={formData.action}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                required
              >
                {actions.map(action => (
                  <option key={action.value} value={action.value}>
                    {action.label}
                  </option>
                ))}
              </select>
              {formData.action && (
                <p className="mt-1 text-sm text-gray-500">
                  {actions.find(a => a.value === formData.action)?.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Conditions</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={addCondition}
                icon={<FiPlus />}
              >
                Add Condition
              </Button>
            </div>
            
            {formData.conditions.length === 0 ? (
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center">
                <p className="text-gray-500">
                  No conditions added yet. Click "Add Condition" to create your first condition.
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                {formData.conditions.map((condition, index) => (
                  <ConditionRow
                    key={index}
                    condition={condition}
                    index={index}
                    onChange={updateCondition}
                    onRemove={removeCondition}
                    isLast={index === formData.conditions.length - 1}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Action specific configuration */}
          {formData.action !== 'filter' && (
            <div>
              <h3 className="text-lg font-medium mb-3">
                {formData.action.charAt(0).toUpperCase() + formData.action.slice(1)} Configuration
              </h3>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                {renderActionConfig()}
              </div>
            </div>
          )}
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
            Save Rule
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RulesEditor;
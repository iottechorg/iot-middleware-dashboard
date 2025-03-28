import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import StatusIndicator from '../common/StatusIndicator';

import api from '../../services/api';

const AlertRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddRule, setShowAddRule] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    condition: '',
    severity: 'warning',
    target: 'device',
    active: true
  });

  useEffect(() => {
    // Simulate API call to fetch alert rules
    const fetchRules = async () => {
      try {
        // Replace with actual API call
        const rules = await api.getAlertRules();
        setRules(rules);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching alert rules:', error);
        setLoading(false);
      }
    };
    fetchRules();
  }, []);

  const handleToggleRule = (id) => {
    setRules(prevRules =>
      prevRules.map(rule =>
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
    // In a real app, you would call an API to update the rule
  };

  const handleDeleteRule = (id) => {
    setRules(prevRules => prevRules.filter(rule => rule.id !== id));
    // In a real app, you would call an API to delete the rule
  };

  const handleAddRule = () => {
    const newRuleWithId = {
      ...newRule,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setRules(prevRules => [...prevRules, newRuleWithId]);
    setNewRule({
      name: '',
      description: '',
      condition: '',
      severity: 'warning',
      target: 'device',
      active: true
    });
    setShowAddRule(false);
    // In a real app, you would call an API to add the rule
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRule(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'red';
      case 'warning': return 'orange';
      case 'info': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <Card title="Alert Rules">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">
            {rules.length} rules configured • {rules.filter(r => r.active).length} active
          </span>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => setShowAddRule(true)}
        >
          Add New Rule
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-4">Loading rules...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rules.map((rule) => (
                <tr key={rule.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                    <div className="text-sm text-gray-500">{rule.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{rule.condition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusIndicator 
                      status={rule.severity} 
                      color={getSeverityColor(rule.severity)} 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{rule.target}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={rule.active}
                        onChange={() => handleToggleRule(rule.id)}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {rule.active ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => console.log('Edit rule', rule.id)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add New Rule Form */}
      {showAddRule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Alert Rule</h3>
            
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rule Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newRule.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="CPU Usage Alert"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newRule.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Alert when CPU usage exceeds threshold"
                  rows={2}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <input
                  type="text"
                  name="condition"
                  value={newRule.condition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="cpu.usage > 90%"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Severity
                  </label>
                  <select
                    name="severity"
                    value={newRule.severity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target
                  </label>
                  <select
                    name="target"
                    value={newRule.target}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="device">Device</option>
                    <option value="system">System</option>
                    <option value="protocol">Protocol</option>
                    <option value="pipeline">Pipeline</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  checked={newRule.active}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Activate rule immediately
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowAddRule(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleAddRule}
                disabled={!newRule.name || !newRule.condition}
              >
                Add Rule
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AlertRules;
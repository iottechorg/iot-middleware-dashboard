// src/components/panels/DataProcessing.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { FiActivity, FiEdit, FiPlus, FiRefreshCw, FiList } from 'react-icons/fi';
import DataPipeline from '../data-processing/DataPipeline';
import PipelineEditor from '../data-processing/PipelineEditor';
import RulesList from '../data-processing/RulesList';
import RulesEditor from '../data-processing/RulesEditor';
import Button from '../common/Button';
import Card from '../common/Card';
import api from '../../services/api';

const DataProcessing = () => {
  const [pipelines, setPipelines] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('pipelines'); // 'pipelines', 'rules', 'pipelineEditor', 'ruleEditor'
  const [error, setError] = useState(null);

  // Fetch pipelines and rules on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockPipelines = await api.getDataProcessingDataPipelines()
        const rules = await api.getDataProcessingDataRules();
        
        setPipelines(mockPipelines);
        setRules(rules);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data processing information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle adding a new pipeline
  const handleAddPipeline = useCallback(() => {
    setSelectedPipeline({
      id: `pipeline-new-${Date.now()}`,
      name: '',
      description: '',
      status: 'inactive',
      nodes: [],
      connections: []
    });
    setView('pipelineEditor');
  }, []);

  // Handle editing a pipeline
  const handleEditPipeline = useCallback((pipeline) => {
    setSelectedPipeline(pipeline);
    setView('pipelineEditor');
  }, []);

  // Handle saving a pipeline
  const handleSavePipeline = useCallback((updatedPipeline) => {
    setPipelines(prev => {
      const index = prev.findIndex(p => p.id === updatedPipeline.id);
      if (index >= 0) {
        // Update existing pipeline
        const newPipelines = [...prev];
        newPipelines[index] = updatedPipeline;
        return newPipelines;
      } else {
        // Add new pipeline
        return [...prev, {
          ...updatedPipeline,
          id: updatedPipeline.id.startsWith('pipeline-new-') 
            ? `pipeline-${Date.now()}` 
            : updatedPipeline.id
        }];
      }
    });
    setView('pipelines');
    setSelectedPipeline(null);
  }, []);

  // Handle adding a new rule
  const handleAddRule = useCallback(() => {
    setSelectedRule({
      id: `rule-new-${Date.now()}`,
      name: '',
      description: '',
      status: 'inactive',
      pipeline: pipelines.length > 0 ? pipelines[0].id : '',
      conditions: [],
      action: 'filter',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setView('ruleEditor');
  }, [pipelines]);

  // Handle editing a rule
  const handleEditRule = useCallback((rule) => {
    setSelectedRule(rule);
    setView('ruleEditor');
  }, []);

  // Handle saving a rule
  const handleSaveRule = useCallback((updatedRule) => {
    setRules(prev => {
      const index = prev.findIndex(r => r.id === updatedRule.id);
      if (index >= 0) {
        // Update existing rule
        const newRules = [...prev];
        newRules[index] = {
          ...updatedRule,
          updatedAt: new Date().toISOString()
        };
        return newRules;
      } else {
        // Add new rule
        return [...prev, {
          ...updatedRule,
          id: updatedRule.id.startsWith('rule-new-') 
            ? `rule-${Date.now()}` 
            : updatedRule.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }];
      }
    });
    setView('rules');
    setSelectedRule(null);
  }, []);

  // Handle deleting a rule
  const handleDeleteRule = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      setRules(prev => prev.filter(rule => rule.id !== id));
    }
  }, []);

  // Handle deleting a pipeline
  const handleDeletePipeline = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this pipeline? All associated rules will also be deleted.')) {
      setPipelines(prev => prev.filter(pipeline => pipeline.id !== id));
      // Delete associated rules
      setRules(prev => prev.filter(rule => rule.pipeline !== id));
    }
  }, []);

  // Render the appropriate view
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <Card>
          <div className="p-6 text-center">
            <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
            <Button 
              variant="primary" 
              onClick={() => window.location.reload()}
              icon={<FiRefreshCw />}
            >
              Retry
            </Button>
          </div>
        </Card>
      );
    }

    switch (view) {
      case 'pipelines':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Data Processing Pipelines</h1>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setView('rules')}
                  icon={<FiList />}
                >
                  View Rules
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleAddPipeline}
                  icon={<FiPlus />}
                >
                  Add Pipeline
                </Button>
              </div>
            </div>

            {pipelines.length === 0 ? (
              <Card>
                <div className="p-10 text-center">
                  <h3 className="text-xl mb-4">No pipelines found</h3>
                  <p className="text-gray-500 mb-6">Create your first data processing pipeline to start transforming your data.</p>
                  <Button 
                    variant="primary" 
                    onClick={handleAddPipeline}
                    icon={<FiPlus />}
                  >
                    Create Pipeline
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-8">
                {pipelines.map((pipeline) => (
                  <div key={pipeline.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">{pipeline.name}</h2>
                      <div className="flex gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          icon={<FiEdit />}
                          onClick={() => handleEditPipeline(pipeline)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleDeletePipeline(pipeline.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <DataPipeline 
                      pipeline={pipeline} 
                      onEdit={() => handleEditPipeline(pipeline)}
                    />
                    
                    {/* Show related rules */}
                    <div className="mt-4">
                      <h3 className="text-md font-medium mb-2">Associated Rules</h3>
                      {rules.filter(rule => rule.pipeline === pipeline.id).length > 0 ? (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <ul className="space-y-2">
                            {rules
                              .filter(rule => rule.pipeline === pipeline.id)
                              .map(rule => (
                                <li key={rule.id} className="flex justify-between items-center">
                                  <div>
                                    <span className="font-medium">{rule.name}</span>
                                    <span className="ml-2 text-sm text-gray-500">{rule.description}</span>
                                  </div>
                                  <Button 
                                    variant="text" 
                                    size="xs"
                                    onClick={() => handleEditRule(rule)}
                                  >
                                    View
                                  </Button>
                                </li>
                              ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No rules associated with this pipeline</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      case 'rules':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Processing Rules</h1>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setView('pipelines')}
                  icon={<FiActivity />}
                >
                  View Pipelines
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleAddRule}
                  icon={<FiPlus />}
                >
                  Add Rule
                </Button>
              </div>
            </div>

            <RulesList 
              rules={rules} 
              pipelines={pipelines}
              onEdit={handleEditRule}
              onDelete={handleDeleteRule}
              onAdd={handleAddRule}
            />
          </div>
        );
      
      case 'pipelineEditor':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {selectedPipeline && selectedPipeline.id.startsWith('pipeline-new-') 
                  ? 'Create Pipeline' 
                  : 'Edit Pipeline'}
              </h1>
              <Button 
                variant="outline" 
                onClick={() => {
                  setView('pipelines');
                  setSelectedPipeline(null);
                }}
              >
                Cancel
              </Button>
            </div>

            <PipelineEditor 
              pipeline={selectedPipeline} 
              onSave={handleSavePipeline} 
              onCancel={() => {
                setView('pipelines');
                setSelectedPipeline(null);
              }}
            />
          </div>
        );
      
      case 'ruleEditor':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {selectedRule && selectedRule.id.startsWith('rule-new-') 
                  ? 'Create Rule' 
                  : 'Edit Rule'}
              </h1>
              <Button 
                variant="outline" 
                onClick={() => {
                  setView('rules');
                  setSelectedRule(null);
                }}
              >
                Cancel
              </Button>
            </div>

            <RulesEditor 
              rule={selectedRule} 
              pipelines={pipelines}
              onSave={handleSaveRule} 
              onCancel={() => {
                setView('rules');
                setSelectedRule(null);
              }}
            />
          </div>
        );
      
      default:
        return <div>Unknown view</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {renderContent()}
    </div>
  );
};

export default DataProcessing;
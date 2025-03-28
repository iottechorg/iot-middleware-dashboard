// src/components/data-processing/DataPipeline.jsx
import React, { useState, useEffect } from 'react';
import { Empty, Spin, Button, message, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import ReactFlow, { 
  Controls, 
  Background, 
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import api  from '../../services/api';

import Card from '../common/Card';

// Node types
const nodeTypes = {
  input: InputNode,
  processor: ProcessorNode,
  filter: FilterNode,
  transformer: TransformerNode,
  output: OutputNode,
};

// Custom node components
function InputNode({ data }) {
  return (
    <div className="node input-node">
      <div className="node-header">
        <div className="node-title">Input: {data.label}</div>
        <div className="node-status" style={{ backgroundColor: data.active ? '#52c41a' : '#f5222d' }}></div>
      </div>
      <div className="node-body">
        <div>Protocol: {data.protocol}</div>
        <div>Devices: {data.devices}</div>
      </div>
    </div>
  );
}

function ProcessorNode({ data }) {
  return (
    <div className="node processor-node">
      <div className="node-header">
        <div className="node-title">Processor: {data.label}</div>
        <div className="node-status" style={{ backgroundColor: data.active ? '#52c41a' : '#f5222d' }}></div>
      </div>
      <div className="node-body">
        <div>Type: {data.type}</div>
        <div>Processing Rate: {data.rate}/sec</div>
      </div>
    </div>
  );
}

function FilterNode({ data }) {
  return (
    <div className="node filter-node">
      <div className="node-header">
        <div className="node-title">Filter: {data.label}</div>
        <div className="node-status" style={{ backgroundColor: data.active ? '#52c41a' : '#f5222d' }}></div>
      </div>
      <div className="node-body">
        <div>Condition: {data.condition}</div>
        <div>Pass Rate: {data.passRate}%</div>
      </div>
    </div>
  );
}

function TransformerNode({ data }) {
  return (
    <div className="node transformer-node">
      <div className="node-header">
        <div className="node-title">Transformer: {data.label}</div>
        <div className="node-status" style={{ backgroundColor: data.active ? '#52c41a' : '#f5222d' }}></div>
      </div>
      <div className="node-body">
        <div>Transformation: {data.transformation}</div>
        <div>Latency: {data.latency}ms</div>
      </div>
    </div>
  );
}

function OutputNode({ data }) {
  return (
    <div className="node output-node">
      <div className="node-header">
        <div className="node-title">Output: {data.label}</div>
        <div className="node-status" style={{ backgroundColor: data.active ? '#52c41a' : '#f5222d' }}></div>
      </div>
      <div className="node-body">
        <div>Destination: {data.destination}</div>
        <div>Data Rate: {data.dataRate}</div>
      </div>
    </div>
  );
}

const DataPipeline = ({ onEditPipeline }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [pipelines, setPipelines] = useState([]);
  
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchPipelines = async () => {
      try {
        // Mock data for demonstration
        const mockPipelines = [
          { id: '1', name: 'Temperature Data Processing', active: true },
          { id: '2', name: 'Humidity Data Filtering', active: false },
          { id: '3', name: 'Motion Sensor Analysis', active: true },
        ];
        
        setPipelines(mockPipelines);
        // Set the first pipeline as selected by default
        if (mockPipelines.length > 0) {
          setSelectedPipeline(mockPipelines[0]);
          loadPipelineData(mockPipelines[0].id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching pipelines:', error);
        setLoading(false);
      }
    };
    
    fetchPipelines();
  }, []);
  
  const loadPipelineData = async (pipelineId) => {
    setLoading(true);
    try {
  
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockNodes = await api.getDataPipelineNodes();
      const mockEdges = await api.getDataPipelineEdges();
      
      setNodes(mockNodes);
      setEdges(mockEdges);
      setLoading(false);
    } catch (error) {
      console.error('Error loading pipeline data:', error);
      setLoading(false);
    }
  };
  
  const onConnect = (params) => {
    setEdges((eds) => addEdge(params, eds));
  };
  
  const handlePipelineToggle = (pipeline) => {
    // This would be replaced with an actual API call
    const updatedPipelines = pipelines.map(p => 
      p.id === pipeline.id ? { ...p, active: !p.active } : p
    );
    setPipelines(updatedPipelines);
    
    const updatedPipeline = updatedPipelines.find(p => p.id === pipeline.id);
    if (selectedPipeline && selectedPipeline.id === pipeline.id) {
      setSelectedPipeline(updatedPipeline);
    }
    
    message.success(`Pipeline ${updatedPipeline.active ? 'activated' : 'deactivated'} successfully!`);
  };
  
  const handlePipelineSelect = (pipeline) => {
    setSelectedPipeline(pipeline);
    loadPipelineData(pipeline.id);
  };
  
  const pipelineSelector = (
    <div className="pipeline-selector">
      <div className="pipeline-tabs">
        {pipelines.map(pipeline => (
          <div 
            key={pipeline.id}
            className={`pipeline-tab ${selectedPipeline && selectedPipeline.id === pipeline.id ? 'active' : ''}`}
            onClick={() => handlePipelineSelect(pipeline)}
          >
            <span>{pipeline.name}</span>
            <div className="pipeline-actions">
              <Tooltip title={pipeline.active ? 'Deactivate' : 'Activate'}>
                <Button
                  type="text"
                  icon={pipeline.active ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePipelineToggle(pipeline);
                  }}
                  size="small"
                />
              </Tooltip>
              <Tooltip title="Edit">
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditPipeline(pipeline);
                  }}
                  size="small"
                />
              </Tooltip>
            </div>
          </div>
        ))}
        <Button 
          className="add-pipeline-btn"
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() => onEditPipeline(null)}
        >
          Add Pipeline
        </Button>
      </div>
    </div>
  );
  
  return (
    <Card 
      title="Data Pipeline Visualization" 
      extra={
        <Button type="primary" onClick={() => onEditPipeline(selectedPipeline)}>
          Edit Current Pipeline
        </Button>
      }
    >
      {pipelineSelector}
      <div style={{ height: 600 }}>
        {loading ? (
          <div className="centered-spinner">
            <Spin size="large" tip="Loading pipeline..." />
          </div>
        ) : nodes.length === 0 ? (
          <Empty 
            description="No pipeline data available" 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
          />
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        )}
      </div>
      
      <style jsx>{`
        .pipeline-selector {
          margin-bottom: 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .pipeline-tabs {
          display: flex;
          overflow-x: auto;
        }
        
        .pipeline-tab {
          padding: 8px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid transparent;
          min-width: 180px;
        }
        
        .pipeline-tab:hover {
          background-color: #f5f5f5;
        }
        
        .pipeline-tab.active {
          border-bottom: 2px solid #1890ff;
          font-weight: 500;
        }
        
        .pipeline-actions {
          display: flex;
          gap: 4px;
        }
        
        .add-pipeline-btn {
          margin-left: 8px;
          height: 40px;
          align-self: center;
        }
        
        .centered-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        
        .node {
          padding: 0;
          border-radius: 5px;
          width: 200px;
          font-size: 12px;
          color: #333;
          text-align: center;
          border: 1px solid #ccc;
        }
        
        .node-header {
          padding: 8px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .node-title {
          font-weight: bold;
        }
        
        .node-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        
        .node-body {
          padding: 8px;
          text-align: left;
        }
        
        .input-node {
          background-color: #e6f7ff;
          border-color: #91d5ff;
        }
        
        .filter-node {
          background-color: #fff7e6;
          border-color: #ffd591;
        }
        
        .transformer-node {
          background-color: #f6ffed;
          border-color: #b7eb8f;
        }
        
        .processor-node {
          background-color: #f9f0ff;
          border-color: #d3adf7;
        }
        
        .output-node {
          background-color: #e6fffb;
          border-color: #87e8de;
        }
      `}</style>
    </Card>
  );
};

export default DataPipeline;
// src/services/mockData/dataProcessingGenerator.js
import { 
    getRandomInt, 
    getRandomElement,
    getRandomFloat,
  } from './utils';
  
  // Data Processing Pipelines
  export const generateDataProcessingPipelines = () => {
    const pipelineTypes = [
      {
        name: 'Temperature Data Processing',
        description: 'Processes raw temperature sensor data for analysis and storage',
        nodes: [
          { type: 'source', title: 'Temperature Sensors', description: 'Collects data from all temperature sensors' },
          { type: 'filter', title: 'Data Validation', description: 'Validates sensor data and filters outliers' },
          { type: 'transform', title: 'Unit Conversion', description: 'Converts temperature data to standard units' },
          { type: 'destination', title: 'Time Series DB', description: 'Stores processed data in time series database' },
          { type: 'destination', title: 'Analytics Engine', description: 'Sends data to analytics engine for processing' }
        ]
      },
      {
        name: 'Motion Detection Alert',
        description: 'Processes motion sensor data and triggers alerts',
        nodes: [
          { type: 'source', title: 'Motion Sensors', description: 'Collects data from all motion sensors' },
          { type: 'filter', title: 'Motion Validation', description: 'Validates motion detection events' },
          { type: 'transform', title: 'Event Enrichment', description: 'Adds metadata to motion events' },
          { type: 'destination', title: 'Alert System', description: 'Triggers alerts based on motion events' }
        ]
      },
      {
        name: 'Energy Consumption Analysis',
        description: 'Analyzes energy consumption data from smart meters',
        nodes: [
          { type: 'source', title: 'Smart Meters', description: 'Collects data from smart energy meters' },
          { type: 'filter', title: 'Data Cleaning', description: 'Removes invalid readings and noise' },
          { type: 'transform', title: 'Usage Calculation', description: 'Calculates energy usage metrics' },
          { type: 'transform', title: 'Pattern Analysis', description: 'Identifies usage patterns and anomalies' },
          { type: 'destination', title: 'Dashboard', description: 'Displays energy usage data in dashboard' },
          { type: 'destination', title: 'Billing System', description: 'Sends consumption data to billing system' }
        ]
      }
    ];
    
    // Generate random status for each node and connection
    const randomizeNodeStatus = () => {
      const statusProbabilities = { active: 0.8, warning: 0.15, error: 0.05 };
      const r = Math.random();
      
      if (r < statusProbabilities.active) return 'active';
      if (r < statusProbabilities.active + statusProbabilities.warning) return 'warning';
      return 'error';
    };
    
    // Generate pipeline with dynamic statuses and positioning
    return pipelineTypes.map((template, index) => {
      const pipelineId = `pipeline-${index + 1}`;
      const nodes = template.nodes.map((node, nodeIndex) => {
        const nodeStatus = randomizeNodeStatus();
        
        // Calculate position with some randomness
        const xBase = 50 + (nodeIndex * 250);
        const yBase = nodeIndex % 2 === 0 ? 50 : 200;
        const xOffset = getRandomInt(-20, 20);
        const yOffset = getRandomInt(-20, 20);
        
        return {
          id: `node-${nodeIndex + 1}`,
          type: node.type,
          title: node.title,
          description: node.description,
          status: nodeStatus,
          position: { x: xBase + xOffset, y: yBase + yOffset }
        };
      });
      
      // Create connections between nodes
      const connections = [];
      for (let i = 0; i < nodes.length - 1; i++) {
        // Direct connection to next node
        connections.push({
          source: nodes[i].id,
          target: nodes[i + 1].id,
          status: randomizeNodeStatus()
        });
        
        // If node has multiple outputs, connect to other nodes
        if (nodes[i].type === 'transform' && i < nodes.length - 2 && Math.random() > 0.5) {
          connections.push({
            source: nodes[i].id,
            target: nodes[i + 2].id,
            status: randomizeNodeStatus()
          });
        }
      }
      
      return {
        id: pipelineId,
        name: template.name,
        description: template.description,
        status: 'active',
        nodes,
        connections
      };
    });
  };
  
  export const generateDataProcessingRules = () => {
    const ruleTemplates = [
      {
        name: 'Temperature Outlier Filter',
        description: 'Filters out temperature readings outside of expected range',
        pipeline: 'pipeline-1',
        conditions: [
          { field: 'temperature', operator: 'lessThan', value: -30 },
          { field: 'temperature', operator: 'greaterThan', value: 80 }
        ],
        action: 'filter'
      },
      {
        name: 'Temperature Unit Converter',
        description: 'Converts temperature from Fahrenheit to Celsius',
        pipeline: 'pipeline-1',
        conditions: [
          { field: 'unit', operator: 'equals', value: 'fahrenheit' }
        ],
        action: 'transform',
        transformation: {
          target: 'temperature',
          formula: '(value - 32) * 5/9',
          newUnit: 'celsius'
        }
      },
      {
        name: 'Motion Alert Generator',
        description: 'Generates alerts when motion is detected in secured areas',
        pipeline: 'pipeline-2',
        conditions: [
          { field: 'motionDetected', operator: 'equals', value: true },
          { field: 'area', operator: 'in', value: ['secured', 'restricted'] },
          { field: 'businessHours', operator: 'equals', value: false }
        ],
        action: 'alert',
        alert: {
          level: 'high',
          message: 'Motion detected in secured area outside business hours',
          notifyChannels: ['security', 'admin']
        }
      },
      {
        name: 'Data Aggregator',
        description: 'Aggregates temperature data into 5-minute windows',
        pipeline: 'pipeline-1',
        conditions: [],
        action: 'aggregate',
        aggregation: {
          timeWindow: 300,
          functions: [
            { field: 'temperature', function: 'avg', as: 'avgTemperature' },
            { field: 'temperature', function: 'min', as: 'minTemperature' },
            { field: 'temperature', function: 'max', as: 'maxTemperature' }
          ]
        }
      },
      {
        name: 'Energy Consumption Threshold Alert',
        description: 'Alerts when energy consumption exceeds threshold',
        pipeline: 'pipeline-3',
        conditions: [
          { field: 'consumption', operator: 'greaterThan', value: 1000 },
          { field: 'duration', operator: 'greaterThan', value: 30 }
        ],
        action: 'alert',
        alert: {
          level: 'medium',
          message: 'Sustained high energy consumption detected',
          notifyChannels: ['operations', 'energy-management']
        }
      },
      {
        name: 'Peak Usage Detector',
        description: 'Identifies peak energy usage periods',
        pipeline: 'pipeline-3',
        conditions: [
          { field: 'usageRate', operator: 'greaterThan', value: 75 },
          { field: 'time', operator: 'between', value: ['08:00', '18:00'] }
        ],
        action: 'tag',
        tag: {
          name: 'peak-usage',
          value: 'business-hours'
        }
      }
    ];
    
    return ruleTemplates.map((template, index) => {
      const now = new Date();
      const creationDate = new Date(now.getTime() - getRandomInt(1, 30) * 24 * 60 * 60 * 1000);
      const updateDate = new Date(creationDate.getTime() + getRandomInt(0, 10) * 24 * 60 * 60 * 1000);
      
      return {
        id: `rule-${index + 1}`,
        name: template.name,
        description: template.description,
        status: Math.random() > 0.8 ? 'inactive' : 'active',
        pipeline: template.pipeline,
        conditions: template.conditions,
        action: template.action,
        ...(template.transformation && { transformation: template.transformation }),
        ...(template.alert && { alert: template.alert }),
        ...(template.aggregation && { aggregation: template.aggregation }),
        ...(template.tag && { tag: template.tag }),
        createdAt: creationDate.toISOString(),
        updatedAt: updateDate.toISOString()
      };
    });
  };
  
  export const generateDataPipelineNodes = () => {
    return [
      {
        id: 'input-1',
        type: 'input',
        position: { x: 100, y: 100 },
        data: { 
          label: 'MQTT Broker',
          protocol: 'MQTT',
          devices: getRandomInt(10, 50),
          active: Math.random() > 0.1
        }
      },
      {
        id: 'filter-1',
        type: 'filter',
        position: { x: 400, y: 50 },
        data: { 
          label: 'Temperature Filter',
          condition: 'temp > 25°C',
          passRate: getRandomInt(10, 80),
          active: Math.random() > 0.1
        }
      },
      {
        id: 'transformer-1',
        type: 'transformer',
        position: { x: 400, y: 200 },
        data: { 
          label: 'Unit Converter',
          transformation: '°C to °F',
          latency: getRandomInt(5, 30),
          active: Math.random() > 0.1
        }
      },
      {
        id: 'processor-1',
        type: 'processor',
        position: { x: 700, y: 100 },
        data: { 
          label: 'Anomaly Detector',
          type: 'ML Processor',
          rate: getRandomInt(100, 1000),
          active: Math.random() > 0.1
        }
      },
      {
        id: 'output-1',
        type: 'output',
        position: { x: 1000, y: 100 },
        data: { 
          label: 'Database Storage',
          destination: 'TimescaleDB',
          dataRate: `${getRandomFloat(0.1, 5, 1)} KB/s`,
          active: Math.random() > 0.1
        }
      }
    ];
  };
  
  export const generateDataPipelineEdges = () => {
    return [
      { id: 'e1-2a', source: 'input-1', target: 'filter-1' },
      { id: 'e1-2b', source: 'input-1', target: 'transformer-1' },
      { id: 'e2a-3', source: 'filter-1', target: 'processor-1' },
      { id: 'e2b-3', source: 'transformer-1', target: 'processor-1' },
      { id: 'e3-4', source: 'processor-1', target: 'output-1' }
    ];
  };
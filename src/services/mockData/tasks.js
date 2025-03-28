// src/services/mockData/tasks.js

const mockTasks = [
    {
      id: 'task-1',
      name: 'Video Processing Task',
      description: 'Process incoming video feed for motion detection',
      status: 'running',
      priority: 'high',
      resources: {
        cpu: 2,
        memory: 1024,
        gpu: 0
      },
      resourceUsage: {
        cpu: 78,
        memory: 62,
        gpu: 0
      },
      assignedNode: 'edge-node-1',
      startTime: new Date(Date.now() - 3600000).toISOString(),
      estimatedEndTime: new Date(Date.now() + 1800000).toISOString(),
      progress: 65,
      type: 'video-processing',
      sourceDevice: 'camera-a12'
    },
    {
      id: 'task-2',
      name: 'Data Aggregation',
      description: 'Aggregate temperature sensor data from Building A',
      status: 'queued',
      priority: 'medium',
      resources: {
        cpu: 1,
        memory: 512,
        gpu: 0
      },
      resourceUsage: {
        cpu: 0,
        memory: 0,
        gpu: 0
      },
      assignedNode: 'cloud-node-3',
      startTime: null,
      estimatedEndTime: null,
      progress: 0,
      type: 'data-aggregation',
      sourceDevice: 'temp-sensors-bldg-a'
    },
    {
      id: 'task-3',
      name: 'Machine Learning Inference',
      description: 'Run anomaly detection model on sensor data',
      status: 'completed',
      priority: 'high',
      resources: {
        cpu: 4,
        memory: 2048,
        gpu: 1
      },
      resourceUsage: {
        cpu: 0,
        memory: 0,
        gpu: 0
      },
      assignedNode: 'cloud-node-1',
      startTime: new Date(Date.now() - 7200000).toISOString(),
      estimatedEndTime: new Date(Date.now() - 3600000).toISOString(),
      completedTime: new Date(Date.now() - 3540000).toISOString(),
      progress: 100,
      type: 'ml-inference',
      sourceDevice: 'all-sensors'
    },
    {
      id: 'task-4',
      name: 'Database Backup',
      description: 'Backup time-series database to cloud storage',
      status: 'failed',
      priority: 'low',
      resources: {
        cpu: 1,
        memory: 1024,
        gpu: 0
      },
      resourceUsage: {
        cpu: 0,
        memory: 0,
        gpu: 0
      },
      assignedNode: 'cloud-node-2',
      startTime: new Date(Date.now() - 5400000).toISOString(),
      estimatedEndTime: new Date(Date.now() - 4800000).toISOString(),
      error: 'Network connection lost during backup',
      progress: 68,
      type: 'backup',
      sourceDevice: 'timeseries-db'
    },
    {
      id: 'task-5',
      name: 'Firmware Update',
      description: 'Deploy firmware update to all temperature sensors',
      status: 'running',
      priority: 'medium',
      resources: {
        cpu: 1,
        memory: 512,
        gpu: 0
      },
      resourceUsage: {
        cpu: 45,
        memory: 32,
        gpu: 0
      },
      assignedNode: 'cloud-node-1',
      startTime: new Date(Date.now() - 1800000).toISOString(),
      estimatedEndTime: new Date(Date.now() + 3600000).toISOString(),
      progress: 35,
      type: 'firmware-update',
      sourceDevice: 'temperature-sensors'
    },
    {
      id: 'task-6',
      name: 'Energy Consumption Analysis',
      description: 'Generate monthly energy consumption report',
      status: 'queued',
      priority: 'low',
      resources: {
        cpu: 2,
        memory: 1024,
        gpu: 0
      },
      resourceUsage: {
        cpu: 0,
        memory: 0,
        gpu: 0
      },
      assignedNode: 'cloud-node-2',
      startTime: null,
      estimatedEndTime: null,
      progress: 0,
      type: 'data-analysis',
      sourceDevice: 'energy-meters'
    },
    {
      id: 'task-7',
      name: 'Model Training',
      description: 'Train predictive maintenance model on equipment sensor data',
      status: 'queued',
      priority: 'high',
      resources: {
        cpu: 8,
        memory: 16384,
        gpu: 2
      },
      resourceUsage: {
        cpu: 0,
        memory: 0,
        gpu: 0
      },
      assignedNode: 'cloud-node-1',
      startTime: null,
      estimatedEndTime: null,
      progress: 0,
      type: 'ml-training',
      sourceDevice: 'equipment-sensors'
    },
    {
      id: 'task-8',
      name: 'Data Visualization Generation',
      description: 'Generate data visualizations for executive dashboard',
      status: 'completed',
      priority: 'medium',
      resources: {
        cpu: 2,
        memory: 2048,
        gpu: 0
      },
      resourceUsage: {
        cpu: 0,
        memory: 0,
        gpu: 0
      },
      assignedNode: 'cloud-node-1',
      startTime: new Date(Date.now() - 14400000).toISOString(),
      estimatedEndTime: new Date(Date.now() - 12600000).toISOString(),
      completedTime: new Date(Date.now() - 12600000).toISOString(),
      progress: 100,
      type: 'data-visualization',
      sourceDevice: 'multiple'
    }
  ];
  
  export default mockTasks;
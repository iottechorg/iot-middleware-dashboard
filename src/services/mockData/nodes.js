// src/services/mockData/nodes.js

const mockNodes = [
    {
      id: 'edge-node-1',
      name: 'Edge Node 1',
      type: 'edge',
      status: 'online',
      location: 'Building A',
      resources: {
        cpu: { total: 4, used: 3.1, available: 0.9 },
        memory: { total: 8192, used: 4096, available: 4096, unit: 'MB' },
        storage: { total: 128, used: 42, available: 86, unit: 'GB' },
        gpu: { total: 0, used: 0, available: 0 }
      },
      tasks: ['task-1'],
      lastSeen: new Date().toISOString(),
      uptimeHours: 124
    },
    {
      id: 'edge-node-2',
      name: 'Edge Node 2',
      type: 'edge',
      status: 'online',
      location: 'Building B',
      resources: {
        cpu: { total: 4, used: 1.2, available: 2.8 },
        memory: { total: 8192, used: 2048, available: 6144, unit: 'MB' },
        storage: { total: 128, used: 38, available: 90, unit: 'GB' },
        gpu: { total: 0, used: 0, available: 0 }
      },
      tasks: [],
      lastSeen: new Date().toISOString(),
      uptimeHours: 72
    },
    {
      id: 'cloud-node-1',
      name: 'Cloud Server 1',
      type: 'cloud',
      status: 'online',
      location: 'Data Center',
      resources: {
        cpu: { total: 16, used: 8.4, available: 7.6 },
        memory: { total: 32768, used: 16384, available: 16384, unit: 'MB' },
        storage: { total: 1024, used: 412, available: 612, unit: 'GB' },
        gpu: { total: 2, used: 0.5, available: 1.5 }
      },
      tasks: ['task-3'],
      lastSeen: new Date().toISOString(),
      uptimeHours: 720
    },
    {
      id: 'cloud-node-2',
      name: 'Cloud Server 2',
      type: 'cloud',
      status: 'warning',
      location: 'Data Center',
      resources: {
        cpu: { total: 16, used: 12.8, available: 3.2 },
        memory: { total: 32768, used: 28672, available: 4096, unit: 'MB' },
        storage: { total: 1024, used: 768, available: 256, unit: 'GB' },
        gpu: { total: 2, used: 1.8, available: 0.2 }
      },
      tasks: ['task-4'],
      lastSeen: new Date().toISOString(),
      uptimeHours: 543,
      warnings: ['High CPU usage', 'Low storage space']
    },
    {
      id: 'cloud-node-3',
      name: 'Cloud Server 3',
      type: 'cloud',
      status: 'offline',
      location: 'Data Center',
      resources: {
        cpu: { total: 16, used: 0, available: 0 },
        memory: { total: 32768, used: 0, available: 0, unit: 'MB' },
        storage: { total: 1024, used: 0, available: 0, unit: 'GB' },
        gpu: { total: 2, used: 0, available: 0 }
      },
      tasks: ['task-2'],
      lastSeen: new Date(Date.now() - 3600000).toISOString(),
      uptimeHours: 0,
      error: 'Node unreachable'
    }
  ];
  
  export default mockNodes;
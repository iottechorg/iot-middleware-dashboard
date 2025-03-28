// Mock data for pipelines
const pipelines = {
  // Sample pipeline visualization data
  nodes: [
    {
      id: '1',
      type: 'input',
      data: { label: 'Data Source' },
      position: { x: 250, y: 25 },
    },
    {
      id: '2',
      data: { label: 'Filter' },
      position: { x: 100, y: 125 },
    },
    {
      id: '3',
      data: { label: 'Transform' },
      position: { x: 250, y: 125 },
    },
    {
      id: '4',
      data: { label: 'Aggregate' },
      position: { x: 400, y: 125 },
    },
    {
      id: '5',
      type: 'output',
      data: { label: 'Data Sink' },
      position: { x: 250, y: 250 },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3', animated: true },
    { id: 'e1-4', source: '1', target: '4', animated: true },
    { id: 'e2-5', source: '2', target: '5', animated: true },
    { id: 'e3-5', source: '3', target: '5', animated: true },
    { id: 'e4-5', source: '4', target: '5', animated: true },
  ],
  // Pipeline configurations
  config: {
    id: 'main-pipeline',
    name: 'Main Data Pipeline',
    description: 'Primary data processing pipeline for IoT telemetry',
    status: 'active',
    created: '2023-01-15T10:30:00Z',
    lastModified: '2023-03-22T14:45:00Z',
    processingRate: 1250, // events per second
    errorRate: 0.02, // percentage
  }
};

export default pipelines;
// src/services/mockData/taskManagementGenerator.js
import { 
    getRandomInt, 
    getRandomElement, 
    getRandomFloat,
    getTimestampMinutesAgo 
  } from './utils';
  
  // Task Management
  export const generateTaskListTasks = () => {
    const now = new Date();
    const taskTypes = ['ml-inference', 'sensor-aggregation', 'data-processing', 'protocol-translation', 'model-training'];
    const statuses = ['queued', 'running', 'completed', 'failed', 'paused'];
    const priorities = ['low', 'medium', 'high', 'critical'];
    const locations = [
      { type: 'cloud', name: 'AWS EC2 Instance' },
      { type: 'cloud', name: 'GPU Cluster' },
      { type: 'cloud', name: 'Data Warehouse Node' },
      { type: 'fog', name: 'Local Processing Node' },
      { type: 'fog', name: 'Gateway Server' },
      { type: 'fog', name: 'Security Gateway' },
      { type: 'edge', name: 'Factory Floor Edge Device' }
    ];
    
    return Array(8).fill(0).map((_, index) => {
      const id = `task-${index + 1}`;
      const type = getRandomElement(taskTypes);
      const status = getRandomElement(statuses);
      const priority = getRandomElement(priorities);
      const location = getRandomElement(locations);
      
      // Generate timestamps based on status
      const createdAt = new Date(now.getTime() - getRandomInt(1, 24) * 60 * 60 * 1000).toISOString();
      let startedAt = null;
      let completedAt = null;
      
      if (status !== 'queued') {
        startedAt = new Date(new Date(createdAt).getTime() + getRandomInt(5, 30) * 60 * 1000).toISOString();
        
        if (status === 'completed' || status === 'failed') {
          completedAt = new Date(new Date(startedAt).getTime() + getRandomInt(15, 180) * 60 * 1000).toISOString();
        }
      }
      
      // Generate progress based on status
      let progress = 0;
      if (status === 'running' || status === 'paused') {
        progress = getRandomInt(5, 95);
      } else if (status === 'completed') {
        progress = 100;
      } else if (status === 'failed') {
        progress = getRandomInt(10, 90);
      }
      
      // Create task descriptions based on type
      let description = '';
      switch (type) {
        case 'ml-inference':
          description = getRandomElement([
            'Process incoming camera feeds for object recognition',
            'Detect anomalies in equipment vibration patterns',
            'Analyze security camera video stream',
            'Apply ML model to sensor readings'
          ]);
          break;
        case 'sensor-aggregation':
          description = getRandomElement([
            'Aggregate temperature sensor readings from manufacturing floor',
            'Combine humidity data from greenhouse sensors',
            'Compile motion detection events from security system'
          ]);
          break;
        case 'data-processing':
          description = getRandomElement([
            'Clean and normalize raw sensor data',
            'Process historical temperature data for trend analysis',
            'Filter and transform device telemetry'
          ]);
          break;
        case 'protocol-translation':
          description = getRandomElement([
            'Translate MQTT messages to Kafka for central processing',
            'Convert CoAP messages to HTTP REST calls',
            'Transform Modbus data to MQTT topics'
          ]);
          break;
        case 'model-training':
          description = getRandomElement([
            'Train predictive maintenance model with new data',
            'Update anomaly detection parameters',
            'Fine-tune image recognition model'
          ]);
          break;
      }
      
      return {
        id,
        name: `${type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} ${index + 1}`,
        description,
        type,
        status,
        priority,
        progress,
        createdAt,
        startedAt,
        completedAt,
        location
      };
    });
  };
  
  export const generateTaskDetailTask = () => {
    const now = new Date();
    const createdAt = new Date(now.getTime() - getRandomInt(1, 6) * 60 * 60 * 1000).toISOString();
    const startedAt = new Date(new Date(createdAt).getTime() + getRandomInt(1, 10) * 60 * 1000).toISOString();
    const runtime = `${getRandomInt(1, 5)}h ${getRandomInt(0, 59)}m`;
    const progress = getRandomInt(60, 85);
    
    // Calculate runtime in milliseconds for use in events timeline
    const runtimeMs = (now.getTime() - new Date(startedAt).getTime());
    
    // Generate events timeline
    const events = [
      {
        id: 'event-1',
        type: 'info',
        message: 'Task queued',
        timestamp: createdAt
      },
      {
        id: 'event-2',
        type: 'info',
        message: 'Task started',
        timestamp: startedAt
      }
    ];
    
    // Add intermediate events
    for (let i = 0; i < getRandomInt(3, 6); i++) {
      const timeFraction = (i + 1) / (getRandomInt(5, 8));
      const eventTime = new Date(new Date(startedAt).getTime() + (runtimeMs * timeFraction)).toISOString();
      
      const eventTypes = ['info', 'warning', 'info', 'info'];
      const eventType = getRandomElement(eventTypes);
      
      let message = '';
      if (eventType === 'info') {
        message = getRandomElement([
          `Processed ${getRandomInt(100, 1000)} images`,
          `Recognition accuracy: ${getRandomInt(75, 98)}%`,
          `Memory usage: ${getRandomInt(500, 2000)} MB`,
          `Progress update: ${Math.floor(progress * timeFraction)}%`
        ]);
      } else if (eventType === 'warning') {
        message = getRandomElement([
          'High CPU usage detected',
          'Slow network connection',
          'Low disk space warning',
          'Missed frame detection'
        ]);
      }
      
      events.push({
        id: `event-${i + 3}`,
        type: eventType,
        message,
        timestamp: eventTime
      });
    }
    
    return {
      id: 'task-1',
      name: 'Image Recognition Processing',
      description: 'Process incoming camera feeds for object recognition',
      type: 'ML Inference',
      status: 'running',
      priority: 'high',
      createdAt,
      startedAt,
      completedAt: null,
      runtime,
      progress,
      parameters: [
        { name: 'modelId', value: 'yolo-v4-tiny' },
        { name: 'confidence', value: '0.75' },
        { name: 'maxObjects', value: '50' },
        { name: 'targetFPS', value: '15' }
      ],
      events,
      resourceUsage: {
        cpu: getRandomInt(30, 60),
        memory: getRandomFloat(0.8, 2.5, 1),
        network: getRandomFloat(3.0, 10.0, 1)
      },
      location: {
        type: 'cloud',
        name: 'AWS EC2 Instance'
      },
      dependencies: [
        { id: 'task-3', name: 'Data Pre-processing', status: 'completed' },
        { id: 'task-7', name: 'Model Loading', status: 'completed' }
      ],
      results: {
        processedItems: getRandomInt(800, 2000),
        detectedObjects: getRandomInt(200, 500),
        averageConfidence: getRandomFloat(0.75, 0.95, 2),
        outputLocation: 's3://iot-results/task-1/output/'
      }
    };
  };
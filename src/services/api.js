// // src/services/api.js

// Import mock data
import mockDevices from './mockData/devices';
import mockProtocols from './mockData/protocols';
import mockPipelines from './mockData/pipelines';
import mockRules from './mockData/rules';
import mockTasks from './mockData/tasks';
import mockNodes from './mockData/nodes'; 

import {
  mockSystemMetrics,
  mockDeviceMetrics,
  mockProtocolDistribution,
  mockResourceUtilization
} from './mockData/overview';
import { 
  mockDeviceTelemetryHistory 
} from './mockData/telemetry';
import { 
  mockProtocolTraffic 
} from './mockData/traffic';
import {
  mockAlerts,
  mockAlertHistory,
  mockAlertRules,
  mockNotificationSettings
} from './mockData/alerts';
import {
  mockGeneralSettings,
  mockNetworkSettings,
  mockSecuritySettings,
  mockStorageSettings
} from './mockData/systemSettings';

import { 
  mockDataProcessingPipelines, 
  mockDataProcessingRules,
  mockTaskDetailTask,
  mockTaskListTasks,
  mockDeviceManagementDevices,
  mockDeviceContextDevices,
  mockSystemSettings,
  mockSystemNetworkInterfaces,
  mockSystemNetworkSettings,
  mockSecurityUsers,
  mockSecurityCertificates,
  mockStorageVolumes,
  mockStorageDatabases,
  mockDataPipelinesNodes,
  mockDataPipelineEdges

} from './mockData/test_system_config';

// Helper function to simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to simulate API errors
const simulateErrorRate = (errorRate = 0.05) => {
  return Math.random() < errorRate;
};

// API Service Object
const api = {
  // ===== OVERVIEW DASHBOARD =====
  
  /**
   * Get system metrics for overview dashboard
   */
  getSystemMetrics: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch system metrics');
    }
    return { ...mockSystemMetrics };
  },
  
  /**
   * Get device metrics for overview dashboard
   */
  getDeviceMetrics: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch device metrics');
    }
    return { ...mockDeviceMetrics };
  },
  
  /**
   * Get protocol distribution for overview dashboard
   */
  getProtocolDistribution: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch protocol distribution');
    }
    return [...mockProtocolDistribution];
  },
  
  /**
   * Get resource utilization data for overview dashboard
   */
  getResourceUtilization: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch resource utilization data');
    }
    return { ...mockResourceUtilization };
  },
  
  // ===== DEVICE MANAGEMENT =====
  
  /**
   * Get all devices
   */
  getDevices: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch devices');
    }
    return [...mockDevices];
  },
  
  /**
   * Get device by ID
   */
  getDevice: async (id) => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error(`Failed to fetch device with ID ${id}`);
    }
    const device = mockDevices.find(d => d.id === id);
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    return { ...device };
  },
  
  /**
   * Create new device
   */
  createDevice: async (deviceData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to create device');
    }
    const newDevice = {
      id: `device-${Date.now()}`,
      lastSeen: new Date().toISOString(),
      ...deviceData
    };
    // In a real implementation, we would update the mockDevices array
    return { ...newDevice };
  },
  
  /**
   * Update device
   */
  updateDevice: async (id, deviceData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error(`Failed to update device with ID ${id}`);
    }
    const deviceIndex = mockDevices.findIndex(d => d.id === id);
    if (deviceIndex === -1) {
      throw new Error(`Device with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockDevices array
    return { ...mockDevices[deviceIndex], ...deviceData };
  },
  
  /**
   * Delete device
   */
  deleteDevice: async (id) => {
    await delay(600);
    if (simulateErrorRate()) {
      throw new Error(`Failed to delete device with ID ${id}`);
    }
    const deviceIndex = mockDevices.findIndex(d => d.id === id);
    if (deviceIndex === -1) {
      throw new Error(`Device with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockDevices array
    return { success: true };
  },
  
  /**
   * Get device telemetry history
   */
  getDeviceTelemetryHistory: async (deviceId) => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error(`Failed to fetch telemetry history for device ${deviceId}`);
    }
    const telemetry = mockDeviceTelemetryHistory[deviceId];
    if (!telemetry) {
      return []; // Return empty array if no telemetry found
    }
    return [...telemetry];
  },
  
  // ===== PROTOCOL HANDLERS =====
  
  /**
   * Get all protocols
   */
  getProtocols: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch protocols');
    }
    return [...mockProtocols];
  },
  
  /**
   * Get protocol by ID
   */
  getProtocol: async (id) => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error(`Failed to fetch protocol with ID ${id}`);
    }
    const protocol = mockProtocols.find(p => p.id === id);
    if (!protocol) {
      throw new Error(`Protocol with ID ${id} not found`);
    }
    return { ...protocol };
  },
  
  /**
   * Create new protocol
   */
  createProtocol: async (protocolData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to create protocol');
    }
    const newProtocol = {
      id: `protocol-${Date.now()}`,
      ...protocolData
    };
    // In a real implementation, we would update the mockProtocols array
    return { ...newProtocol };
  },
  
  /**
   * Update protocol
   */
  updateProtocol: async (id, protocolData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error(`Failed to update protocol with ID ${id}`);
    }
    const protocolIndex = mockProtocols.findIndex(p => p.id === id);
    if (protocolIndex === -1) {
      throw new Error(`Protocol with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockProtocols array
    return { ...mockProtocols[protocolIndex], ...protocolData };
  },
  
  /**
   * Delete protocol
   */
  deleteProtocol: async (id) => {
    await delay(600);
    if (simulateErrorRate()) {
      throw new Error(`Failed to delete protocol with ID ${id}`);
    }
    const protocolIndex = mockProtocols.findIndex(p => p.id === id);
    if (protocolIndex === -1) {
      throw new Error(`Protocol with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockProtocols array
    return { success: true };
  },
  
  /**
   * Get protocol traffic data
   */
  getProtocolTraffic: async (protocolName) => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error(`Failed to fetch traffic data for protocol ${protocolName}`);
    }
    const traffic = mockProtocolTraffic[protocolName];
    if (!traffic) {
      return []; // Return empty array if no traffic data found
    }
    return [...traffic];
  },
  
  // ===== DATA PROCESSING =====
  
  /**
   * Get all pipelines
   */
  getPipelines: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch pipelines');
    }
    return [...mockPipelines];
  },
  
  /**
   * Get pipeline by ID
   */
  getPipeline: async (id) => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error(`Failed to fetch pipeline with ID ${id}`);
    }
    const pipeline = mockPipelines.find(p => p.id === id);
    if (!pipeline) {
      throw new Error(`Pipeline with ID ${id} not found`);
    }
    return { ...pipeline };
  },
  
  /**
   * Create new pipeline
   */
  createPipeline: async (pipelineData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to create pipeline');
    }
    const newPipeline = {
      id: `pipeline-${Date.now()}`,
      ...pipelineData
    };
    // In a real implementation, we would update the mockPipelines array
    return { ...newPipeline };
  },
  
  /**
   * Update pipeline
   */
  updatePipeline: async (id, pipelineData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error(`Failed to update pipeline with ID ${id}`);
    }
    const pipelineIndex = mockPipelines.findIndex(p => p.id === id);
    if (pipelineIndex === -1) {
      throw new Error(`Pipeline with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockPipelines array
    return { ...mockPipelines[pipelineIndex], ...pipelineData };
  },
  
  /**
   * Delete pipeline
   */
  deletePipeline: async (id) => {
    await delay(600);
    if (simulateErrorRate()) {
      throw new Error(`Failed to delete pipeline with ID ${id}`);
    }
    const pipelineIndex = mockPipelines.findIndex(p => p.id === id);
    if (pipelineIndex === -1) {
      throw new Error(`Pipeline with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockPipelines array
    return { success: true };
  },
  
  /**
   * Get all rules
   */
  getRules: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch rules');
    }
    return [...mockRules];
  },
  
  /**
   * Get rule by ID
   */
  getRule: async (id) => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error(`Failed to fetch rule with ID ${id}`);
    }
    const rule = mockRules.find(r => r.id === id);
    if (!rule) {
      throw new Error(`Rule with ID ${id} not found`);
    }
    return { ...rule };
  },
  
  /**
   * Create new rule
   */
  createRule: async (ruleData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to create rule');
    }
    const newRule = {
      id: `rule-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...ruleData
    };
    // In a real implementation, we would update the mockRules array
    return { ...newRule };
  },
  
  /**
   * Update rule
   */
  updateRule: async (id, ruleData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error(`Failed to update rule with ID ${id}`);
    }
    const ruleIndex = mockRules.findIndex(r => r.id === id);
    if (ruleIndex === -1) {
      throw new Error(`Rule with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockRules array
    return { 
      ...mockRules[ruleIndex], 
      ...ruleData, 
      updatedAt: new Date().toISOString() 
    };
  },
  
  /**
   * Delete rule
   */
  deleteRule: async (id) => {
    await delay(600);
    if (simulateErrorRate()) {
      throw new Error(`Failed to delete rule with ID ${id}`);
    }
    const ruleIndex = mockRules.findIndex(r => r.id === id);
    if (ruleIndex === -1) {
      throw new Error(`Rule with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockRules array
    return { success: true };
  },
  
  // ===== TASK OFFLOADING =====
  
  /**
   * Get all tasks
   */
  getTasks: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch tasks');
    }
    return [...mockTasks];
  },
  
  /**
   * Get task by ID
   */
  getTask: async (id) => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error(`Failed to fetch task with ID ${id}`);
    }
    const task = mockTasks.find(t => t.id === id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return { ...task };
  },
  
  /**
   * Create new task
   */
  createTask: async (taskData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to create task');
    }
    const newTask = {
      id: `task-${Date.now()}`,
      status: 'queued',
      progress: 0,
      startTime: null,
      estimatedEndTime: null,
      resourceUsage: {
        cpu: 0,
        memory: 0,
        gpu: 0
      },
      ...taskData
    };
    // In a real implementation, we would update the mockTasks array
    return { ...newTask };
  },
  
  /**
   * Update task
   */
  updateTask: async (id, taskData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error(`Failed to update task with ID ${id}`);
    }
    const taskIndex = mockTasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockTasks array
    return { ...mockTasks[taskIndex], ...taskData };
  },
  
  /**
   * Delete task
   */
  deleteTask: async (id) => {
    await delay(600);
    if (simulateErrorRate()) {
      throw new Error(`Failed to delete task with ID ${id}`);
    }
    const taskIndex = mockTasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockTasks array
    return { success: true };
  },
  
  /**
   * Cancel task
   */
  cancelTask: async (id) => {
    await delay(500);
    if (simulateErrorRate()) {
      throw new Error(`Failed to cancel task with ID ${id}`);
    }
    const taskIndex = mockTasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
    // In a real implementation, we would update the task status
    return { 
      ...mockTasks[taskIndex], 
      status: 'cancelled' 
    };
  },
  
  /**
   * Get all nodes
   */
  getNodes: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch nodes');
    }
    return [...mockNodes];
  },
  
  /**
   * Get node by ID
   */
  getNode: async (id) => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error(`Failed to fetch node with ID ${id}`);
    }
    const node = mockNodes.find(n => n.id === id);
    if (!node) {
      throw new Error(`Node with ID ${id} not found`);
    }
    return { ...node };
  },
  
  // ===== ALERTS & NOTIFICATIONS =====
  
  /**
   * Get all alerts
   */
  getAlerts: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch alerts');
    }
    // return [...mockAlerts];
    return mockAlerts;
  },
  
  /**
   * Get alert by ID
   */
  getAlert: async (id) => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error(`Failed to fetch alert with ID ${id}`);
    }
    const alert = mockAlerts.find(a => a.id === id);
    if (!alert) {
      throw new Error(`Alert with ID ${id} not found`);
    }
    return { ...alert };
  },
  
  /**
   * Get alert history
   */
  getAlertHistory: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch alert history');
    }
    return mockAlertHistory;
    // return [...mockAlertHistory];
  },
  
  /**
   * Acknowledge alert
   */
  acknowledgeAlert: async (id, userData) => {
    await delay(500);
    if (simulateErrorRate()) {
      throw new Error(`Failed to acknowledge alert with ID ${id}`);
    }
    const alertIndex = mockAlerts.findIndex(a => a.id === id);
    if (alertIndex === -1) {
      throw new Error(`Alert with ID ${id} not found`);
    }
    // In a real implementation, we would update the alert
    return { 
      ...mockAlerts[alertIndex], 
      acknowledged: true,
      acknowledgedBy: userData.username,
      acknowledgedAt: new Date().toISOString()
    };
  },
  
  /**
   * Get all alert rules
   */
  getAlertRules: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch alert rules');
    }
    return mockAlertRules;
    // return [...mockAlertRules];
  },
  
  /**
   * Get alert rule by ID
   */
  getAlertRule: async (id) => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error(`Failed to fetch alert rule with ID ${id}`);
    }
    const rule = mockAlertRules.find(r => r.id === id);
    if (!rule) {
      throw new Error(`Alert rule with ID ${id} not found`);
    }
    return { ...rule };
  },
  
  /**
   * Create new alert rule
   */
  createAlertRule: async (ruleData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to create alert rule');
    }
    const newRule = {
      id: `alert-rule-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...ruleData
    };
    // In a real implementation, we would update the mockAlertRules array
    return { ...newRule };
  },
  
  /**
   * Update alert rule
   */
  updateAlertRule: async (id, ruleData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error(`Failed to update alert rule with ID ${id}`);
    }
    const ruleIndex = mockAlertRules.findIndex(r => r.id === id);
    if (ruleIndex === -1) {
      throw new Error(`Alert rule with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockAlertRules array
    return { 
      ...mockAlertRules[ruleIndex], 
      ...ruleData, 
      updatedAt: new Date().toISOString() 
    };
  },
  
  /**
   * Delete alert rule
   */
  deleteAlertRule: async (id) => {
    await delay(600);
    if (simulateErrorRate()) {
      throw new Error(`Failed to delete alert rule with ID ${id}`);
    }
    const ruleIndex = mockAlertRules.findIndex(r => r.id === id);
    if (ruleIndex === -1) {
      throw new Error(`Alert rule with ID ${id} not found`);
    }
    // In a real implementation, we would update the mockAlertRules array
    return { success: true };
  },
  
  /**
   * Get notification settings
   */
  getNotificationSettings: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch notification settings');
    }
    // return { ...mockNotificationSettings };
    return mockNotificationSettings;
  },
  
  /**
   * Update notification settings
   */
  updateNotificationSettings: async (settingsData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to update notification settings');
    }
    // In a real implementation, we would update the mockNotificationSettings
    return { 
      ...mockNotificationSettings, 
      ...settingsData 
    };
  },
  
  // ===== SYSTEM CONFIGURATION =====
  
  /**
   * Get general settings
   */
  getGeneralSettings: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch general settings');
    }
    return { ...mockGeneralSettings };
  },
  
  /**
   * Update general settings
   */
  updateGeneralSettings: async (settingsData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to update general settings');
    }
    // In a real implementation, we would update the mockGeneralSettings
    return { 
      ...mockGeneralSettings, 
      ...settingsData 
    };
  },
  
  /**
   * Get network settings
   */
  getNetworkSettings: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch network settings');
    }
    return { ...mockNetworkSettings };
  },
  
  /**
   * Update network settings
   */
  updateNetworkSettings: async (settingsData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to update network settings');
    }
    // In a real implementation, we would update the mockNetworkSettings
    return { 
      ...mockNetworkSettings, 
      ...settingsData 
    };
  },
  
  /**
   * Get security settings
   */
  getSecuritySettings: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch security settings');
    }
    return { ...mockSecuritySettings };
  },
  
  /**
   * Update security settings
   */
  updateSecuritySettings: async (settingsData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to update security settings');
    }
    // In a real implementation, we would update the mockSecuritySettings
    return { 
      ...mockSecuritySettings, 
      ...settingsData 
    };
  },
  
  /**
   * Get storage settings
   */
  getStorageSettings: async () => {
    await delay();
    if (simulateErrorRate()) {
      throw new Error('Failed to fetch storage settings');
    }
    return { ...mockStorageSettings };
  },
  
  /**
   * Update storage settings
   */
  updateStorageSettings: async (settingsData) => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to update storage settings');
    }
    // In a real implementation, we would update the mockStorageSettings
    return { 
      ...mockStorageSettings, 
      ...settingsData 
    };
  },
  getDeviceManagementDevices: async () => {
    await delay(300);
    if (simulateErrorRate()){
      throw new Error('Failed to update devices')
    }
    return mockDeviceManagementDevices;
  },
  getDataProcessingDataPipelines: async () => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to update storage settings');
    }
    // In a real implementation, we would update the mockStorageSettings
    return mockDataProcessingPipelines;
  },
  getDataProcessingDataRules: async () => {
    await delay(700);
    if (simulateErrorRate()) {
      throw new Error('Failed to update storage settings');
    }
    // In a real implementation, we would update the mockStorageSettings
    return mockDataProcessingRules
    
  },
  getTaskDetailTask: async() => {
    await delay(100);
    if (simulateErrorRate()){
      throw new Error('Faled to ..')
    }
    return mockTaskDetailTask;
  },
  
  getTaskListTasks: async() => {
    await delay(100);
    if (simulateErrorRate()){
      throw new Error('Faled to ..')
    }
    return mockTaskListTasks;
  },
  
  getDeviceContextDevices: async() => {
    await delay(100);
    if (simulateErrorRate()){
      throw new Error('Faled to ..')
    }
    return mockDeviceContextDevices;
  },
  getSystemSettings: async() => {
    await delay(100);
    if (simulateErrorRate()){
      throw new Error('Faled to ..')
    }
    return mockSystemSettings;
  },
  getSystemNetworkInterfaces: async() => {
    await delay(100);
    if (simulateErrorRate()){
      throw new Error('Faled to ..')
    }
    return mockSystemNetworkInterfaces;
  },
  
  getSecurityUsers: async() => {
    await delay(100);
    if (simulateErrorRate()){
      throw new Error('Faled to ..')
    }
    return mockSecurityUsers;
  },
  getSecurityCertificates: async() => {
    await delay(100);
    if (simulateErrorRate()){
      throw new Error('Faled to ..')
    }
    return mockSecurityCertificates;
  },
  getSecuritySettings: async () => {
    await delay(100);
      if (simulateErrorRate()){
        throw new Error('Faled to ..')
      }
      return mockSecuritySettings;
    },

  getSystemNetworkInterfaces: async () => {
    await delay(100);
      if (simulateErrorRate()){
        throw new Error('Faled to ..')
      }
      return mockSystemNetworkInterfaces;
    },

  getSystemNetworkSettings: async () => {
  await delay(100);
    if (simulateErrorRate()){
      throw new Error('Faled to ..')
    }
    return mockSystemNetworkSettings;
  },
  
  getStorageVolumes: async () => {
    await delay(100);
      if (simulateErrorRate()){
        throw new Error('Faled to ..')
      }
      return mockStorageVolumes;
    },

    getStorageDatabases: async () => {
      await delay(100);
        if (simulateErrorRate()){
          throw new Error('Faled to ..')
        }
        return mockStorageDatabases;
      },

      getStorageSettings: async () => {
        await delay(100);
          if (simulateErrorRate()){
            throw new Error('Faled to ..')
          }
          return mockStorageSettings;
        },
  
getDataPipelineNodes: async () => {
  await delay(100);
    if (simulateErrorRate()){
      throw new Error('Faled to ..')
    }
    return mockDataPipelinesNodes;
  },
  getDataPipelineEdges: async () => {
    await delay(100);
      if (simulateErrorRate()){
        throw new Error('Faled to ..')
      }
      return mockDataPipelineEdges;
    },
    
};

export default api;



// // Base API URL - would come from environment variables in production
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// // Helper for making fetch requests with consistent error handling
// const fetchWithErrorHandling = async (url, options = {}) => {
//   try {
//     const response = await fetch(url, {
//       ...options,
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('API request failed:', error);
//     throw error;
//   }
// };

// // API endpoints for system overview
// export const systemApi = {
//   getSystemMetrics: async () => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/system/metrics`);
//   },
  
//   getSystemStatus: async () => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/system/status`);
//   },
  
//   getProtocolDistribution: async () => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/system/protocols/distribution`);
//   },
  
//   getResourceUtilization: async (period = '24h') => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/system/resources?period=${period}`);
//   }
// };

// // API endpoints for device management
// export const deviceApi = {
//   getDevices: async (params = {}) => {
//     const queryParams = new URLSearchParams(params).toString();
//     return fetchWithErrorHandling(`${API_BASE_URL}/devices?${queryParams}`);
//   },
  
//   getDeviceById: async (deviceId) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/devices/${deviceId}`);
//   },
  
//   createDevice: async (deviceData) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/devices`, {
//       method: 'POST',
//       body: JSON.stringify(deviceData),
//     });
//   },
  
//   updateDevice: async (deviceId, deviceData) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/devices/${deviceId}`, {
//       method: 'PUT',
//       body: JSON.stringify(deviceData),
//     });
//   },
  
//   deleteDevice: async (deviceId) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/devices/${deviceId}`, {
//       method: 'DELETE',
//     });
//   }
// };

// // API endpoints for protocol handlers
// export const protocolApi = {
//   getProtocolConfigurations: async () => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/protocols`);
//   },
  
//   updateProtocolConfiguration: async (protocol, config) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/protocols/${protocol}`, {
//       method: 'PUT',
//       body: JSON.stringify(config),
//     });
//   },
  
//   getProtocolTraffic: async (protocol, period = '1h') => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/protocols/${protocol}/traffic?period=${period}`);
//   }
// };

// // API endpoints for data processing
// export const dataProcessingApi = {
//   getPipelines: async () => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/data/pipelines`);
//   },
  
//   createPipeline: async (pipelineData) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/data/pipelines`, {
//       method: 'POST',
//       body: JSON.stringify(pipelineData),
//     });
//   },
  
//   getRules: async () => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/data/rules`);
//   },
  
//   createRule: async (ruleData) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/data/rules`, {
//       method: 'POST',
//       body: JSON.stringify(ruleData),
//     });
//   }
// };

// // API endpoints for task offloading
// export const taskOffloadingApi = {
//   getTasks: async (status = 'all') => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/tasks?status=${status}`);
//   },
  
//   getTaskById: async (taskId) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/tasks/${taskId}`);
//   },
  
//   createTask: async (taskData) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/tasks`, {
//       method: 'POST',
//       body: JSON.stringify(taskData),
//     });
//   },
  
//   cancelTask: async (taskId) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/tasks/${taskId}/cancel`, {
//       method: 'POST',
//     });
//   },
  
//   getResourceAvailability: async () => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/tasks/resources`);
//   }
// };

// // API endpoints for system configuration
// export const configApi = {
//   getSystemConfig: async () => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/config`);
//   },
  
//   updateSystemConfig: async (configData) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/config`, {
//       method: 'PUT',
//       body: JSON.stringify(configData),
//     });
//   }
// };

// // API endpoints for alerts & notifications
// export const alertsApi = {
//   getAlerts: async (status = 'active') => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/alerts?status=${status}`);
//   },
  
//   acknowledgeAlert: async (alertId) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/alerts/${alertId}/acknowledge`, {
//       method: 'POST',
//     });
//   },
  
//   getAlertRules: async () => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/alerts/rules`);
//   },
  
//   createAlertRule: async (ruleData) => {
//     return fetchWithErrorHandling(`${API_BASE_URL}/alerts/rules`, {
//       method: 'POST',
//       body: JSON.stringify(ruleData),
//     });
//   }
// };

// // Websocket connection for real-time updates
// export const connectWebSocket = (onMessage, onError) => {
//   const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
//   const wsBaseUrl = process.env.REACT_APP_WS_BASE_URL || 
//     `${wsProtocol}//${window.location.host}/ws`;
  
//   const ws = new WebSocket(wsBaseUrl);
  
//   ws.onopen = () => {
//     console.log('WebSocket connection established');
//   };
  
//   ws.onmessage = (event) => {
//     try {
//       const data = JSON.parse(event.data);
//       onMessage(data);
//     } catch (error) {
//       console.error('Error parsing WebSocket message:', error);
//     }
//   };
  
//   ws.onerror = (error) => {
//     console.error('WebSocket error:', error);
//     if (onError) onError(error);
//   };
  
//   ws.onclose = () => {
//     console.log('WebSocket connection closed');
//   };
  
//   return {
//     send: (data) => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify(data));
//       } else {
//         console.error('WebSocket is not open');
//       }
//     },
//     close: () => {
//       ws.close();
//     }
//   };
// };

// export default {
//   system: systemApi,
//   devices: deviceApi,
//   protocols: protocolApi,
//   dataProcessing: dataProcessingApi,
//   taskOffloading: taskOffloadingApi,
//   config: configApi,
//   alerts: alertsApi,
//   connectWebSocket
// };

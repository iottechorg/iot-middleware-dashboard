// src/services/api.js

// Import dynamic data generators
import { 
    generateSystemSettings,
    generateSystemNetworkInterfaces,
    generateSystemNetworkSettings,
    generateSecurityUsers,
    generateSecurityCertificates,
    generateSecuritySettings,
    generateStorageVolumes,
    generateStorageDatabases,
    generateStorageSettings,
    generateDeviceManagementDevices,
    generateDeviceContextDevices,
    generateTaskListTasks,
    generateTaskDetailTask,
    generateDataProcessingPipelines,
    generateDataProcessingRules,
    generateDataPipelineNodes,
    generateDataPipelineEdges
  } from './mockData/dynamicData';
  

  import {
    mockSystemMetrics,
    mockDeviceMetrics,
    mockProtocolDistribution,
    mockResourceUtilization
  } from './old_mockData/overview';
 
  // Helper function to simulate API delay
  const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Helper to simulate API errors
  const simulateErrorRate = (errorRate = 0.05) => {
    return Math.random() < errorRate;
  };
  
  // API Service Object
  const api = {
    // ===== SYSTEM CONFIGURATION =====
    
    /**
     * Get system settings
     */
    getSystemSettings: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch system settings');
      }
      return generateSystemSettings();
    },
    
    /**
     * Get system network interfaces
     */
    getSystemNetworkInterfaces: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch network interfaces');
      }
      return generateSystemNetworkInterfaces();
    },
    
    /**
     * Get system network settings
     */
    getSystemNetworkSettings: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch network settings');
      }
      return generateSystemNetworkSettings();
    },
    
    // ===== SECURITY SETTINGS =====
    
    /**
     * Get security users
     */
    getSecurityUsers: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch security users');
      }
      return generateSecurityUsers();
    },
    
    /**
     * Get security certificates
     */
    getSecurityCertificates: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch security certificates');
      }
      return generateSecurityCertificates();
    },
    
    /**
     * Get security settings
     */
    getSecuritySettings: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch security settings');
      }
      return generateSecuritySettings();
    },
    
    // ===== STORAGE SETTINGS =====
    
    /**
     * Get storage volumes
     */
    getStorageVolumes: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch storage volumes');
      }
      return generateStorageVolumes();
    },
    
    /**
     * Get storage databases
     */
    getStorageDatabases: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch storage databases');
      }
      return generateStorageDatabases();
    },
    
    /**
     * Get storage settings
     */
    getStorageSettings: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch storage settings');
      }
      return generateStorageSettings();
    },
    
    // ===== DEVICE MANAGEMENT =====
    
    /**
     * Get device management devices
     */
    getDeviceManagementDevices: async () => {
      await delay(300);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch device management devices');
      }
      return generateDeviceManagementDevices();
    },
    
    /**
     * Get device context devices
     */
    getDeviceContextDevices: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch device context devices');
      }
      return generateDeviceContextDevices();
    },
    
    // ===== TASK MANAGEMENT =====
    
    /**
     * Get task list
     */
    getTaskListTasks: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch task list');
      }
      return generateTaskListTasks();
    },
    
    /**
     * Get task detail
     */
    getTaskDetailTask: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch task detail');
      }
      return generateTaskDetailTask();
    },
    
    // ===== DATA PROCESSING =====
    
    /**
     * Get data pipelines
     */
    getDataProcessingDataPipelines: async () => {
      await delay(700);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch data pipelines');
      }
      return generateDataProcessingPipelines();
    },
    
    /**
     * Get data rules
     */
    getDataProcessingDataRules: async () => {
      await delay(700);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch data rules');
      }
      return generateDataProcessingRules();
    },
    
    /**
     * Get data pipeline nodes
     */
    getDataPipelineNodes: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch data pipeline nodes');
      }
      return generateDataPipelineNodes();
    },
    
    /**
     * Get data pipeline edges
     */
    getDataPipelineEdges: async () => {
      await delay(100);
      if (simulateErrorRate()) {
        throw new Error('Failed to fetch data pipeline edges');
      }
      return generateDataPipelineEdges();
    },
    
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
    
    // Keep other API methods that use static data (removed for brevity)
    // These would include the device, protocol, pipeline, rule, task, 
    // node, alert, and notification APIs from the original file
  };
  
  export default api;
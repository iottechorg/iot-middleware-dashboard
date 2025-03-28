// src/services/mockData/systemSettingsGenerator.js
import { 
    getRandomInt, 
    getRandomElement, 
    getRandomStatus 
  } from './utils';
  
  // Dynamic System Settings
  export const generateSystemSettings = () => {
    return {
      general: {
        systemName: 'IoT Middleware Platform',
        description: 'Edge-to-Cloud IoT data processing and management platform',
        timezone: 'UTC',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24hour',
        language: 'en-US',
        adminEmail: 'admin@example.com'
      },
      performance: {
        maxThreads: getRandomInt(4, 16),
        taskQueueSize: getRandomInt(50, 200),
        dataRetentionDays: getRandomInt(30, 120),
        enableCaching: Math.random() > 0.2, // 80% chance of true
        cacheTTL: getRandomInt(1800, 7200),
        enableCompression: Math.random() > 0.2,
        loggingLevel: getRandomElement(['debug', 'info', 'warn', 'error'])
      },
      maintenance: {
        enableAutoUpdates: Math.random() > 0.3,
        updateCheckInterval: getRandomElement(['hourly', 'daily', 'weekly']),
        maintenanceWindow: {
          enabled: Math.random() > 0.2,
          dayOfWeek: getRandomElement(['sunday', 'monday', 'saturday']),
          startTime: `${String(getRandomInt(0, 4)).padStart(2, '0')}:${String(getRandomInt(0, 59)).padStart(2, '0')}`,
          duration: getRandomInt(60, 240)
        },
        backupSchedule: {
          enabled: Math.random() > 0.1,
          frequency: getRandomElement(['daily', 'weekly']),
          time: `${String(getRandomInt(0, 4)).padStart(2, '0')}:${String(getRandomInt(0, 59)).padStart(2, '0')}`,
          retentionCount: getRandomInt(3, 14)
        }
      }
    };
  };
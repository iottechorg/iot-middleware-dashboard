// src/services/mockData/alerts.js

export const mockAlerts = [
    {
      id: 'alert-1',
      title: 'High Temperature Warning',
      message: 'Temperature sensor in Building A reporting readings above threshold (30°C)',
      severity: 'warning',
      source: 'device-1',
      sourceType: 'device',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      acknowledged: false,
      category: 'environmental',
      relatedDevices: ['device-1'],
      actions: ['investigate', 'dismiss']
    },
    {
      id: 'alert-2',
      title: 'Connection Lost',
      message: 'Device "Smart Light #1" connection lost',
      severity: 'error',
      source: 'device-4',
      sourceType: 'device',
      timestamp: new Date(Date.now() - 12 * 3600000).toISOString(),
      acknowledged: true,
      acknowledgedBy: 'system-admin',
      acknowledgedAt: new Date(Date.now() - 11.5 * 3600000).toISOString(),
      category: 'connectivity',
      relatedDevices: ['device-4'],
      actions: ['restart', 'troubleshoot', 'dismiss']
    },
    {
      id: 'alert-3',
      title: 'Low Disk Space',
      message: 'Cloud Server 2 is running low on disk space (25% remaining)',
      severity: 'warning',
      source: 'cloud-node-2',
      sourceType: 'node',
      timestamp: new Date(Date.now() - 6 * 3600000).toISOString(),
      acknowledged: false,
      category: 'system',
      relatedDevices: [],
      actions: ['cleanup', 'expand-storage', 'dismiss']
    },
    {
      id: 'alert-4',
      title: 'Task Failed',
      message: 'Database backup task failed due to network connection issue',
      severity: 'error',
      source: 'task-4',
      sourceType: 'task',
      timestamp: new Date(Date.now() - 5400000).toISOString(),
      acknowledged: true,
      acknowledgedBy: 'system-admin',
      acknowledgedAt: new Date(Date.now() - 5100000).toISOString(),
      category: 'task',
      relatedDevices: [],
      actions: ['retry', 'troubleshoot', 'dismiss']
    },
    {
      id: 'alert-5',
      title: 'Motion Detected',
      message: 'Motion detected in restricted area outside business hours',
      severity: 'critical',
      source: 'rule-3',
      sourceType: 'rule',
      timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
      acknowledged: true,
      acknowledgedBy: 'security-admin',
      acknowledgedAt: new Date(Date.now() - 1.9 * 3600000).toISOString(),
      category: 'security',
      relatedDevices: ['device-2'],
      actions: ['view-camera', 'dispatch-security', 'dismiss']
    },
    {
      id: 'alert-6',
      title: 'System Update Available',
      message: 'New system update v2.5.1 is available for installation',
      severity: 'info',
      source: 'system',
      sourceType: 'system',
      timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
      acknowledged: false,
      category: 'maintenance',
      relatedDevices: [],
      actions: ['update-now', 'schedule-update', 'dismiss']
    },
    {
      id: 'alert-7',
      title: 'Battery Low',
      message: 'Temperature Sensor #2 battery level is below 20%',
      severity: 'warning',
      source: 'device-6',
      sourceType: 'device',
      timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
      acknowledged: false,
      category: 'device-health',
      relatedDevices: ['device-6'],
      actions: ['replace-battery', 'dismiss']
    }
  ];
  
  // Alert history (includes resolved alerts)
  export  const mockAlertHistory = [
    ...mockAlerts,
    {
      id: 'alert-8',
      title: 'High CPU Usage',
      message: 'Cloud Server 1 experiencing high CPU usage (92%)',
      severity: 'warning',
      source: 'cloud-node-1',
      sourceType: 'node',
      timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
      acknowledged: true,
      acknowledgedBy: 'system-admin',
      acknowledgedAt: new Date(Date.now() - 47.5 * 3600000).toISOString(),
      resolved: true,
      resolvedAt: new Date(Date.now() - 46 * 3600000).toISOString(),
      resolution: 'auto-scaled',
      category: 'performance',
      relatedDevices: [],
      actions: []
    },
    {
      id: 'alert-9',
      title: 'Device Firmware Update',
      message: 'Gateway #1 firmware updated to version 3.0.1',
      severity: 'info',
      source: 'device-3',
      sourceType: 'device',
      timestamp: new Date(Date.now() - 72 * 3600000).toISOString(),
      acknowledged: true,
      acknowledgedBy: 'system',
      acknowledgedAt: new Date(Date.now() - 72 * 3600000).toISOString(),
      resolved: true,
      resolvedAt: new Date(Date.now() - 72 * 3600000).toISOString(),
      resolution: 'auto-resolved',
      category: 'maintenance',
      relatedDevices: ['device-3'],
      actions: []
    },
    {
      id: 'alert-10',
      title: 'Node Offline',
      message: 'Cloud Server 3 is unreachable',
      severity: 'critical',
      source: 'cloud-node-3',
      sourceType: 'node',
      timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
      acknowledged: true,
      acknowledgedBy: 'network-admin',
      acknowledgedAt: new Date(Date.now() - 3.9 * 3600000).toISOString(),
      resolved: false,
      category: 'connectivity',
      relatedDevices: [],
      actions: ['restart', 'troubleshoot', 'dismiss']
    }
  ];
  
  // Alert rules
  export const mockAlertRules = [
    {
      id: 'alert-rule-1',
      name: 'High Temperature Alert',
      description: 'Trigger alert when temperature exceeds threshold',
      enabled: true,
      conditions: [
        { metric: 'temperature', operator: 'greaterThan', value: 30 }
      ],
      devices: ['device-1', 'device-6'],
      deviceGroups: ['temperature-sensors'],
      severity: 'warning',
      message: 'Temperature sensor reporting readings above threshold ({value}°C)',
      category: 'environmental',
      actions: [
        { type: 'notification', target: 'admin', template: 'default' },
        { type: 'email', target: 'facility-manager@example.com', template: 'temperature-alert' }
      ],
      createdAt: '2023-03-20T10:30:00Z',
      updatedAt: '2023-03-25T14:45:00Z'
    },
    {
      id: 'alert-rule-2',
      name: 'Device Offline Alert',
      description: 'Trigger alert when device goes offline',
      enabled: true,
      conditions: [
        { metric: 'status', operator: 'equals', value: 'offline' },
        { metric: 'offlineDuration', operator: 'greaterThan', value: 300 } // 5 minutes
      ],
      devices: [],
      deviceGroups: ['all-devices'],
      severity: 'error',
      message: 'Device "{deviceName}" connection lost',
      category: 'connectivity',
      actions: [
        { type: 'notification', target: 'admin', template: 'default' },
        { type: 'sms', target: '+1234567890', template: 'device-offline' }
      ],
      createdAt: '2023-03-15T09:20:00Z',
      updatedAt: '2023-04-10T11:35:00Z'
    },
    {
      id: 'alert-rule-3',
      name: 'Low Disk Space Alert',
      description: 'Trigger alert when disk space is low',
      enabled: true,
      conditions: [
        { metric: 'storage.available', operator: 'lessThan', value: 30, unit: 'percent' }
      ],
      nodes: ['cloud-node-1', 'cloud-node-2', 'cloud-node-3'],
      severity: 'warning',
      message: '{nodeName} is running low on disk space ({value}% remaining)',
      category: 'system',
      actions: [
        { type: 'notification', target: 'admin', template: 'default' },
        { type: 'webhook', target: 'https://example.com/api/alerts', template: 'disk-space' }
      ],
      createdAt: '2023-02-25T13:40:00Z',
      updatedAt: '2023-02-25T13:40:00Z'
    },
    {
      id: 'alert-rule-4',
      name: 'Battery Low Alert',
      description: 'Trigger alert when device battery is low',
      enabled: true,
      conditions: [
        { metric: 'batteryLevel', operator: 'lessThan', value: 20 }
      ],
      devices: [],
      deviceGroups: ['battery-powered'],
      severity: 'warning',
      message: '{deviceName} battery level is below {value}%',
      category: 'device-health',
      actions: [
        { type: 'notification', target: 'admin', template: 'default' },
        { type: 'email', target: 'maintenance@example.com', template: 'battery-alert' }
      ],
      createdAt: '2023-04-05T15:10:00Z',
      updatedAt: '2023-04-05T15:10:00Z'
    },
    {
      id: 'alert-rule-5',
      name: 'High CPU Usage Alert',
      description: 'Trigger alert when CPU usage is high',
      enabled: true,
      conditions: [
        { metric: 'cpu.used', operator: 'greaterThan', value: 90, unit: 'percent' },
        { metric: 'duration', operator: 'greaterThan', value: 300 } // 5 minutes
      ],
      nodes: ['cloud-node-1', 'cloud-node-2', 'cloud-node-3', 'edge-node-1', 'edge-node-2'],
      severity: 'warning',
      message: '{nodeName} experiencing high CPU usage ({value}%)',
      category: 'performance',
      actions: [
        { type: 'notification', target: 'admin', template: 'default' },
        { type: 'autoscale', target: 'resource', template: 'cpu-scale' }
      ],
      createdAt: '2023-03-10T11:30:00Z',
      updatedAt: '2023-03-12T09:15:00Z'
    }
  ];
  
  // Notification settings
  export const mockNotificationSettings = {
    channels: [
      {
        id: 'email',
        name: 'Email',
        enabled: true,
        defaultRecipients: ['admin@example.com', 'alerts@example.com'],
        minSeverity: 'warning',
        throttling: {
          enabled: true,
          maxPerHour: 10,
          groupSimilar: true
        },
        templates: {
          'default': {
            subject: 'IoT Alert: {severity} - {title}',
            body: '{message}\n\nTime: {timestamp}\nSeverity: {severity}\nCategory: {category}'
          },
          'temperature-alert': {
            subject: 'Temperature Alert: {title}',
            body: 'Temperature sensor reading: {value}°C\nLocation: {location}\n\n{message}'
          }
        }
      },
      {
        id: 'sms',
        name: 'SMS',
        enabled: true,
        defaultRecipients: ['+1234567890'],
        minSeverity: 'error',
        throttling: {
          enabled: true,
          maxPerHour: 5,
          groupSimilar: true
        },
        templates: {
          'default': {
            body: 'IoT Alert: {severity} - {title} - {message}'
          }
        }
      },
      {
        id: 'webhook',
        name: 'Webhook',
        enabled: true,
        endpoints: ['https://example.com/api/alerts'],
        minSeverity: 'info',
        throttling: {
          enabled: false
        },
        templates: {
          'default': {
            format: 'json',
            payload: '{"title":"{title}","message":"{message}","severity":"{severity}","timestamp":"{timestamp}","source":"{source}"}'
          }
        }
      },
      {
        id: 'push',
        name: 'Push Notification',
        enabled: false,
        minSeverity: 'warning',
        throttling: {
          enabled: true,
          maxPerHour: 20,
          groupSimilar: true
        },
        templates: {
          'default': {
            title: '{severity}: {title}',
            body: '{message}'
          }
        }
      }
    ],
    schedules: [
      {
        id: 'business-hours',
        name: 'Business Hours',
        enabled: true,
        timezone: 'America/New_York',
        periods: [
          { days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], startTime: '09:00', endTime: '17:00' }
        ],
        channels: ['email', 'webhook'],
        minSeverity: 'info'
      },
      {
        id: 'after-hours',
        name: 'After Hours',
        enabled: true,
        timezone: 'America/New_York',
        periods: [
          { days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], startTime: '17:00', endTime: '09:00' },
          { days: ['saturday', 'sunday'], startTime: '00:00', endTime: '23:59' }
        ],
        channels: ['sms', 'email', 'webhook'],
        minSeverity: 'error'
      },
      {
        id: 'maintenance-window',
        name: 'Maintenance Window',
        enabled: false,
        timezone: 'America/New_York',
        periods: [
          { days: ['sunday'], startTime: '01:00', endTime: '05:00' }
        ],
        channels: ['email', 'webhook'],
        minSeverity: 'critical'
      }
    ],
    globalSettings: {
      retention: {
        resolvedAlerts: 90, // days
        acknowledgedAlerts: 30 // days
      },
      autoAcknowledge: {
        enabled: true,
        delay: 1440 // minutes (24 hours)
      },
      autoEscalate: {
        enabled: true,
        unacknowledgedDelay: 60, // minutes
        targetSeverity: 'critical'
      }
    },
    preferences:{criticalAlerts: true,
      warningAlerts: true,
      infoAlerts: false,
      systemUpdates: true,
      securityEvents: true,
      deviceEvents: false,
      dailyDigest: true}
  };
  
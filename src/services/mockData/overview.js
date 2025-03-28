// src/services/mockData/overview.js

// System metrics for overview dashboard
export const  mockSystemMetrics = {
    status: 'healthy',
    uptime: 86400 * 15, // 15 days in seconds
    cpu: { usage: 42, cores: 8 },
    memory: { usage: 68, total: 32768 }, // in MB
    storage: { usage: 56, total: 1024 }, // in GB
    network: { tx: 42.5, rx: 68.2 } // in Mbps
  };
  
  // Device metrics for overview dashboard
  export const  mockDeviceMetrics = {
    total: 546,
    online: 498,
    offline: 48,
    warning: 12,
    byType: {
      sensor: 312,
      actuator: 145,
      gateway: 89,
    }
  };
  
  // Protocol distribution for overview dashboard
  export const  mockProtocolDistribution = [
    { name: 'MQTT', value: 38 },
    { name: 'CoAP', value: 21 },
    { name: 'HTTP', value: 17 },
    { name: 'Modbus', value: 12 },
    { name: 'BLE', value: 8 },
    { name: 'Zigbee', value: 4 }
  ];
  
  // Resource utilization for overview dashboard
  export const  mockResourceUtilization = {
    cpu: [
      { time: '00:00', value: 32 },
      { time: '01:00', value: 28 },
      { time: '02:00', value: 27 },
      { time: '03:00', value: 26 },
      { time: '04:00', value: 25 },
      { time: '05:00', value: 28 },
      { time: '06:00', value: 35 },
      { time: '07:00', value: 45 },
      { time: '08:00', value: 52 },
      { time: '09:00', value: 58 },
      { time: '10:00', value: 62 },
      { time: '11:00', value: 65 },
      { time: '12:00', value: 61 },
      { time: '13:00', value: 63 },
      { time: '14:00', value: 62 },
      { time: '15:00', value: 58 },
      { time: '16:00', value: 52 },
      { time: '17:00', value: 48 },
      { time: '18:00', value: 42 },
      { time: '19:00', value: 38 },
      { time: '20:00', value: 35 },
      { time: '21:00', value: 32 },
      { time: '22:00', value: 30 },
      { time: '23:00', value: 28 }
    ],
    memory: [
      { time: '00:00', value: 58 },
      { time: '01:00', value: 57 },
      { time: '02:00', value: 57 },
      { time: '03:00', value: 56 },
      { time: '04:00', value: 56 },
      { time: '05:00', value: 56 },
      { time: '06:00', value: 58 },
      { time: '07:00', value: 62 },
      { time: '08:00', value: 65 },
      { time: '09:00', value: 68 },
      { time: '10:00', value: 72 },
      { time: '11:00', value: 74 },
      { time: '12:00', value: 73 },
      { time: '13:00', value: 72 },
      { time: '14:00', value: 71 },
      { time: '15:00', value: 70 },
      { time: '16:00', value: 68 },
      { time: '17:00', value: 66 },
      { time: '18:00', value: 64 },
      { time: '19:00', value: 62 },
      { time: '20:00', value: 60 },
      { time: '21:00', value: 59 },
      { time: '22:00', value: 58 },
      { time: '23:00', value: 58 }
    ],
    storage: [
      { time: '00:00', value: 52 },
      { time: '01:00', value: 52 },
      { time: '02:00', value: 52 },
      { time: '03:00', value: 52.1 },
      { time: '04:00', value: 52.1 },
      { time: '05:00', value: 52.2 },
      { time: '06:00', value: 52.4 },
      { time: '07:00', value: 52.8 },
      { time: '08:00', value: 53.2 },
      { time: '09:00', value: 53.8 },
      { time: '10:00', value: 54.3 },
      { time: '11:00', value: 54.8 },
      { time: '12:00', value: 55.1 },
      { time: '13:00', value: 55.4 },
      { time: '14:00', value: 55.6 },
      { time: '15:00', value: 55.8 },
      { time: '16:00', value: 55.9 },
      { time: '17:00', value: 56 },
      { time: '18:00', value: 56 },
      { time: '19:00', value: 56.1 },
      { time: '20:00', value: 56.1 },
      { time: '21:00', value: 56.1 },
      { time: '22:00', value: 56.1 },
      { time: '23:00', value: 56.2 }
    ]
  };
  
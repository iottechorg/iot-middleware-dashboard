// src/services/mockData/devices.js

const mockDevices = [
    {
      id: 'device-1',
      name: 'Temperature Sensor #1',
      type: 'sensor',
      protocol: 'MQTT',
      status: 'online',
      location: 'Building A',
      lastSeen: new Date().toISOString(),
      firmware: '1.2.0',
      batteryLevel: 87,
      tags: ['temperature', 'indoor'],
      metadata: {
        model: 'TS-2000',
        manufacturer: 'SensorTech',
        serialNumber: 'ST-TS2K-12345'
      },
      telemetry: {
        temperature: 23.5,
        humidity: 45.2,
        batteryVoltage: 3.7
      }
    },
    {
      id: 'device-2',
      name: 'Motion Detector #1',
      type: 'sensor',
      protocol: 'Zigbee',
      status: 'online',
      location: 'Building B',
      lastSeen: new Date().toISOString(),
      firmware: '2.1.5',
      batteryLevel: 92,
      tags: ['motion', 'security'],
      metadata: {
        model: 'MD-100',
        manufacturer: 'SecuTech',
        serialNumber: 'ST-MD100-54321'
      },
      telemetry: {
        motionDetected: false,
        batteryVoltage: 3.8
      }
    },
    {
      id: 'device-3',
      name: 'Gateway #1',
      type: 'gateway',
      protocol: 'MQTT',
      status: 'online',
      location: 'Server Room',
      lastSeen: new Date().toISOString(),
      firmware: '3.0.1',
      batteryLevel: null,
      tags: ['gateway', 'primary'],
      metadata: {
        model: 'GW-5000',
        manufacturer: 'NetConnect',
        serialNumber: 'NC-GW5K-98765'
      },
      telemetry: {
        cpuLoad: 24.3,
        memoryUsage: 512,
        temperature: 40.2,
        connectedDevices: 12
      }
    },
    {
      id: 'device-4',
      name: 'Smart Light #1',
      type: 'actuator',
      protocol: 'Zigbee',
      status: 'offline',
      location: 'Building A',
      lastSeen: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      firmware: '1.0.4',
      batteryLevel: null,
      tags: ['light', 'indoor'],
      metadata: {
        model: 'SL-200',
        manufacturer: 'LightSmart',
        serialNumber: 'LS-SL200-45678'
      },
      telemetry: {
        state: 'off',
        brightness: 0,
        powerConsumption: 0
      }
    },
    {
      id: 'device-5',
      name: 'HVAC Controller #1',
      type: 'actuator',
      protocol: 'Modbus',
      status: 'online',
      location: 'Building B',
      lastSeen: new Date().toISOString(),
      firmware: '2.3.1',
      batteryLevel: null,
      tags: ['hvac', 'climate'],
      metadata: {
        model: 'HC-3000',
        manufacturer: 'ClimateControl',
        serialNumber: 'CC-HC3K-56789'
      },
      telemetry: {
        mode: 'cooling',
        setTemperature: 21.5,
        currentTemperature: 23.2,
        fanSpeed: 2,
        powerConsumption: 1250
      }
    },
    {
      id: 'device-6',
      name: 'Temperature Sensor #2',
      type: 'sensor',
      protocol: 'BLE',
      status: 'online',
      location: 'Building C',
      lastSeen: new Date().toISOString(),
      firmware: '1.1.2',
      batteryLevel: 65,
      tags: ['temperature', 'outdoor'],
      metadata: {
        model: 'TS-1000',
        manufacturer: 'SensorTech',
        serialNumber: 'ST-TS1K-67890'
      },
      telemetry: {
        temperature: 18.2,
        humidity: 72.1,
        batteryVoltage: 3.3
      }
    }
  ];
  
  export default mockDevices;
// src/services/mockData/telemetry.js

export const mockDeviceTelemetryHistory = {
    'device-1': [
      { timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), temperature: 22.8, humidity: 48.5 },
      { timestamp: new Date(Date.now() - 3600000 * 22).toISOString(), temperature: 22.6, humidity: 48.2 },
      { timestamp: new Date(Date.now() - 3600000 * 20).toISOString(), temperature: 22.3, humidity: 47.8 },
      { timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), temperature: 22.1, humidity: 47.5 },
      { timestamp: new Date(Date.now() - 3600000 * 16).toISOString(), temperature: 22.0, humidity: 47.0 },
      { timestamp: new Date(Date.now() - 3600000 * 14).toISOString(), temperature: 22.3, humidity: 46.8 },
      { timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), temperature: 22.8, humidity: 46.5 },
      { timestamp: new Date(Date.now() - 3600000 * 10).toISOString(), temperature: 23.2, humidity: 46.0 },
      { timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), temperature: 23.4, humidity: 45.8 },
      { timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), temperature: 23.5, humidity: 45.6 },
      { timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), temperature: 23.6, humidity: 45.4 },
      { timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), temperature: 23.5, humidity: 45.3 },
      { timestamp: new Date().toISOString(), temperature: 23.5, humidity: 45.2 }
    ],
    'device-2': [
      { timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), motionDetected: true, batteryVoltage: 3.9 },
      { timestamp: new Date(Date.now() - 3600000 * 22).toISOString(), motionDetected: false, batteryVoltage: 3.9 },
      { timestamp: new Date(Date.now() - 3600000 * 20).toISOString(), motionDetected: false, batteryVoltage: 3.9 },
      { timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), motionDetected: true, batteryVoltage: 3.9 },
      { timestamp: new Date(Date.now() - 3600000 * 16).toISOString(), motionDetected: false, batteryVoltage: 3.9 },
      { timestamp: new Date(Date.now() - 3600000 * 14).toISOString(), motionDetected: false, batteryVoltage: 3.9 },
      { timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), motionDetected: true, batteryVoltage: 3.9 },
      { timestamp: new Date(Date.now() - 3600000 * 10).toISOString(), motionDetected: false, batteryVoltage: 3.9 },
      { timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), motionDetected: false, batteryVoltage: 3.8 },
      { timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), motionDetected: true, batteryVoltage: 3.8 },
      { timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), motionDetected: false, batteryVoltage: 3.8 },
      { timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), motionDetected: false, batteryVoltage: 3.8 },
      { timestamp: new Date().toISOString(), motionDetected: false, batteryVoltage: 3.8 }
    ],
    'device-3': [
      { timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), cpuLoad: 18.7, memoryUsage: 420, temperature: 39.5, connectedDevices: 10 },
      { timestamp: new Date(Date.now() - 3600000 * 20).toISOString(), cpuLoad: 19.2, memoryUsage: 435, temperature: 39.8, connectedDevices: 10 },
      { timestamp: new Date(Date.now() - 3600000 * 16).toISOString(), cpuLoad: 22.5, memoryUsage: 480, temperature: 40.1, connectedDevices: 11 },
      { timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), cpuLoad: 25.8, memoryUsage: 510, temperature: 40.5, connectedDevices: 12 },
      { timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), cpuLoad: 24.1, memoryUsage: 505, temperature: 40.3, connectedDevices: 12 },
      { timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), cpuLoad: 24.5, memoryUsage: 510, temperature: 40.2, connectedDevices: 12 },
      { timestamp: new Date().toISOString(), cpuLoad: 24.3, memoryUsage: 512, temperature: 40.2, connectedDevices: 12 }
    ],
    'device-5': [
      { timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), mode: 'heating', setTemperature: 22.0, currentTemperature: 20.5, fanSpeed: 1, powerConsumption: 1500 },
      { timestamp: new Date(Date.now() - 3600000 * 20).toISOString(), mode: 'heating', setTemperature: 22.0, currentTemperature: 21.2, fanSpeed: 1, powerConsumption: 1300 },
      { timestamp: new Date(Date.now() - 3600000 * 16).toISOString(), mode: 'heating', setTemperature: 22.0, currentTemperature: 21.8, fanSpeed: 1, powerConsumption: 900 },
      { timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), mode: 'off', setTemperature: 22.0, currentTemperature: 22.2, fanSpeed: 0, powerConsumption: 0 },
      { timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), mode: 'cooling', setTemperature: 21.5, currentTemperature: 22.8, fanSpeed: 1, powerConsumption: 800 },
      { timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), mode: 'cooling', setTemperature: 21.5, currentTemperature: 23.5, fanSpeed: 2, powerConsumption: 1100 },
      { timestamp: new Date().toISOString(), mode: 'cooling', setTemperature: 21.5, currentTemperature: 23.2, fanSpeed: 2, powerConsumption: 1250 }
    ],
    'device-6': [
      { timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), temperature: 16.5, humidity: 68.2, batteryVoltage: 3.7 },
      { timestamp: new Date(Date.now() - 3600000 * 20).toISOString(), temperature: 15.8, humidity: 67.5, batteryVoltage: 3.65 },
      { timestamp: new Date(Date.now() - 3600000 * 16).toISOString(), temperature: 15.2, humidity: 66.8, batteryVoltage: 3.6 },
      { timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), temperature: 16.4, humidity: 69.2, batteryVoltage: 3.5 },
      { timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), temperature: 17.5, humidity: 70.8, batteryVoltage: 3.45 },
      { timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), temperature: 18.0, humidity: 71.6, batteryVoltage: 3.4 },
      { timestamp: new Date().toISOString(), temperature: 18.2, humidity: 72.1, batteryVoltage: 3.3 }
    ]
  };
  

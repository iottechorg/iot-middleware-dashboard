// src/services/mockData/utils.js

// Helper functions for generating dynamic data
export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  export const getRandomFloat = (min, max, decimals = 2) => {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(decimals));
  };
  
  export const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  export const getRandomDate = (start = new Date(2023, 0, 1), end = new Date()) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
  
  export const getTimestampMinutesAgo = (minutes) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - minutes);
    return date.toISOString();
  };
  
  export const getRandomMacAddress = () => {
    return Array(6).fill(0)
      .map(() => getRandomInt(0, 255).toString(16).padStart(2, '0').toUpperCase())
      .join(':');
  };
  
  export const getRandomIP = (prefix = '192.168') => {
    return `${prefix}.${getRandomInt(1, 254)}.${getRandomInt(1, 254)}`;
  };
  
  export const getRandomStatus = (onlineProb = 0.8) => {
    return Math.random() < onlineProb ? 'online' : 'offline';
  };
  
  // Constants for reuse across generators
  export const DEVICE_TYPES = ['Sensor', 'Actuator', 'Gateway', 'Controller'];
  export const PROTOCOLS = ['MQTT', 'HTTP', 'CoAP', 'Zigbee', 'Modbus'];
  export const LOCATIONS = ['Building A', 'Building B', 'Building C', 'Server Room', 'Warehouse'];
  export const MANUFACTURERS = ['SensorTech', 'IoTSensors', 'SmartSense', 'TechWorks', 'ConnectAll'];
// src/services/mockData/deviceManagementGenerator.js
import { 
    getRandomInt, 
    getRandomFloat, 
    getRandomElement,
    DEVICE_TYPES,
    PROTOCOLS,
    LOCATIONS,
    MANUFACTURERS
  } from './utils';
  
  // Device Management
  export const generateDeviceManagementDevices = () => {
    const statuses = ['online', 'online', 'online', 'offline', 'warning'];
    const buildings = ['Building A', 'Building B', 'Building C', 'Building D', 'Building E'];
    const floors = [1, 2, 3, 4, 5, 6, 7];
    
    return Array(7).fill(0).map((_, index) => {
      const type = getRandomElement(DEVICE_TYPES);
      const status = getRandomElement(statuses);
      const protocol = getRandomElement(PROTOCOLS);
      const building = getRandomElement(buildings);
      const floor = getRandomElement(floors);
      const deviceId = `dev_${String(index + 1).padStart(3, '0')}`;
      
      let properties = {};
      let lastSeen = '';
      
      if (status === 'online') {
        lastSeen = `${getRandomInt(1, 30)} mins ago`;
      } else if (status === 'offline') {
        lastSeen = `${getRandomInt(2, 12)} hours ago`;
      } else {
        lastSeen = `${getRandomInt(5, 59)} mins ago`;
      }
      
      if (type === 'Sensor') {
        const sensorTypes = ['Temperature', 'Humidity', 'Motion', 'CO2', 'Pressure'];
        const sensorType = getRandomElement(sensorTypes);
        
        if (sensorType === 'Temperature') {
          properties = {
            'range': '-40°C to 80°C',
            'accuracy': `±${getRandomFloat(0.1, 1, 1)}°C`,
            'batteryLevel': `${getRandomInt(20, 100)}%`
          };
        } else if (sensorType === 'Humidity') {
          properties = {
            'range': '0% to 100%',
            'accuracy': `±${getRandomInt(1, 5)}%`,
            'batteryLevel': `${getRandomInt(20, 100)}%`
          };
        } else if (sensorType === 'Motion') {
          properties = {
            'range': `${getRandomInt(3, 10)}m`,
            'sensitivity': getRandomElement(['Low', 'Medium', 'High']),
            'batteryLevel': `${getRandomInt(20, 100)}%`
          };
        } else if (sensorType === 'CO2') {
          properties = {
            'range': '0 to 5000 ppm',
            'accuracy': `±${getRandomInt(10, 50)} ppm`,
            'calibration': getRandomElement(['Self-calibrating', 'Manual'])
          };
        }
        
        return {
          id: deviceId,
          name: `${sensorType} Sensor ${building.slice(-1)}${floor}`,
          type: 'Sensor',
          protocol: protocol,
          status: status,
          lastSeen: lastSeen,
          location: `${building}, Floor ${floor}`,
          description: `${sensorType} sensor for monitoring ${sensorType.toLowerCase()}`,
          properties: properties
        };
      } else if (type === 'Actuator') {
        const actuatorTypes = ['Smart Light', 'Smart Thermostat', 'Valve Controller'];
        const actuatorType = getRandomElement(actuatorTypes);
        
        if (actuatorType === 'Smart Light') {
          properties = {
            'brightness': '0-100%',
            'colorTemperature': '2700K-6500K',
            'powerConsumption': `${getRandomInt(5, 15)}W`
          };
        } else if (actuatorType === 'Smart Thermostat') {
          properties = {
            'temperatureRange': '10°C to 30°C',
            'mode': getRandomElement(['Auto', 'Heat', 'Cool', 'Off']),
            'powerSource': getRandomElement(['AC', 'Battery'])
          };
        }
        
        return {
          id: deviceId,
          name: `${actuatorType} ${building.slice(-1)}${floor}`,
          type: 'Actuator',
          protocol: protocol,
          status: status,
          lastSeen: lastSeen,
          location: `${building}, Floor ${floor}`,
          description: `${actuatorType} for automated control`,
          properties: properties
        };
      } else if (type === 'Gateway') {
        properties = {
          'connectedDevices': `${getRandomInt(5, 25)}`,
          'uptime': `${getRandomInt(1, 60)} days`,
          'firmwareVersion': `${getRandomInt(1, 4)}.${getRandomInt(0, 9)}.${getRandomInt(0, 9)}`
        };
        
        return {
          id: deviceId,
          name: `Gateway ${building.slice(-1)}${floor}`,
          type: 'Gateway',
          protocol: protocol,
          status: status,
          lastSeen: lastSeen,
          location: `${building}, Floor ${floor}`,
          description: 'IoT gateway for connecting multiple devices',
          properties: properties
        };
      } else {
        properties = {
          'controlType': getRandomElement(['Simple', 'Advanced']),
          'interfaces': getRandomElement(['Web', 'Mobile', 'API']),
          'firmwareVersion': `${getRandomInt(1, 4)}.${getRandomInt(0, 9)}.${getRandomInt(0, 9)}`
        };
        
        return {
          id: deviceId,
          name: `Controller ${building.slice(-1)}${floor}`,
          type: 'Controller',
          protocol: protocol,
          status: status,
          lastSeen: lastSeen,
          location: `${building}, Floor ${floor}`,
          description: 'Controller for managing IoT devices',
          properties: properties
        };
      }
    });
  };
  
  export const generateDeviceContextDevices = () => {
    const now = new Date();
    const deviceTypes = ['sensor', 'sensor', 'actuator', 'gateway'];
    const protocols = ['MQTT', 'Zigbee', 'HTTP', 'CoAP', 'Modbus'];
    const locations = ['Building A', 'Building B', 'Server Room', 'Warehouse'];
    const statusOptions = ['online', 'online', 'online', 'offline'];
    
    return Array(5).fill(0).map((_, index) => {
      const type = getRandomElement(deviceTypes);
      const status = getRandomElement(statusOptions);
      const lastSeen = status === 'online' ? new Date().toISOString() : 
                                           new Date(Date.now() - getRandomInt(1, 48) * 60 * 60 * 1000).toISOString();
      
      const device = {
        id: `device-${index + 1}`,
        type: type,
        protocol: getRandomElement(protocols),
        status: status,
        location: getRandomElement(locations),
        lastSeen: lastSeen,
        firmware: `${getRandomInt(1, 3)}.${getRandomInt(0, 9)}.${getRandomInt(0, 9)}`,
        tags: [],
        metadata: {},
        telemetry: {}
      };
      
      // Add device-specific properties
      if (type === 'sensor') {
        const sensorTypes = ['temperature', 'motion', 'humidity', 'pressure', 'light'];
        const selectedType = getRandomElement(sensorTypes);
        
        device.name = `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Sensor #${index + 1}`;
        device.batteryLevel = status === 'online' ? getRandomInt(20, 100) : null;
        device.tags = [selectedType, getRandomElement(['indoor', 'outdoor'])];
        
        device.metadata = {
          model: `${selectedType.toUpperCase().slice(0, 2)}-${getRandomInt(1000, 9999)}`,
          manufacturer: getRandomElement(MANUFACTURERS),
          serialNumber: `ST-${selectedType.toUpperCase().slice(0, 2)}${getRandomInt(1000, 9999)}-${getRandomInt(10000, 99999)}`
        };
        
        // Add sensor-specific telemetry
        if (selectedType === 'temperature') {
          device.telemetry = {
            temperature: getRandomFloat(15, 35, 1),
            humidity: getRandomFloat(30, 70, 1),
            batteryVoltage: getRandomFloat(3.0, 4.2, 1)
          };
        } else if (selectedType === 'motion') {
          device.telemetry = {
            motionDetected: Math.random() > 0.7,
            batteryVoltage: getRandomFloat(3.0, 4.2, 1)
          };
        } else if (selectedType === 'humidity') {
          device.telemetry = {
            humidity: getRandomFloat(30, 90, 1),
            temperature: getRandomFloat(18, 32, 1),
            batteryVoltage: getRandomFloat(3.0, 4.2, 1)
          };
        } else if (selectedType === 'pressure') {
          device.telemetry = {
            pressure: getRandomFloat(980, 1040, 1),
            temperature: getRandomFloat(15, 30, 1),
            batteryVoltage: getRandomFloat(3.0, 4.2, 1)
          };
        } else if (selectedType === 'light') {
          device.telemetry = {
            luminosity: getRandomInt(0, 10000),
            batteryVoltage: getRandomFloat(3.0, 4.2, 1)
          };
        }
      } else if (type === 'actuator') {
        const actuatorTypes = ['light', 'hvac', 'valve', 'relay'];
        const selectedType = getRandomElement(actuatorTypes);
        
        device.name = `Smart ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} #${index + 1}`;
        device.batteryLevel = null;
        device.tags = [selectedType, getRandomElement(['indoor', 'control'])];
        
        device.metadata = {
          model: `${selectedType.toUpperCase().slice(0, 2)}-${getRandomInt(100, 999)}`,
          manufacturer: getRandomElement(MANUFACTURERS),
          serialNumber: `AC-${selectedType.toUpperCase().slice(0, 2)}${getRandomInt(1000, 9999)}-${getRandomInt(10000, 99999)}`
        };
        
        // Add actuator-specific telemetry
        if (selectedType === 'light') {
          device.telemetry = {
            state: status === 'online' ? getRandomElement(['on', 'off']) : 'off',
            brightness: status === 'online' && device.telemetry?.state === 'on' ? getRandomInt(10, 100) : 0,
            powerConsumption: status === 'online' && device.telemetry?.state === 'on' ? getRandomFloat(0.5, 15, 1) : 0
          };
        } else if (selectedType === 'hvac') {
          const mode = status === 'online' ? getRandomElement(['cooling', 'heating', 'fan', 'off']) : 'off';
          device.telemetry = {
            mode: mode,
            setTemperature: getRandomFloat(18, 26, 1),
            currentTemperature: getRandomFloat(16, 30, 1),
            fanSpeed: mode !== 'off' ? getRandomInt(1, 5) : 0,
            powerConsumption: mode !== 'off' ? getRandomInt(500, 2500) : 0
          };
        } else if (selectedType === 'valve') {
          const position = status === 'online' ? getRandomInt(0, 100) : 0;
          device.telemetry = {
            position: position,
            flow: position > 0 ? getRandomFloat(0.1, 10, 2) : 0,
            pressure: getRandomFloat(1, 5, 2)
          };
        }
      } else if (type === 'gateway') {
        device.name = `Gateway #${index + 1}`;
        device.batteryLevel = null;
        device.tags = ['gateway', getRandomElement(['primary', 'secondary', 'backup'])];
        
        device.metadata = {
          model: `GW-${getRandomInt(1000, 9999)}`,
          manufacturer: getRandomElement(MANUFACTURERS),
          serialNumber: `GW-${getRandomInt(10000, 99999)}`
        };
        
        const connectedDevices = getRandomInt(5, 25);
        device.telemetry = {
          cpuLoad: getRandomFloat(10, 80, 1),
          memoryUsage: getRandomInt(256, 1024),
          temperature: getRandomFloat(30, 55, 1),
          connectedDevices: connectedDevices
        };
      }
      
      return device;
    });
  };
// src/services/mockData/protocols.js

const mockProtocols = [
    { 
      id: '1', 
      name: 'MQTT', 
      type: 'Pub/Sub', 
      version: '3.1.1', 
      status: 'active', 
      devices: 124,
      configuration: {
        host: 'mqtt.example.com',
        port: 1883,
        username: 'mqtt_user',
        tls: true,
        qos: 1,
        keepAlive: 60
      }
    },
    { 
      id: '2', 
      name: 'CoAP', 
      type: 'Request/Response', 
      version: '1.0', 
      status: 'active', 
      devices: 57,
      configuration: {
        port: 5683,
        blockSize: 1024,
        timeout: 30,
        retransmitCount: 4
      }
    },
    { 
      id: '3', 
      name: 'HTTP', 
      type: 'Request/Response', 
      version: '1.1', 
      status: 'active', 
      devices: 215,
      configuration: {
        port: 8080,
        tls: true,
        maxConnections: 1000,
        timeout: 30
      }
    },
    { 
      id: '4', 
      name: 'Modbus', 
      type: 'Master/Slave', 
      version: 'TCP', 
      status: 'inactive', 
      devices: 18,
      configuration: {
        port: 502,
        timeout: 10,
        retries: 3
      }
    },
    { 
      id: '5', 
      name: 'BLE', 
      type: 'Wireless', 
      version: '5.0', 
      status: 'warning', 
      devices: 42,
      configuration: {
        scanInterval: 5000,
        connectionTimeout: 10000,
        mtu: 512
      }
    },
    { 
      id: '6', 
      name: 'Zigbee', 
      type: 'Mesh', 
      version: '3.0', 
      status: 'error', 
      devices: 0,
      configuration: {
        panId: '0x1A2B',
        channel: 15,
        securityLevel: 5
      }
    }
  ];
  
  export default mockProtocols;
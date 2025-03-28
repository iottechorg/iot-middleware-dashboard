// src/services/mockData/networkSettingsGenerator.js
import { 
    getRandomInt, 
    getRandomFloat, 
    getRandomElement, 
    getRandomMacAddress,
    getRandomIP
  } from './utils';
  
  // Network Settings
  export const generateSystemNetworkInterfaces = () => {
    return [
      {
        id: 'eth0',
        name: 'Ethernet 0',
        type: 'ethernet',
        enabled: true,
        status: Math.random() > 0.9 ? 'down' : 'up',
        ipAddress: getRandomIP(),
        netmask: '255.255.255.0',
        gateway: getRandomIP().split('.').slice(0, 3).join('.') + '.1',
        mac: getRandomMacAddress(),
        dns: ['8.8.8.8', '8.8.4.4'],
        mtu: 1500,
        metrics: {
          rxBytes: `${getRandomFloat(0.1, 5, 1)} GB`,
          txBytes: `${getRandomFloat(0.1, 2, 1)} GB`,
          rxPackets: getRandomInt(100000, 2000000),
          txPackets: getRandomInt(50000, 1000000),
          errors: getRandomInt(0, 10)
        }
      },
      {
        id: 'wlan0',
        name: 'WiFi',
        type: 'wifi',
        enabled: true,
        status: Math.random() > 0.8 ? 'down' : 'up',
        ipAddress: getRandomIP('192.169'),
        netmask: '255.255.255.0',
        gateway: '192.169.1.1',
        mac: getRandomMacAddress(),
        dns: ['8.8.8.8', '8.8.4.4'],
        mtu: 1500,
        wifi: {
          ssid: 'IoT-Network',
          security: 'WPA2',
          channel: getRandomInt(1, 11),
          frequency: getRandomElement(['2.4 GHz', '5 GHz']),
          signalStrength: getRandomInt(20, 100)
        },
        metrics: {
          rxBytes: `${getRandomFloat(0.1, 3, 1)} GB`,
          txBytes: `${getRandomFloat(0.1, 1, 1)} GB`,
          rxPackets: getRandomInt(50000, 1000000),
          txPackets: getRandomInt(20000, 500000),
          errors: getRandomInt(0, 15)
        }
      }
    ];
  };
  
  export const generateSystemNetworkSettings = () => {
    return {
      hostname: 'iot-middleware-server',
      domainName: 'local',
      proxy: {
        enabled: Math.random() > 0.7,
        httpProxy: Math.random() > 0.7 ? 'http://proxy.example.com:8080' : '',
        httpsProxy: Math.random() > 0.7 ? 'http://proxy.example.com:8080' : '',
        noProxy: 'localhost,127.0.0.1',
        username: '',
        password: ''
      },
      api: {
        port: getRandomElement([8080, 8443, 3000, 3001, 5000]),
        enableCors: Math.random() > 0.2,
        allowedOrigins: '*',
        rateLimit: {
          enabled: Math.random() > 0.3,
          requestsPerMinute: getRandomInt(50, 500),
          ipWhitelist: '192.168.0.0/16,10.0.0.0/8'
        }
      }
    };
  };
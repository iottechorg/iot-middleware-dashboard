// src/services/mockData/traffic.js

export const mockProtocolTraffic = {
    'MQTT': [
      { timestamp: Date.now() - 3600000 * 6, inbound: 1240, outbound: 820 },
      { timestamp: Date.now() - 3600000 * 5, inbound: 1540, outbound: 1120 },
      { timestamp: Date.now() - 3600000 * 4, inbound: 1340, outbound: 940 },
      { timestamp: Date.now() - 3600000 * 3, inbound: 1740, outbound: 1340 },
      { timestamp: Date.now() - 3600000 * 2, inbound: 2140, outbound: 1540 },
      { timestamp: Date.now() - 3600000 * 1, inbound: 1840, outbound: 1240 },
      { timestamp: Date.now(), inbound: 2040, outbound: 1440 }
    ],
    'CoAP': [
      { timestamp: Date.now() - 3600000 * 6, inbound: 520, outbound: 320 },
      { timestamp: Date.now() - 3600000 * 5, inbound: 640, outbound: 420 },
      { timestamp: Date.now() - 3600000 * 4, inbound: 740, outbound: 540 },
      { timestamp: Date.now() - 3600000 * 3, inbound: 820, outbound: 640 },
      { timestamp: Date.now() - 3600000 * 2, inbound: 740, outbound: 540 },
      { timestamp: Date.now() - 3600000 * 1, inbound: 640, outbound: 420 },
      { timestamp: Date.now(), inbound: 720, outbound: 480 }
    ],
    'HTTP': [
      { timestamp: Date.now() - 3600000 * 6, inbound: 1840, outbound: 2540 },
      { timestamp: Date.now() - 3600000 * 5, inbound: 2140, outbound: 2840 },
      { timestamp: Date.now() - 3600000 * 4, inbound: 2340, outbound: 3140 },
      { timestamp: Date.now() - 3600000 * 3, inbound: 2140, outbound: 3040 },
      { timestamp: Date.now() - 3600000 * 2, inbound: 1940, outbound: 2840 },
      { timestamp: Date.now() - 3600000 * 1, inbound: 1840, outbound: 2640 },
      { timestamp: Date.now(), inbound: 2040, outbound: 2940 }
    ],
    'Modbus': [
      { timestamp: Date.now() - 3600000 * 6, inbound: 240, outbound: 180 },
      { timestamp: Date.now() - 3600000 * 5, inbound: 220, outbound: 160 },
      { timestamp: Date.now() - 3600000 * 4, inbound: 210, outbound: 150 },
      { timestamp: Date.now() - 3600000 * 3, inbound: 230, outbound: 170 },
      { timestamp: Date.now() - 3600000 * 2, inbound: 220, outbound: 160 },
      { timestamp: Date.now() - 3600000 * 1, inbound: 200, outbound: 140 },
      { timestamp: Date.now(), inbound: 0, outbound: 0 }  // Inactive protocol
    ],
    'BLE': [
      { timestamp: Date.now() - 3600000 * 6, inbound: 320, outbound: 120 },
      { timestamp: Date.now() - 3600000 * 5, inbound: 340, outbound: 140 },
      { timestamp: Date.now() - 3600000 * 4, inbound: 380, outbound: 180 },
      { timestamp: Date.now() - 3600000 * 3, inbound: 420, outbound: 220 },
      { timestamp: Date.now() - 3600000 * 2, inbound: 380, outbound: 180 },
      { timestamp: Date.now() - 3600000 * 1, inbound: 200, outbound: 80 },  // Warning - traffic drop
      { timestamp: Date.now(), inbound: 220, outbound: 90 }
    ],
    'Zigbee': [
      { timestamp: Date.now() - 3600000 * 6, inbound: 120, outbound: 40 },
      { timestamp: Date.now() - 3600000 * 5, inbound: 140, outbound: 60 },
      { timestamp: Date.now() - 3600000 * 4, inbound: 160, outbound: 80 },
      { timestamp: Date.now() - 3600000 * 3, inbound: 180, outbound: 100 },
      { timestamp: Date.now() - 3600000 * 2, inbound: 60, outbound: 20 },
      { timestamp: Date.now() - 3600000 * 1, inbound: 0, outbound: 0 },  // Error - no traffic
      { timestamp: Date.now(), inbound: 0, outbound: 0 }
    ]
  };
  

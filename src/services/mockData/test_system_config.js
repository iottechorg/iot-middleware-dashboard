// src/services/mockData/index.js

// System Settings
export const mockSystemSettings = {
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
    maxThreads: 8,
    taskQueueSize: 100,
    dataRetentionDays: 90,
    enableCaching: true,
    cacheTTL: 3600,
    enableCompression: true,
    loggingLevel: 'info'
  },
  maintenance: {
    enableAutoUpdates: true,
    updateCheckInterval: 'daily',
    maintenanceWindow: {
      enabled: true,
      dayOfWeek: 'sunday',
      startTime: '02:00',
      duration: 120
    },
    backupSchedule: {
      enabled: true,
      frequency: 'daily',
      time: '01:00',
      retentionCount: 7
    }
  }
};

// Network Settings
export const mockSystemNetworkInterfaces = [
  {
    id: 'eth0',
    name: 'Ethernet 0',
    type: 'ethernet',
    enabled: true,
    status: 'up',
    ipAddress: '192.168.1.100',
    netmask: '255.255.255.0',
    gateway: '192.168.1.1',
    mac: '00:11:22:33:44:55',
    dns: ['8.8.8.8', '8.8.4.4'],
    mtu: 1500,
    metrics: {
      rxBytes: '1.2 GB',
      txBytes: '0.5 GB',
      rxPackets: 850000,
      txPackets: 420000,
      errors: 0
    }
  },
  {
    id: 'wlan0',
    name: 'WiFi',
    type: 'wifi',
    enabled: true,
    status: 'up',
    ipAddress: '192.168.2.100',
    netmask: '255.255.255.0',
    gateway: '192.168.2.1',
    mac: '00:11:22:33:44:66',
    dns: ['8.8.8.8', '8.8.4.4'],
    mtu: 1500,
    wifi: {
      ssid: 'IoT-Network',
      security: 'WPA2',
      channel: 6,
      frequency: '2.4 GHz',
      signalStrength: 85
    },
    metrics: {
      rxBytes: '0.8 GB',
      txBytes: '0.3 GB',
      rxPackets: 620000,
      txPackets: 310000,
      errors: 2
    }
  }
];

export const mockSystemNetworkSettings = {
  hostname: 'iot-middleware-server',
  domainName: 'local',
  proxy: {
    enabled: false,
    httpProxy: '',
    httpsProxy: '',
    noProxy: 'localhost,127.0.0.1',
    username: '',
    password: ''
  },
  api: {
    port: 8080,
    enableCors: true,
    allowedOrigins: '*',
    rateLimit: {
      enabled: true,
      requestsPerMinute: 100,
      ipWhitelist: '192.168.0.0/16,10.0.0.0/8'
    }
  }
};

// Security Settings
export const mockSecurityUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'administrator',
    lastLogin: '2023-05-14T15:30:22Z',
    status: 'active',
    twoFactorEnabled: true,
  },
  {
    id: 2,
    username: 'operator',
    email: 'operator@example.com',
    role: 'operator',
    lastLogin: '2023-05-12T10:15:45Z',
    status: 'active',
    twoFactorEnabled: false,
  },
  {
    id: 3,
    username: 'viewer',
    email: 'viewer@example.com',
    role: 'viewer',
    lastLogin: '2023-05-10T08:45:12Z',
    status: 'active',
    twoFactorEnabled: false,
  },
  {
    id: 4,
    username: 'developer',
    email: 'developer@example.com',
    role: 'developer',
    lastLogin: '2023-05-09T14:20:33Z',
    status: 'inactive',
    twoFactorEnabled: true,
  },
];

export const mockSecurityCertificates = [
  {
    id: 1,
    name: 'HTTPS Server Certificate',
    type: 'server',
    issuedTo: 'iot-middleware-server.local',
    issuedBy: 'IoT Root CA',
    validFrom: '2023-01-15T00:00:00Z',
    validTo: '2024-01-15T23:59:59Z',
    status: 'valid',
    algorithm: 'RSA 2048',
    fingerprint: 'SHA256:6A:DE:E0:AF:5F:0A:31:5C:86:EE:69:F0:AA:CE:8D:9E',
  },
  {
    id: 2,
    name: 'MQTT Broker Certificate',
    type: 'server',
    issuedTo: 'mqtt.iot-middleware-server.local',
    issuedBy: 'IoT Root CA',
    validFrom: '2023-01-15T00:00:00Z',
    validTo: '2024-01-15T23:59:59Z',
    status: 'valid',
    algorithm: 'RSA 2048',
    fingerprint: 'SHA256:5B:CD:F1:BF:6E:1A:42:6D:77:FF:78:E1:BB:DD:7E:0F',
  },
  {
    id: 3,
    name: 'API Client Certificate',
    type: 'client',
    issuedTo: 'api-client',
    issuedBy: 'IoT Root CA',
    validFrom: '2023-01-15T00:00:00Z',
    validTo: '2023-07-15T23:59:59Z',
    status: 'expiring-soon',
    algorithm: 'RSA 2048',
    fingerprint: 'SHA256:3C:AB:E2:D0:7F:2B:4C:98:77:EE:59:00:BB:CE:9A:1D',
  },
  {
    id: 4,
    name: 'Expired Certificate',
    type: 'client',
    issuedTo: 'old-device',
    issuedBy: 'IoT Root CA',
    validFrom: '2022-01-15T00:00:00Z',
    validTo: '2023-01-15T23:59:59Z',
    status: 'expired',
    algorithm: 'RSA 2048',
    fingerprint: 'SHA256:2A:BC:D1:8F:4E:2A:3D:67:FF:68:E1:BB:CC:6E:0F:11',
  },
];

export const mockSecuritySettings = {
  general: {
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      passwordExpiryDays: 90,
      preventReuseCount: 5,
    },
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    enableTwoFactor: true,
  },
  tls: {
    minTlsVersion: 'tls1.2',
    preferredCipherSuites: 'TLS_AES_256_GCM_SHA384,TLS_CHACHA20_POLY1305_SHA256',
    enableStrictTransportSecurity: true,
    hstsMaxAge: 31536000,
    enableOcspStapling: true,
    enforceCertificateRevocation: true,
  },
  api: {
    tokenExpiration: 60,
    jwtAlgorithm: 'RS256',
    enableApiKeyAuth: true,
    apiKeyExpirationDays: 365,
    enforceHttps: true,
  },
};

// Storage Settings
export const mockStorageVolumes = [
  {
    id: 'v-1',
    name: 'Primary Storage',
    type: 'local',
    path: '/var/lib/iot-middleware/data',
    totalSpace: 500, // GB
    usedSpace: 320, // GB
    status: 'online',
    mountOptions: 'defaults,noatime',
    lastBackup: '2023-05-14T03:15:22Z'
  },
  {
    id: 'v-2',
    name: 'Archive Storage',
    type: 'local',
    path: '/mnt/archive',
    totalSpace: 2000, // GB
    usedSpace: 950, // GB
    status: 'online',
    mountOptions: 'defaults,noatime',
    lastBackup: '2023-05-10T02:45:18Z'
  },
  {
    id: 'v-3',
    name: 'S3 Bucket',
    type: 's3',
    bucket: 'iot-middleware-data',
    region: 'us-west-2',
    totalSpace: 5000, // GB
    usedSpace: 1200, // GB
    status: 'online',
    lastBackup: null
  },
  {
    id: 'v-4',
    name: 'Backup Volume',
    type: 'local',
    path: '/mnt/backup',
    totalSpace: 1000, // GB
    usedSpace: 750, // GB
    status: 'online',
    mountOptions: 'defaults,noatime',
    lastBackup: null
  }
];

export const mockStorageDatabases = [
  {
    id: 'db-1',
    name: 'Time Series Database',
    type: 'timescaledb',
    host: 'localhost',
    port: 5432,
    database: 'iot_ts_data',
    username: 'iot_app',
    size: 250, // GB
    connections: 15,
    status: 'online',
    lastBackup: '2023-05-14T03:15:22Z'
  },
  {
    id: 'db-2',
    name: 'Metadata Database',
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'iot_metadata',
    username: 'iot_app',
    size: 120, // GB
    connections: 8,
    status: 'online',
    lastBackup: '2023-05-14T03:15:22Z'
  },
  {
    id: 'db-3',
    name: 'Cache Database',
    type: 'redis',
    host: 'localhost',
    port: 6379,
    database: '0',
    size: 5, // GB
    connections: 25,
    status: 'online',
    lastBackup: '2023-05-14T03:15:22Z'
  }
];

export const mockStorageSettings = {
  local: {
    dataPath: '/var/lib/iot-middleware/data',
    tempPath: '/var/lib/iot-middleware/temp',
    backupPath: '/var/backups/iot-middleware',
    retentionPolicy: {
      enabled: true,
      retentionDays: {
        rawData: 30,
        processedData: 90,
        logs: 14,
        events: 180
      }
    },
    compression: {
      enabled: true,
      algorithm: 'zstd',
      level: 3
    }
  },
  cloud: {
    provider: 's3',
    enabled: true,
    bucket: 'iot-middleware-data',
    region: 'us-west-2',
    prefix: 'data/',
    credentials: {
      accessKeyId: '************',
      secretAccessKey: '************'
    },
    syncSettings: {
      enabled: true,
      syncInterval: 60, // minutes
      syncMode: 'incremental',
      syncTypes: ['device-data', 'events', 'backups']
    }
  },
  database: {
    connectTimeout: 30,
    connectionPoolSize: 20,
    maxQueryDuration: 60,
    enableQueryCache: true,
    queryCacheTTL: 300, // seconds
    backupSettings: {
      enabled: true,
      schedule: 'daily',
      time: '03:00',
      retentionDays: 7,
      compressionEnabled: true
    }
  }
};

// Device Management
export const mockDeviceManagementDevices = [
  { 
    id: 'dev_001', 
    name: 'Temperature Sensor A1', 
    type: 'Sensor', 
    protocol: 'MQTT', 
    status: 'online', 
    lastSeen: '2 mins ago',
    location: 'Building A, Floor 1',
    description: 'Temperature sensor for monitoring room temperature',
    properties: {
      'range': '-40°C to 80°C',
      'accuracy': '±0.5°C',
      'batteryLevel': '87%'
    }
  },
  { 
    id: 'dev_002', 
    name: 'Humidity Sensor B2', 
    type: 'Sensor', 
    protocol: 'MQTT', 
    status: 'online', 
    lastSeen: '5 mins ago',
    location: 'Building B, Floor 2',
    description: 'Humidity sensor for monitoring room humidity',
    properties: {
      'range': '0% to 100%',
      'accuracy': '±2%',
      'batteryLevel': '92%'
    }
  },
  { 
    id: 'dev_003', 
    name: 'Smart Light C3', 
    type: 'Actuator', 
    protocol: 'CoAP', 
    status: 'offline', 
    lastSeen: '3 hours ago',
    location: 'Building C, Floor 3',
    description: 'Smart light for automated lighting control',
    properties: {
      'brightness': '0-100%',
      'colorTemperature': '2700K-6500K',
      'powerConsumption': '9W'
    }
  },
  { 
    id: 'dev_004', 
    name: 'Gateway D4', 
    type: 'Gateway', 
    protocol: 'HTTP', 
    status: 'online', 
    lastSeen: 'Just now',
    location: 'Building D, Floor 4',
    description: 'IoT gateway for connecting multiple devices',
    properties: {
      'connectedDevices': '12',
      'uptime': '24 days',
      'firmwareVersion': '2.4.6'
    }
  },
  { 
    id: 'dev_005', 
    name: 'Motion Sensor E5', 
    type: 'Sensor', 
    protocol: 'MQTT', 
    status: 'warning', 
    lastSeen: '10 mins ago',
    location: 'Building E, Floor 5',
    description: 'Motion sensor for detecting presence',
    properties: {
      'range': '5m',
      'sensitivity': 'High',
      'batteryLevel': '23%'
    }
  },
  { 
    id: 'dev_006', 
    name: 'Smart Thermostat F6', 
    type: 'Controller', 
    protocol: 'MQTT', 
    status: 'online', 
    lastSeen: '1 min ago',
    location: 'Building F, Floor 6',
    description: 'Smart thermostat for temperature control',
    properties: {
      'temperatureRange': '10°C to 30°C',
      'mode': 'Auto',
      'powerSource': 'AC'
    }
  },
  { 
    id: 'dev_007', 
    name: 'CO2 Sensor G7', 
    type: 'Sensor', 
    protocol: 'MQTT', 
    status: 'online', 
    lastSeen: '7 mins ago',
    location: 'Building G, Floor 7',
    description: 'CO2 sensor for air quality monitoring',
    properties: {
      'range': '0 to 5000 ppm',
      'accuracy': '±30 ppm',
      'calibration': 'Self-calibrating'
    }
  }
];

export const mockDeviceContextDevices = [
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
  }
];

// Task Management
export const mockTaskListTasks = [
  {
    id: 'task-1',
    name: 'Image Recognition Processing',
    description: 'Process incoming camera feeds for object recognition',
    type: 'ml-inference',
    status: 'running',
    priority: 'high',
    progress: 74,
    createdAt: '2023-05-14T09:23:45Z',
    startedAt: '2023-05-14T09:25:12Z',
    completedAt: null,
    location: {
      type: 'cloud',
      name: 'AWS EC2 Instance'
    }
  },
  {
    id: 'task-2',
    name: 'Sensor Data Aggregation',
    description: 'Aggregate temperature sensor readings from manufacturing floor',
    type: 'sensor-aggregation',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    createdAt: '2023-05-14T08:15:30Z',
    startedAt: '2023-05-14T08:20:10Z',
    completedAt: '2023-05-14T10:45:22Z',
    location: {
      type: 'edge',
      name: 'Factory Floor Edge Device'
    }
  },
  {
    id: 'task-3',
    name: 'Data Pre-processing',
    description: 'Clean and normalize raw sensor data',
    type: 'data-processing',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    createdAt: '2023-05-14T07:30:15Z',
    startedAt: '2023-05-14T07:35:45Z',
    completedAt: '2023-05-14T08:55:20Z',
    location: {
      type: 'fog',
      name: 'Local Processing Node'
    }
  },
  {
    id: 'task-4',
    name: 'MQTT to Kafka Translation',
    description: 'Translate MQTT messages to Kafka for central processing',
    type: 'protocol-translation',
    status: 'running',
    priority: 'medium',
    progress: 45,
    createdAt: '2023-05-14T11:10:33Z',
    startedAt: '2023-05-14T11:15:10Z',
    completedAt: null,
    location: {
      type: 'fog',
      name: 'Gateway Server'
    }
  },
  {
    id: 'task-5',
    name: 'Anomaly Detection',
    description: 'Detect anomalies in equipment vibration patterns',
    type: 'ml-inference',
    status: 'queued',
    priority: 'critical',
    progress: 0,
    createdAt: '2023-05-15T09:05:22Z',
    startedAt: null,
    completedAt: null,
    location: {
      type: 'cloud',
      name: 'GPU Cluster'
    }
  },
  {
    id: 'task-6',
    name: 'Historical Data Analysis',
    description: 'Process historical temperature data for trend analysis',
    type: 'data-processing',
    status: 'paused',
    priority: 'low',
    progress: 32,
    createdAt: '2023-05-14T14:22:45Z',
    startedAt: '2023-05-14T14:30:15Z',
    completedAt: null,
    location: {
      type: 'cloud',
      name: 'Data Warehouse Node'
    }
  },
  {
    id: 'task-7',
    name: 'Model Loading',
    description: 'Load ML models for inference tasks',
    type: 'ml-inference',
    status: 'completed',
    priority: 'high',
    progress: 100,
    createdAt: '2023-05-14T08:55:15Z',
    startedAt: '2023-05-14T09:00:12Z',
    completedAt: '2023-05-14T09:15:45Z',
    location: {
      type: 'cloud',
      name: 'AWS EC2 Instance'
    }
  },
  {
    id: 'task-8',
    name: 'Video Stream Processing',
    description: 'Analyze security camera video stream',
    type: 'ml-inference',
    status: 'failed',
    priority: 'high',
    progress: 45,
    createdAt: '2023-05-14T10:15:45Z',
    startedAt: '2023-05-14T10:20:33Z',
    completedAt: '2023-05-14T11:05:22Z',
    location: {
      type: 'fog',
      name: 'Security Gateway'
    }
  }
];

export const mockTaskDetailTask = {
  id: 'task-1',
  name: 'Image Recognition Processing',
  description: 'Process incoming camera feeds for object recognition',
  type: 'ML Inference',
  status: 'running', // Options: pending, running, completed, failed, paused
  priority: 'high', // Options: low, medium, high, critical
  createdAt: '2023-05-14T09:23:45Z',
  startedAt: '2023-05-14T09:25:12Z',
  completedAt: null,
  runtime: '2h 15m',
  progress: 74,
  parameters: [],
  events: [],
  resourceUsage: {
    cpu: 45,
    memory: 1.2, // GB
    network: 5.8 // MB/s
  },
  location: {
    type: 'cloud', // Options: cloud, fog, edge
    name: 'AWS EC2 Instance'
  },
  dependencies: [
    { id: 'task-3', name: 'Data Pre-processing', status: 'completed' },
    { id: 'task-7', name: 'Model Loading', status: 'completed' }
  ],
  results: {
    processedItems: 1245,
    detectedObjects: 327,
    averageConfidence: 0.82,
    outputLocation: 's3://iot-results/task-1/output/'
  }
};

export const mockTaskFormResources = {
  edge: [
    { id: 'edge-1', name: 'Edge Device 1', cpu: 80, memory: 2, network: 5 },
    { id: 'edge-2', name: 'Edge Device 2', cpu: 60, memory: 4, network: 10 },
    { id: 'edge-3', name: 'Edge Device 3', cpu: 40, memory: 8, network: 15 }
  ],
  fog: [
    { id: 'fog-1', name: 'Fog Node 1', cpu: 70, memory: 16, network: 100 },
    { id: 'fog-2', name: 'Fog Node 2', cpu: 50, memory: 32, network: 200 }
  ],
  cloud: [
    { id: 'cloud-1', name: 'AWS Instance 1', cpu: 40, memory: 64, network: 1000 },
    { id: 'cloud-2', name: 'Azure VM 1', cpu: 30, memory: 128, network: 2000 },
    { id: 'cloud-3', name: 'Google Cloud 1', cpu: 20, memory: 256, network: 5000 }
  ]
};

// Task Offloading
export const mockTaskOffloadingMockOffloadMetrics = [
  { name: 'Edge', value: 42 },
  { name: 'Fog', value: 28 },
  { name: 'Cloud', value: 30 }
];

export const mockTaskOffloadingResourceAllocation = [
  { name: 'Data Processing', cpu: 35, memory: 45, network: 20 },
  { name: 'ML Inference', cpu: 25, memory: 30, network: 10 },
  { name: 'Sensor Data Collection', cpu: 15, memory: 10, network: 40 },
  { name: 'Protocol Translation', cpu: 10, memory: 5, network: 15 },
  { name: 'Dashboard Services', cpu: 15, memory: 10, network: 15 }
];

export const mockTaskOffloadingNodes = [
  {
    id: 'edge-node-1',
    name: 'Edge Node 1',
    type: 'edge',
    status: 'online',
    location: 'Building A',
    resources: {
      cpu: { total: 4, used: 3.1, available: 0.9 },
      memory: { total: 8192, used: 4096, available: 4096, unit: 'MB' },
      storage: { total: 128, used: 42, available: 86, unit: 'GB' },
      gpu: { total: 0, used: 0, available: 0 }
    },
    tasks: ['task-1'],
    lastSeen: new Date().toISOString(),
    uptimeHours: 124
  },
  {
    id: 'edge-node-2',
    name: 'Edge Node 2',
    type: 'edge',
    status: 'online',
    location: 'Building B',
    resources: {
      cpu: { total: 4, used: 1.2, available: 2.8 },
      memory: { total: 8192, used: 2048, available: 6144, unit: 'MB' },
      storage: { total: 128, used: 38, available: 90, unit: 'GB' },
      gpu: { total: 0, used: 0, available: 0 }
    },
    tasks: [],
    lastSeen: new Date().toISOString(),
    uptimeHours: 72
  },
  {
    id: 'cloud-node-1',
    name: 'Cloud Server 1',
    type: 'cloud',
    status: 'online',
    location: 'Data Center',
    resources: {
      cpu: { total: 16, used: 8.4, available: 7.6 },
      memory: { total: 32768, used: 16384, available: 16384, unit: 'MB' },
      storage: { total: 1024, used: 412, available: 612, unit: 'GB' },
      gpu: { total: 2, used: 0.5, available: 1.5 }
    },
    tasks: ['task-3'],
    lastSeen: new Date().toISOString(),
    uptimeHours: 720
  },
  {
    id: 'cloud-node-2',
    name: 'Cloud Server 2',
    type: 'cloud',
    status: 'warning',
    location: 'Data Center',
    resources: {
      cpu: { total: 16, used: 12.8, available: 3.2 },
      memory: { total: 32768, used: 28672, available: 4096, unit: 'MB' },
      storage: { total: 1024, used: 768, available: 256, unit: 'GB' },
      gpu: { total: 2, used: 1.8, available: 0.2 }
    },
    tasks: ['task-4'],
    lastSeen: new Date().toISOString(),
    uptimeHours: 543,
    warnings: ['High CPU usage', 'Low storage space']
  },
  {
    id: 'cloud-node-3',
    name: 'Cloud Server 3',
    type: 'cloud',
    status: 'offline',
    location: 'Data Center',
    resources: {
      cpu: { total: 16, used: 0, available: 0 },
      memory: { total: 32768, used: 0, available: 0, unit: 'MB' },
      storage: { total: 1024, used: 0, available: 0, unit: 'GB' },
      gpu: { total: 2, used: 0, available: 0 }
    },
    tasks: ['task-2'],
    lastSeen: new Date(Date.now() - 3600000).toISOString(),
    uptimeHours: 0,
    error: 'Node unreachable'
  }
];

export const mockTaskOffloadingTasks = [
  {
    id: 'task-1',
    name: 'Video Processing Task',
    description: 'Process incoming video feed for motion detection',
    status: 'running',
    priority: 'high',
    resources: {
      cpu: 2,
      memory: 1024,
      gpu: 0
    },
    resourceUsage: {
      cpu: 78,
      memory: 62,
      gpu: 0
    },
    assignedNode: 'edge-node-1',
    startTime: new Date(Date.now() - 3600000).toISOString(),
    estimatedEndTime: new Date(Date.now() + 1800000).toISOString(),
    progress: 65,
    type: 'video-processing',
    sourceDevice: 'camera-a12'
  },
  {
    id: 'task-2',
    name: 'Data Aggregation',
    description: 'Aggregate temperature sensor data from Building A',
    status: 'queued',
    priority: 'medium',
    resources: {
      cpu: 1,
      memory: 512,
      gpu: 0
    },
    resourceUsage: {
      cpu: 0,
      memory: 0,
      gpu: 0
    },
    assignedNode: 'cloud-node-3',
    startTime: null,
    estimatedEndTime: null,
    progress: 0,
    type: 'data-aggregation',
    sourceDevice: 'temp-sensors-bldg-a'
  },
  {
    id: 'task-3',
    name: 'Machine Learning Inference',
    description: 'Run anomaly detection model on sensor data',
    status: 'completed',
    priority: 'high',
    resources: {
      cpu: 4,
      memory: 2048,
      gpu: 1
    },
    resourceUsage: {
      cpu: 0,
      memory: 0,
      gpu: 0
    },
    assignedNode: 'cloud-node-1',
    startTime: new Date(Date.now() - 7200000).toISOString(),
    estimatedEndTime: new Date(Date.now() - 3600000).toISOString(),
    completedTime: new Date(Date.now() - 3540000).toISOString(),
    progress: 100,
    type: 'ml-inference',
    sourceDevice: 'all-sensors'
  },
  {
    id: 'task-4',
    name: 'Database Backup',
    description: 'Backup time-series database to cloud storage',
    status: 'failed',
    priority: 'low',
    resources: {
      cpu: 1,
      memory: 1024,
      gpu: 0
    },
    resourceUsage: {
      cpu: 0,
      memory: 0,
      gpu: 0
    },
    assignedNode: 'cloud-node-2',
    startTime: new Date(Date.now() - 5400000).toISOString(),
    estimatedEndTime: new Date(Date.now() - 4800000).toISOString(),
    error: 'Network connection lost during backup',
    progress: 68,
    type: 'backup',
    sourceDevice: 'timeseries-db'
  }
];

export const mockDataPipelineEdges = [
  { id: 'e1-2a', source: 'input-1', target: 'filter-1' },
  { id: 'e1-2b', source: 'input-1', target: 'transformer-1' },
  { id: 'e2a-3', source: 'filter-1', target: 'processor-1' },
  { id: 'e2b-3', source: 'transformer-1', target: 'processor-1' },
  { id: 'e3-4', source: 'processor-1', target: 'output-1' }
];

export const mockDataPipelinesNodes = [
  {
    id: 'input-1',
    type: 'input',
    position: { x: 100, y: 100 },
    data: { 
      label: 'MQTT Broker',
      protocol: 'MQTT',
      devices: 35,
      active: true
    }
  },
  {
    id: 'filter-1',
    type: 'filter',
    position: { x: 400, y: 50 },
    data: { 
      label: 'Temperature Filter',
      condition: 'temp > 25°C',
      passRate: 35,
      active: true
    }
  },
  {
    id: 'transformer-1',
    type: 'transformer',
    position: { x: 400, y: 200 },
    data: { 
      label: 'Unit Converter',
      transformation: '°C to °F',
      latency: 12,
      active: true
    }
  },
  {
    id: 'processor-1',
    type: 'processor',
    position: { x: 700, y: 100 },
    data: { 
      label: 'Anomaly Detector',
      type: 'ML Processor',
      rate: 500,
      active: true
    }
  },
  {
    id: 'output-1',
    type: 'output',
    position: { x: 1000, y: 100 },
    data: { 
      label: 'Database Storage',
      destination: 'TimescaleDB',
      dataRate: '1.2 KB/s',
      active: true
    }
  }
];
// Data Processing
export const mockDataProcessingPipelines = [
  {
    id: 'pipeline-1',
    name: 'Temperature Data Processing',
    description: 'Processes raw temperature sensor data for analysis and storage',
    status: 'active',
    nodes: [
      {
        id: 'node-1',
        type: 'source',
        title: 'Temperature Sensors',
        description: 'Collects data from all temperature sensors',
        status: 'active',
        position: { x: 50, y: 50 }
      },
      {
        id: 'node-2',
        type: 'filter',
        title: 'Data Validation',
        description: 'Validates sensor data and filters outliers',
        status: 'active',
        position: { x: 300, y: 50 }
      },
      {
        id: 'node-3',
        type: 'transform',
        title: 'Unit Conversion',
        description: 'Converts temperature data to standard units',
        status: 'active',
        position: { x: 550, y: 50 }
      },
      {
        id: 'node-4',
        type: 'destination',
        title: 'Time Series DB',
        description: 'Stores processed data in time series database',
        status: 'active',
        position: { x: 800, y: 50 }
      },
      {
        id: 'node-5',
        type: 'destination',
        title: 'Analytics Engine',
        description: 'Sends data to analytics engine for processing',
        status: 'warning',
        position: { x: 800, y: 200 }
      }
    ],
    connections: [
      { source: 'node-1', target: 'node-2', status: 'active' },
      { source: 'node-2', target: 'node-3', status: 'active' },
      { source: 'node-3', target: 'node-4', status: 'active' },
      { source: 'node-3', target: 'node-5', status: 'warning' }
    ]
  },
  {
    id: 'pipeline-2',
    name: 'Motion Detection Alert',
    description: 'Processes motion sensor data and triggers alerts',
    status: 'active',
    nodes: [
      {
        id: 'node-1',
        type: 'source',
        title: 'Motion Sensors',
        description: 'Collects data from all motion sensors',
        status: 'active',
        position: { x: 50, y: 50 }
      },
      {
        id: 'node-2',
        type: 'filter',
        title: 'Motion Validation',
        description: 'Validates motion detection events',
        status: 'active',
        position: { x: 300, y: 50 }
      },
      {
        id: 'node-3',
        type: 'transform',
        title: 'Event Enrichment',
        description: 'Adds metadata to motion events',
        status: 'active',
        position: { x: 550, y: 50 }
      },
      {
        id: 'node-4',
        type: 'destination',
        title: 'Alert System',
        description: 'Triggers alerts based on motion events',
        status: 'active',
        position: { x: 800, y: 50 }
      }
    ],
    connections: [
      { source: 'node-1', target: 'node-2', status: 'active' },
      { source: 'node-2', target: 'node-3', status: 'active' },
      { source: 'node-3', target: 'node-4', status: 'active' }
    ]
  }
];

export const mockDataProcessingRules = [
  {
    id: 'rule-1',
    name: 'Temperature Outlier Filter',
    description: 'Filters out temperature readings outside of expected range',
    status: 'active',
    pipeline: 'pipeline-1',
    conditions: [
      { field: 'temperature', operator: 'lessThan', value: -30 },
      { field: 'temperature', operator: 'greaterThan', value: 80 }
    ],
    action: 'filter',
    createdAt: '2023-04-10T14:30:00Z',
    updatedAt: '2023-04-15T09:45:00Z'
  },
  {
    id: 'rule-2',
    name: 'Temperature Unit Converter',
    description: 'Converts temperature from Fahrenheit to Celsius',
    status: 'active',
    pipeline: 'pipeline-1',
    conditions: [
      { field: 'unit', operator: 'equals', value: 'fahrenheit' }
    ],
    action: 'transform',
    transformation: {
      target: 'temperature',
      formula: '(value - 32) * 5/9',
      newUnit: 'celsius'
    },
    createdAt: '2023-04-12T10:15:00Z',
    updatedAt: '2023-04-12T10:15:00Z'
  },
  {
    id: 'rule-3',
    name: 'Motion Alert Generator',
    description: 'Generates alerts when motion is detected in secured areas',
    status: 'active',
    pipeline: 'pipeline-2',
    conditions: [
      { field: 'motionDetected', operator: 'equals', value: true },
      { field: 'area', operator: 'in', value: ['secured', 'restricted'] },
      { field: 'businessHours', operator: 'equals', value: false }
    ],
    action: 'alert',
    alert: {
      level: 'high',
      message: 'Motion detected in secured area outside business hours',
      notifyChannels: ['security', 'admin']
    },
    createdAt: '2023-04-14T16:20:00Z',
    updatedAt: '2023-04-18T11:30:00Z'
  },
  {
    id: 'rule-4',
    name: 'Data Aggregator',
    description: 'Aggregates temperature data into 5-minute windows',
    status: 'inactive',
    pipeline: 'pipeline-1',
    conditions: [],
    action: 'aggregate',
    aggregation: {
      timeWindow: 300,
      functions: [
        { field: 'temperature', function: 'avg', as: 'avgTemperature' },
        { field: 'temperature', function: 'min', as: 'minTemperature' },
        { field: 'temperature', function: 'max', as: 'maxTemperature' }
      ]
    },
    createdAt: '2023-04-16T09:10:00Z',
    updatedAt: '2023-04-16T09:10:00Z'
  }
];
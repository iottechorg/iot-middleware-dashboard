// src/services/mockData/systemSettings.js

// General settings
export const mockGeneralSettings = {
    system: {
      name: 'IoT Middleware Platform',
      description: 'Enterprise IoT Management and Data Processing Platform',
      version: '2.5.0',
      timezone: 'UTC',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24h',
      language: 'en-US',
      theme: 'light',
      logo: '/images/logo.png',
      autoLogout: 30 // minutes
    },
    performance: {
      dataRetention: {
        metrics: 90, // days
        logs: 30, // days
        events: 180 // days
      },
      caching: {
        enabled: true,
        ttl: 300 // seconds
      },
      batchProcessing: {
        enabled: true,
        maxBatchSize: 1000,
        interval: 60 // seconds
      }
    },
    notifications: {
      enabled: true,
      desktopNotifications: true,
      emailNotifications: true,
      emailDigestFrequency: 'daily'
    },
    logging: {
      level: 'info', // debug, info, warn, error
      consoleOutput: true,
      fileOutput: true,
      maxFileSize: 10, // MB
      maxFiles: 5
    },
    updates: {
      checkAutomatically: true,
      downloadAutomatically: false,
      installAutomatically: false,
      checkFrequency: 'daily'
    }
  };
  
  // Network settings
  export const mockNetworkSettings = {
    http: {
      port: 8080,
      host: '0.0.0.0',
      enableHttps: true,
      httpsPort: 8443,
      certificatePath: '/certs/server.crt',
      keyPath: '/certs/server.key',
      maxConnections: 1000,
      connectionTimeout: 120, // seconds
      bodyLimit: '10mb',
      compressionEnabled: true
    },
    websocket: {
      enabled: true,
      port: 8081,
      path: '/ws',
      pingInterval: 30, // seconds
      pingTimeout: 60, // seconds
      maxPayloadSize: '1mb'
    },
    cors: {
      enabled: true,
      allowedOrigins: ['https://admin.example.com', 'https://dashboard.example.com'],
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowCredentials: true,
      maxAge: 86400 // seconds
    },
    proxy: {
      enabled: false,
      host: 'proxy.example.com',
      port: 8888,
      username: 'proxyuser',
      password: '********',
      excludedHosts: ['localhost', '127.0.0.1']
    },
    mqtt: {
      enabled: true,
      port: 1883,
      wsPort: 9001,
      host: '0.0.0.0',
      serverCertificatePath: '/certs/mqtt.crt',
      serverKeyPath: '/certs/mqtt.key',
      maxConnections: 5000,
      maxSubscriptions: 100,
      persistentSessions: true
    },
    discovery: {
      enabled: true,
      protocol: 'mdns',
      interval: 300, // seconds
      timeout: 5, // seconds
      ttl: 255
    }
  };
  
  // Security settings
export const mockSecuritySettings = {
    authentication: {
      method: 'jwt',
      jwtSecret: '********',
      jwtExpiration: 3600, // seconds
      refreshTokenExpiration: 86400, // seconds
      passwordPolicy: {
        minLength: 10,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        maxAge: 90, // days
        preventReuse: 5 // prevent reusing last 5 passwords
      },
      failedLoginAttempts: 5,
      lockoutPeriod: 15, // minutes
      twoFactorAuth: {
        enabled: true,
        method: 'totp',
        issuer: 'IoT Middleware'
      }
    },
    authorization: {
      enabled: true,
      method: 'rbac',
      defaultRole: 'viewer',
      cacheRoles: true,
      cacheTtl: 300 // seconds
    },
    encryption: {
      dataAtRest: true,
      dataInTransit: true,
      algorithm: 'AES-256-GCM',
      keyRotation: {
        enabled: true,
        interval: 30 // days
      }
    },
    tls: {
      minVersion: 'TLSv1.2',
      preferredCipherSuites: [
        'TLS_AES_256_GCM_SHA384',
        'TLS_CHACHA20_POLY1305_SHA256',
        'TLS_AES_128_GCM_SHA256'
      ],
      certCheckEnabled: true,
      certPath: '/certs/ca.crt'
    },
    rateLimiting: {
      enabled: true,
      maxRequests: 100,
      windowMs: 60000, // 1 minute
      message: 'Too many requests, please try again later.',
      headers: true
    },
    audit: {
      enabled: true,
      logLogins: true,
      logActions: true,
      logDataAccess: true,
      retention: 365 // days
    }
  };
  
  // Storage settings
  export const mockStorageSettings = {
    database: {
      type: 'postgres',
      host: 'db.example.com',
      port: 5432,
      username: 'dbuser',
      password: '********',
      database: 'iot_middleware',
      maxConnections: 20,
      minConnections: 5,
      connectionTimeout: 10000, // ms
      idleTimeout: 60000, // ms
      ssl: true,
      backup: {
        enabled: true,
        frequency: 'daily',
        time: '01:00',
        retentionCount: 7
      }
    },
    timeSeries: {
      enabled: true,
      type: 'influxdb',
      url: 'http://timeseries.example.com:8086',
      token: '********',
      organization: 'iotorg',
      bucket: 'telemetry',
      retention: {
        rawData: 30, // days
        aggregatedData: 365 // days
      },
      downsample: {
        enabled: true,
        intervals: ['1m', '1h', '1d']
      }
    },
    fileStorage: {
      type: 's3',
      endpoint: 'https://s3.example.com',
      region: 'us-east-1',
      bucket: 'iot-files',
      accessKey: 'AKIAIOSFODNN7EXAMPLE',
      secretKey: '********',
      useSsl: true,
      uploadLimit: 100, // MB
      allowedTypes: ['.jpg', '.png', '.pdf', '.csv', '.json', '.xml']
    },
    cache: {
      type: 'redis',
      host: 'cache.example.com',
      port: 6379,
      password: '********',
      database: 0,
      ttl: 3600, // seconds
      maxMemory: '1gb',
      evictionPolicy: 'allkeys-lru'
    },
    queue: {
      type: 'rabbitmq',
      host: 'queue.example.com',
      port: 5672,
      username: 'mquser',
      password: '********',
      vhost: '/',
      persistentMessages: true,
      maxPriority: 10
    }
  };
  

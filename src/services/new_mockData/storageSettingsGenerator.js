// src/services/mockData/storageSettingsGenerator.js
import { 
    getRandomInt, 
    getRandomElement, 
    getTimestampMinutesAgo 
  } from './utils';
  
  // Storage Settings
  export const generateStorageVolumes = () => {
    return [
      {
        id: 'v-1',
        name: 'Primary Storage',
        type: 'local',
        path: '/var/lib/iot-middleware/data',
        totalSpace: 500,
        usedSpace: getRandomInt(200, 450),
        status: Math.random() > 0.95 ? 'error' : 'online',
        mountOptions: 'defaults,noatime',
        lastBackup: getTimestampMinutesAgo(getRandomInt(60, 10000))
      },
      {
        id: 'v-2',
        name: 'Archive Storage',
        type: 'local',
        path: '/mnt/archive',
        totalSpace: 2000,
        usedSpace: getRandomInt(500, 1800),
        status: Math.random() > 0.9 ? 'warning' : 'online',
        mountOptions: 'defaults,noatime',
        lastBackup: getTimestampMinutesAgo(getRandomInt(1000, 20000))
      },
      {
        id: 'v-3',
        name: 'S3 Bucket',
        type: 's3',
        bucket: 'iot-middleware-data',
        region: 'us-west-2',
        totalSpace: 5000,
        usedSpace: getRandomInt(500, 3000),
        status: Math.random() > 0.95 ? 'error' : 'online',
        lastBackup: null
      },
      {
        id: 'v-4',
        name: 'Backup Volume',
        type: 'local',
        path: '/mnt/backup',
        totalSpace: 1000,
        usedSpace: getRandomInt(400, 950),
        status: Math.random() > 0.9 ? 'warning' : 'online',
        mountOptions: 'defaults,noatime',
        lastBackup: null
      }
    ];
  };
  
  export const generateStorageDatabases = () => {
    return [
      {
        id: 'db-1',
        name: 'Time Series Database',
        type: 'timescaledb',
        host: 'localhost',
        port: 5432,
        database: 'iot_ts_data',
        username: 'iot_app',
        size: getRandomInt(150, 400),
        connections: getRandomInt(5, 30),
        status: Math.random() > 0.95 ? 'error' : 'online',
        lastBackup: getTimestampMinutesAgo(getRandomInt(60, 5000))
      },
      {
        id: 'db-2',
        name: 'Metadata Database',
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'iot_metadata',
        username: 'iot_app',
        size: getRandomInt(50, 250),
        connections: getRandomInt(3, 20),
        status: Math.random() > 0.9 ? 'warning' : 'online',
        lastBackup: getTimestampMinutesAgo(getRandomInt(60, 5000))
      },
      {
        id: 'db-3',
        name: 'Cache Database',
        type: 'redis',
        host: 'localhost',
        port: 6379,
        database: '0',
        size: getRandomInt(1, 10),
        connections: getRandomInt(10, 50),
        status: Math.random() > 0.95 ? 'error' : 'online',
        lastBackup: getTimestampMinutesAgo(getRandomInt(60, 5000))
      }
    ];
  };
  
  export const generateStorageSettings = () => {
    return {
      local: {
        dataPath: '/var/lib/iot-middleware/data',
        tempPath: '/var/lib/iot-middleware/temp',
        backupPath: '/var/backups/iot-middleware',
        retentionPolicy: {
          enabled: Math.random() > 0.2,
          retentionDays: {
            rawData: getRandomInt(7, 90),
            processedData: getRandomInt(30, 180),
            logs: getRandomInt(7, 30),
            events: getRandomInt(30, 365)
          }
        },
        compression: {
          enabled: Math.random() > 0.3,
          algorithm: getRandomElement(['zstd', 'gzip', 'lz4']),
          level: getRandomInt(1, 9)
        }
      },
      cloud: {
        provider: getRandomElement(['s3', 'azure', 'gcp']),
        enabled: Math.random() > 0.3,
        bucket: 'iot-middleware-data',
        region: getRandomElement(['us-west-2', 'us-east-1', 'eu-west-1']),
        prefix: 'data/',
        credentials: {
          accessKeyId: '************',
          secretAccessKey: '************'
        },
        syncSettings: {
          enabled: Math.random() > 0.2,
          syncInterval: getRandomInt(15, 240),
          syncMode: getRandomElement(['incremental', 'full']),
          syncTypes: ['device-data', 'events', 'backups']
        }
      },
      database: {
        connectTimeout: getRandomInt(10, 60),
        connectionPoolSize: getRandomInt(10, 50),
        maxQueryDuration: getRandomInt(30, 300),
        enableQueryCache: Math.random() > 0.3,
        queryCacheTTL: getRandomInt(60, 1800),
        backupSettings: {
          enabled: Math.random() > 0.2,
          schedule: getRandomElement(['daily', 'weekly']),
          time: `${String(getRandomInt(0, 23)).padStart(2, '0')}:${String(getRandomInt(0, 59)).padStart(2, '0')}`,
          retentionDays: getRandomInt(3, 30),
          compressionEnabled: Math.random() > 0.2
        }
      }
    };
  };
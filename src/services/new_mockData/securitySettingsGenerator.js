// src/services/mockData/securitySettingsGenerator.js
import { 
    getRandomInt, 
    getRandomElement, 
    getTimestampMinutesAgo 
  } from './utils';
  
  // Security Settings
  export const generateSecurityUsers = () => {
    const statuses = ['active', 'inactive'];
    const roles = ['administrator', 'operator', 'viewer', 'developer'];
    
    return [
      {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        role: 'administrator',
        lastLogin: getTimestampMinutesAgo(getRandomInt(10, 2000)),
        status: 'active',
        twoFactorEnabled: Math.random() > 0.3,
      },
      {
        id: 2,
        username: 'operator',
        email: 'operator@example.com',
        role: 'operator',
        lastLogin: getTimestampMinutesAgo(getRandomInt(100, 5000)),
        status: getRandomElement(statuses),
        twoFactorEnabled: Math.random() > 0.7,
      },
      {
        id: 3,
        username: 'viewer',
        email: 'viewer@example.com',
        role: 'viewer',
        lastLogin: getTimestampMinutesAgo(getRandomInt(500, 10000)),
        status: getRandomElement(statuses),
        twoFactorEnabled: Math.random() > 0.8,
      },
      {
        id: 4,
        username: 'developer',
        email: 'developer@example.com',
        role: 'developer',
        lastLogin: getTimestampMinutesAgo(getRandomInt(1000, 20000)),
        status: getRandomElement(statuses),
        twoFactorEnabled: Math.random() > 0.5,
      },
    ];
  };
  
  export const generateSecurityCertificates = () => {
    const now = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(now.getFullYear() + 1);
    
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    
    const getValidToDate = (status) => {
      if (status === 'expired') {
        return new Date(oneYearAgo.getTime() - getRandomInt(1, 30) * 24 * 60 * 60 * 1000).toISOString();
      } else if (status === 'expiring-soon') {
        return new Date(now.getTime() + getRandomInt(1, 30) * 24 * 60 * 60 * 1000).toISOString();
      } else {
        return new Date(now.getTime() + getRandomInt(31, 365) * 24 * 60 * 60 * 1000).toISOString();
      }
    };
    
    const generateFingerprint = () => {
      return `SHA256:${Array(16).fill(0).map(() => getRandomInt(0, 255).toString(16).toUpperCase().padStart(2, '0')).join(':')}`;
    };
    
    const certificates = [
      {
        id: 1,
        name: 'HTTPS Server Certificate',
        type: 'server',
        issuedTo: 'iot-middleware-server.local',
        issuedBy: 'IoT Root CA',
        validFrom: new Date(now.getTime() - getRandomInt(1, 180) * 24 * 60 * 60 * 1000).toISOString(),
        status: getRandomElement(['valid', 'valid', 'valid', 'expiring-soon']),
        algorithm: getRandomElement(['RSA 2048', 'RSA 4096', 'ECC P-256']),
      },
      {
        id: 2,
        name: 'MQTT Broker Certificate',
        type: 'server',
        issuedTo: 'mqtt.iot-middleware-server.local',
        issuedBy: 'IoT Root CA',
        validFrom: new Date(now.getTime() - getRandomInt(1, 180) * 24 * 60 * 60 * 1000).toISOString(),
        status: getRandomElement(['valid', 'valid', 'valid', 'expiring-soon']),
        algorithm: getRandomElement(['RSA 2048', 'RSA 4096', 'ECC P-256']),
      },
      {
        id: 3,
        name: 'API Client Certificate',
        type: 'client',
        issuedTo: 'api-client',
        issuedBy: 'IoT Root CA',
        validFrom: new Date(now.getTime() - getRandomInt(1, 180) * 24 * 60 * 60 * 1000).toISOString(),
        status: getRandomElement(['valid', 'expiring-soon', 'expiring-soon']),
        algorithm: getRandomElement(['RSA 2048', 'RSA 4096']),
      },
      {
        id: 4,
        name: 'Expired Certificate',
        type: 'client',
        issuedTo: 'old-device',
        issuedBy: 'IoT Root CA',
        validFrom: new Date(now.getTime() - getRandomInt(400, 700) * 24 * 60 * 60 * 1000).toISOString(),
        status: 'expired',
        algorithm: 'RSA 2048',
      },
    ];
    
    // Set validTo dates based on status and add fingerprints
    certificates.forEach(cert => {
      cert.validTo = getValidToDate(cert.status);
      cert.fingerprint = generateFingerprint();
    });
    
    return certificates;
  };
  
  export const generateSecuritySettings = () => {
    return {
      general: {
        passwordPolicy: {
          minLength: getRandomInt(8, 16),
          requireUppercase: Math.random() > 0.2,
          requireLowercase: Math.random() > 0.1,
          requireNumbers: Math.random() > 0.2,
          requireSpecialChars: Math.random() > 0.3,
          passwordExpiryDays: getRandomInt(30, 180),
          preventReuseCount: getRandomInt(3, 10),
        },
        sessionTimeout: getRandomInt(15, 60),
        maxLoginAttempts: getRandomInt(3, 10),
        lockoutDuration: getRandomInt(5, 30),
        enableTwoFactor: Math.random() > 0.3,
      },
      tls: {
        minTlsVersion: getRandomElement(['tls1.2', 'tls1.3']),
        preferredCipherSuites: 'TLS_AES_256_GCM_SHA384,TLS_CHACHA20_POLY1305_SHA256',
        enableStrictTransportSecurity: Math.random() > 0.2,
        hstsMaxAge: getRandomInt(15768000, 63072000),
        enableOcspStapling: Math.random() > 0.3,
        enforceCertificateRevocation: Math.random() > 0.4,
      },
      api: {
        tokenExpiration: getRandomInt(30, 120),
        jwtAlgorithm: getRandomElement(['RS256', 'ES256', 'HS256']),
        enableApiKeyAuth: Math.random() > 0.2,
        apiKeyExpirationDays: getRandomInt(30, 730),
        enforceHttps: Math.random() > 0.1,
      },
    };
  };
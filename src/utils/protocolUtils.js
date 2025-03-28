// src/utils/protocolUtils.js

/**
 * Utility functions for working with IoT protocols
 */

// List of supported protocols with their specifications
/**
 * Get configuration template for a specific protocol
 * 
 * @param {string} protocolName The name of the protocol
 * @returns {Object|null} Protocol configuration template or null if not found
 */
export const getProtocolConfig = (protocolName) => {
    const protocol = PROTOCOLS[protocolName.toUpperCase()];
    if (!protocol) return null;
    
    return {
      name: protocol.name,
      type: protocol.type,
      // Generate default config from configFields
      config: protocol.configFields.reduce((config, field) => {
        if (field.default !== undefined) {
          config[field.name] = field.default;
        }
        return config;
      }, {})
    };
  };
  
  /**
   * Validate protocol configuration against its specification
   * 
   * @param {string} protocolName Protocol name
   * @param {Object} config Configuration to validate
   * @returns {Object} Validation result with errors if any
   */
  export const validateProtocolConfig = (protocolName, config) => {
    const protocol = PROTOCOLS[protocolName.toUpperCase()];
    if (!protocol) {
      return { valid: false, errors: { _general: 'Unknown protocol' } };
    }
    
    const errors = {};
    let valid = true;
    
    // Check required fields
    protocol.configFields.forEach(field => {
      // Skip fields that depend on other fields unless the dependency is met
      if (field.dependsOn) {
        const { field: depField, value, values } = field.dependsOn;
        const currentValue = config[depField];
        
        // Skip validation if dependency is not met
        if ((value && currentValue !== value) || 
            (values && !values.includes(currentValue))) {
          return;
        }
      }
      
      if (field.required && (config[field.name] === undefined || config[field.name] === null || config[field.name] === '')) {
        errors[field.name] = `${field.label} is required`;
        valid = false;
      }
    });
    
    return { valid, errors };
  };
  
  /**
   * Get a list of supported protocols with basic info
   * 
   * @returns {Array} Array of protocol objects with basic information
   */
  export const getSupportedProtocols = () => {
    return Object.entries(PROTOCOLS).map(([key, protocol]) => ({
      id: key,
      name: protocol.name,
      type: protocol.type,
      description: protocol.description,
      versions: protocol.versions
    }));
  };
  
  // List of supported protocols with their specifications
  export const PROTOCOLS = {
    MQTT: {
      name: 'MQTT',
      type: 'Pub/Sub',
      versions: ['3.1', '3.1.1', '5.0'],
      defaultPorts: { standard: 1883, secure: 8883 },
      description: 'A lightweight publish/subscribe messaging protocol designed for constrained devices and low-bandwidth, high-latency or unreliable networks',
      qosLevels: [
        { value: 0, label: 'At most once (0)', description: 'Fire and forget - no guarantee of delivery' },
        { value: 1, label: 'At least once (1)', description: 'Guaranteed delivery but with possible duplicates' },
        { value: 2, label: 'Exactly once (2)', description: 'Guaranteed delivery exactly once, with increased overhead' }
      ],
      configFields: [
        { name: 'host', label: 'Broker Host', type: 'text', required: true },
        { name: 'port', label: 'Port', type: 'number', required: true, default: 1883 },
        { name: 'clientId', label: 'Client ID', type: 'text', required: false },
        { name: 'username', label: 'Username', type: 'text', required: false },
        { name: 'password', label: 'Password', type: 'password', required: false },
        { name: 'tls', label: 'Use TLS/SSL', type: 'boolean', required: false, default: false },
        { name: 'qos', label: 'Default QoS Level', type: 'select', options: [0, 1, 2], required: false, default: 0 },
        { name: 'keepAlive', label: 'Keep Alive (seconds)', type: 'number', required: false, default: 60 },
        { name: 'cleanSession', label: 'Clean Session', type: 'boolean', required: false, default: true },
        { name: 'willTopic', label: 'Will Topic', type: 'text', required: false },
        { name: 'willMessage', label: 'Will Message', type: 'text', required: false },
        { name: 'willQos', label: 'Will QoS', type: 'select', options: [0, 1, 2], required: false, default: 0 },
        { name: 'willRetain', label: 'Will Retain', type: 'boolean', required: false, default: false }
      ]
    },
    
    CoAP: {
      name: 'CoAP',
      type: 'Request/Response',
      versions: ['1.0', '1.1'],
      defaultPorts: { standard: 5683, secure: 5684 },
      description: 'A specialized web transfer protocol for use with constrained nodes and networks, designed for machine-to-machine applications',
      configFields: [
        { name: 'port', label: 'Port', type: 'number', required: true, default: 5683 },
        { name: 'blockSize', label: 'Block Size (bytes)', type: 'number', required: false, default: 1024 },
        { name: 'timeout', label: 'Request Timeout (seconds)', type: 'number', required: false, default: 30 },
        { name: 'retransmitCount', label: 'Max Retransmit Count', type: 'number', required: false, default: 4 },
        { name: 'dtlsEnabled', label: 'Enable DTLS', type: 'boolean', required: false, default: false },
        { name: 'dtlsPreSharedKey', label: 'DTLS Pre-Shared Key', type: 'text', required: false },
        { name: 'dtlsPreSharedKeyIdentity', label: 'DTLS Pre-Shared Key Identity', type: 'text', required: false },
        { name: 'observeEnabled', label: 'Enable Observe', type: 'boolean', required: false, default: true }
      ]
    },
    
    HTTP: {
      name: 'HTTP',
      type: 'Request/Response',
      versions: ['1.0', '1.1', '2.0'],
      defaultPorts: { standard: 80, secure: 443 },
      description: 'The foundational protocol of the World Wide Web, used for hypermedia systems',
      configFields: [
        { name: 'port', label: 'Port', type: 'number', required: true, default: 8080 },
        { name: 'tls', label: 'Use TLS/SSL (HTTPS)', type: 'boolean', required: false, default: true },
        { name: 'maxConnections', label: 'Max Connections', type: 'number', required: false, default: 1000 },
        { name: 'timeout', label: 'Request Timeout (seconds)', type: 'number', required: false, default: 30 },
        { name: 'corsEnabled', label: 'Enable CORS', type: 'boolean', required: false, default: true },
        { name: 'authType', label: 'Authentication Type', type: 'select', options: ['none', 'basic', 'digest', 'token', 'oauth'], required: false, default: 'none' },
        { name: 'compressionEnabled', label: 'Enable Compression', type: 'boolean', required: false, default: true }
      ]
    },
    
    Modbus: {
      name: 'Modbus',
      type: 'Master/Slave',
      versions: ['RTU', 'TCP', 'ASCII'],
      defaultPorts: { tcp: 502 },
      description: 'A serial communications protocol for use with programmable logic controllers (PLCs)',
      configFields: [
        { name: 'type', label: 'Modbus Type', type: 'select', options: ['TCP', 'RTU', 'ASCII'], required: true, default: 'TCP' },
        { name: 'port', label: 'TCP Port', type: 'number', required: true, default: 502, dependsOn: { field: 'type', value: 'TCP' } },
        { name: 'serialPort', label: 'Serial Port', type: 'text', required: true, default: '/dev/ttyUSB0', dependsOn: { field: 'type', values: ['RTU', 'ASCII'] } },
        { name: 'baudRate', label: 'Baud Rate', type: 'select', options: [9600, 19200, 38400, 57600, 115200], required: true, default: 9600, dependsOn: { field: 'type', values: ['RTU', 'ASCII'] } },
        { name: 'dataBits', label: 'Data Bits', type: 'select', options: [7, 8], required: true, default: 8, dependsOn: { field: 'type', values: ['RTU', 'ASCII'] } },
        { name: 'stopBits', label: 'Stop Bits', type: 'select', options: [1, 2], required: true, default: 1, dependsOn: { field: 'type', values: ['RTU', 'ASCII'] } },
        { name: 'parity', label: 'Parity', type: 'select', options: ['none', 'odd', 'even'], required: true, default: 'none', dependsOn: { field: 'type', values: ['RTU', 'ASCII'] } },
        { name: 'timeout', label: 'Timeout (ms)', type: 'number', required: false, default: 1000 },
        { name: 'retries', label: 'Retries', type: 'number', required: false, default: 3 },
        { name: 'unitId', label: 'Unit ID / Slave ID', type: 'number', required: false, default: 1 }
      ]
    },
    
    BLE: {
      name: 'BLE',
      type: 'Wireless',
      versions: ['4.0', '4.1', '4.2', '5.0', '5.1', '5.2', '5.3'],
      description: 'Bluetooth Low Energy, a wireless personal area network technology designed for novel applications in healthcare, fitness, security, and home entertainment',
      configFields: [
        { name: 'scanInterval', label: 'Scan Interval (ms)', type: 'number', required: false, default: 5000 },
        { name: 'scanWindow', label: 'Scan Window (ms)', type: 'number', required: false, default: 2500 },
        { name: 'activeScan', label: 'Active Scan', type: 'boolean', required: false, default: true },
        { name: 'filterDuplicates', label: 'Filter Duplicates', type: 'boolean', required: false, default: true },
        { name: 'connectionTimeout', label: 'Connection Timeout (ms)', type: 'number', required: false, default: 10000 },
        { name: 'mtu', label: 'MTU Size', type: 'number', required: false, default: 512 },
        { name: 'securityLevel', label: 'Security Level', type: 'select', options: ['low', 'medium', 'high'], required: false, default: 'medium' },
        { name: 'bondingEnabled', label: 'Enable Bonding', type: 'boolean', required: false, default: true }
      ]
    },
    
    Zigbee: {
      name: 'Zigbee',
      type: 'Mesh',
      versions: ['2.4', '3.0', 'PRO'],
      description: 'Low-power, wireless mesh network standard designed for personal area networks with low-data-rate requirements',
      configFields: [
        { name: 'panId', label: 'PAN ID', type: 'text', required: true, default: '0x1A2B' },
        { name: 'channel', label: 'Channel', type: 'select', options: Array.from({ length: 16 }, (_, i) => i + 11), required: true, default: 15 },
        { name: 'extendedPanId', label: 'Extended PAN ID', type: 'text', required: false },
        { name: 'networkKey', label: 'Network Key', type: 'text', required: false },
        { name: 'securityLevel', label: 'Security Level', type: 'select', options: [0, 1, 2, 3, 4, 5], required: false, default: 5 },
        { name: 'permitJoin', label: 'Permit Join', type: 'boolean', required: false, default: false },
        { name: 'permitJoinTime', label: 'Permit Join Time (seconds)', type: 'number', required: false, default: 60 },
        { name: 'txPower', label: 'TX Power', type: 'select', options: [-18, -15, -11, -7, -4, 0, 1, 3, 5], required: false, default: 0 }
      ]
    },
    
    LoRaWAN: {
      name: 'LoRaWAN',
      type: 'LPWAN',
      versions: ['1.0', '1.0.1', '1.0.2', '1.0.3', '1.0.4', '1.1'],
      description: 'Long Range Wide Area Network protocol designed to wirelessly connect battery operated devices to the internet in regional, national or global networks',
      configFields: [
        { name: 'appEUI', label: 'Application EUI', type: 'text', required: true },
        { name: 'appKey', label: 'Application Key', type: 'text', required: true },
        { name: 'devEUI', label: 'Device EUI', type: 'text', required: true },
        { name: 'region', label: 'Region', type: 'select', options: ['EU868', 'US915', 'AU915', 'AS923', 'CN470', 'KR920', 'IN865', 'RU864'], required: true, default: 'EU868' },
        { name: 'activationType', label: 'Activation Type', type: 'select', options: ['OTAA', 'ABP'], required: true, default: 'OTAA' },
        { name: 'devAddr', label: 'Device Address', type: 'text', required: false, dependsOn: { field: 'activationType', value: 'ABP' } },
        { name: 'nwkSKey', label: 'Network Session Key', type: 'text', required: false, dependsOn: { field: 'activationType', value: 'ABP' } },
        { name: 'appSKey', label: 'App Session Key', type: 'text', required: false, dependsOn: { field: 'activationType', value: 'ABP' } },
        { name: 'dataRate', label: 'Data Rate', type: 'select', options: [0, 1, 2, 3, 4, 5], required: false, default: 3 },
        { name: 'adr', label: 'Adaptive Data Rate', type: 'boolean', required: false, default: true },
        { name: 'confirmMode', label: 'Confirm Mode', type: 'boolean', required: false, default: false }
      ]
    }
  };
  
  /**
   * Format traffic data for visualization
   * 
   * @param {Array} rawData Raw traffic data
   * @param {Object} options Formatting options
   * @returns {Array} Formatted data for charts
   */
  export const formatTrafficData = (rawData, options = {}) => {
    const { timeFormat = 'hour', aggregation = 'sum' } = options;
    
    if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
      return [];
    }
    
    // Sort data by timestamp
    const sortedData = [...rawData].sort((a, b) => a.timestamp - b.timestamp);
    
    // Group by time interval
    const groupedData = {};
    
    sortedData.forEach(item => {
      const date = new Date(item.timestamp);
      let key;
      
      switch (timeFormat) {
        case 'minute':
          key = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()).getTime();
          break;
        case 'hour':
          key = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()).getTime();
          break;
        case 'day':
          key = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
          break;
        case 'month':
          key = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
          break;
        default:
          key = item.timestamp;
      }
      
      if (!groupedData[key]) {
        groupedData[key] = {
          timestamp: key,
          inbound: 0,
          outbound: 0,
          count: 0
        };
      }
      
      groupedData[key].inbound += item.inbound || 0;
      groupedData[key].outbound += item.outbound || 0;
      groupedData[key].count += 1;
    });
    
    // Convert to array and aggregate if needed
    const result = Object.values(groupedData).map(group => {
      if (aggregation === 'average' && group.count > 0) {
        return {
          ...group,
          inbound: group.inbound / group.count,
          outbound: group.outbound / group.count
        };
      }
      return group;
    });
    
    return result;
  };
  
  /**
   * Calculate protocol statistics from devices data
   * 
   * @param {Array} devices Array of device objects
   * @returns {Object} Protocol statistics
   */
  export const calculateProtocolStats = (devices) => {
    if (!devices || !Array.isArray(devices)) {
      return {
        distribution: {},
        total: 0,
        active: 0,
        inactive: 0
      };
    }
    
    // Count devices by protocol
    const distribution = devices.reduce((acc, device) => {
      const protocol = device.protocol || 'Unknown';
      acc[protocol] = (acc[protocol] || 0) + 1;
      return acc;
    }, {});
    
    // Count active/inactive protocols
    const protocolStatus = devices.reduce((acc, device) => {
      const protocol = device.protocol || 'Unknown';
      const status = device.status || 'unknown';
      
      if (!acc[protocol]) {
        acc[protocol] = { active: 0, inactive: 0, total: 0 };
      }
      
      acc[protocol].total += 1;
      
      if (status === 'online' || status === 'active') {
        acc[protocol].active += 1;
      } else {
        acc[protocol].inactive += 1;
      }
      
      return acc;
    }, {});
    
    // Total counts
    const total = devices.length;
    const active = devices.filter(d => 
      d.status === 'online' || d.status === 'active'
    ).length;
    const inactive = total - active;
    
    return {
      distribution,
      protocolStatus,
      total,
      active,
      inactive
    };
  };
  
  export default {
    PROTOCOLS,
    getProtocolConfig,
    validateProtocolConfig,
    getSupportedProtocols,
    formatTrafficData,
    calculateProtocolStats
  };
// src/services/mockData/rules.js

const mockRules = [
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
  },
  {
    id: 'rule-5',
    name: 'Energy Consumption Hourly Aggregation',
    description: 'Aggregates energy consumption data into hourly buckets',
    status: 'active',
    pipeline: 'pipeline-3',
    conditions: [],
    action: 'aggregate',
    aggregation: {
      timeWindow: 3600,
      functions: [
        { field: 'energyConsumption', function: 'sum', as: 'hourlyEnergyConsumption' },
        { field: 'energyConsumption', function: 'avg', as: 'avgHourlyEnergyConsumption' },
        { field: 'energyConsumption', function: 'max', as: 'peakHourlyEnergyConsumption' }
      ]
    },
    createdAt: '2023-04-02T11:25:00Z',
    updatedAt: '2023-04-10T14:30:00Z'
  },
  {
    id: 'rule-6',
    name: 'Energy Consumption Daily Aggregation',
    description: 'Aggregates energy consumption data into daily buckets',
    status: 'active',
    pipeline: 'pipeline-3',
    conditions: [],
    action: 'aggregate',
    aggregation: {
      timeWindow: 86400,
      functions: [
        { field: 'energyConsumption', function: 'sum', as: 'dailyEnergyConsumption' },
        { field: 'energyConsumption', function: 'avg', as: 'avgDailyEnergyConsumption' },
        { field: 'cost', function: 'sum', as: 'dailyEnergyCost' }
      ]
    },
    createdAt: '2023-04-02T11:30:00Z',
    updatedAt: '2023-04-10T14:32:00Z'
  },
  {
    id: 'rule-7',
    name: 'High Energy Usage Alert',
    description: 'Generates alert when energy consumption exceeds threshold',
    status: 'active',
    pipeline: 'pipeline-3',
    conditions: [
      { field: 'hourlyEnergyConsumption', operator: 'greaterThan', value: 5 }
    ],
    action: 'alert',
    alert: {
      level: 'medium',
      message: 'High energy consumption detected: {value} kWh in the last hour',
      notifyChannels: ['energy-management', 'admin']
    },
    createdAt: '2023-04-05T08:45:00Z',
    updatedAt: '2023-04-10T14:35:00Z'
  },
  {
    id: 'rule-8',
    name: 'Environmental Data Validation',
    description: 'Validates environmental sensor readings',
    status: 'inactive',
    pipeline: 'pipeline-4',
    conditions: [
      { field: 'temperature', operator: 'lessThan', value: -50 },
      { field: 'temperature', operator: 'greaterThan', value: 60 },
      { field: 'humidity', operator: 'lessThan', value: 0 },
      { field: 'humidity', operator: 'greaterThan', value: 100 },
      { field: 'co2', operator: 'lessThan', value: 0 },
      { field: 'co2', operator: 'greaterThan', value: 5000 }
    ],
    action: 'filter',
    createdAt: '2023-04-18T13:20:00Z',
    updatedAt: '2023-04-18T13:20:00Z'
  }
];

export default mockRules;
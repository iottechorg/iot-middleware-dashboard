// src/components/panels/overview/ResourceUtilization.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import LineChart from '../charts/LineChart';

/**
 * Resource utilization chart for CPU, memory, etc.
 * @param {Object} props
 * @param {Array} props.data - Time series data for resource utilization
 * @param {boolean} [props.loading=false] - Whether data is loading
 */
const ResourceUtilization = ({
  data = [],
  loading = false,
  ...props
}) => {
  const [timeRange, setTimeRange] = useState('1h');
  
  // Configuration for the metrics to display
  const metrics = [
    { 
      id: 'cpu', 
      dataKey: 'cpu', 
      name: 'CPU Usage (%)', 
      color: '#10B981', // green-500
      checked: true,
    },
    { 
      id: 'memory', 
      dataKey: 'memory', 
      name: 'Memory Usage (%)', 
      color: '#F59E0B', // amber-500
      checked: true,
    },
    { 
      id: 'diskIo', 
      dataKey: 'diskIo', 
      name: 'Disk I/O (%)', 
      color: '#8B5CF6', // violet-500
      checked: false,
    },
    { 
      id: 'network', 
      dataKey: 'network', 
      name: 'Network Usage (%)', 
      color: '#EC4899', // pink-500
      checked: false,
    }
  ];
  
  // Filter metrics based on checked status
  const [selectedMetrics, setSelectedMetrics] = useState(
    metrics.filter(m => m.checked).map(m => m.id)
  );
  
  // Toggle a metric's visibility
  const toggleMetric = (metricId) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };
  
  // Time range options
  const timeRangeOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '6h', label: '6 Hours' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
  ];
  
  // Calculate current utilization values
  const currentValues = data.length > 0 ? data[data.length - 1] : {};
  
  // Configure chart lines based on selected metrics
  const lines = metrics
    .filter(metric => selectedMetrics.includes(metric.id))
    .map(metric => ({
      dataKey: metric.dataKey,
      name: metric.name,
      color: metric.color,
      showDots: false,
    }));
  
  // Render loading state
  if (loading) {
    return (
      <Card title="Resource Utilization" className="h-full" {...props}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="h-full" {...props}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Resource Utilization</h3>
        
        <div className="flex space-x-2">
          {timeRangeOptions.map(option => (
            <button
              key={option.value}
              className={`px-2 py-1 text-xs rounded ${
                timeRange === option.value
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTimeRange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col h-full">
        <div className="flex-1 min-h-[200px]">
          <LineChart
            data={data}
            lines={lines}
            xAxisKey="time"
            height="100%"
          />
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4">
          {metrics.map(metric => (
            <div key={metric.id} className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  checked={selectedMetrics.includes(metric.id)}
                  onChange={() => toggleMetric(metric.id)}
                />
                <span 
                  className="ml-2 flex items-center text-sm font-medium"
                >
                  <span 
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: metric.color }}
                  />
                  {metric.name}
                  {selectedMetrics.includes(metric.id) && currentValues[metric.dataKey] !== undefined && (
                    <span className="ml-1 text-xs text-gray-500">
                      ({currentValues[metric.dataKey].toFixed(1)}%)
                    </span>
                  )}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ResourceUtilization;
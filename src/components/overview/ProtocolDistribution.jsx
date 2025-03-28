// src/components/panels/overview/ProtocolDistribution.jsx
import React from 'react';
import Card from '../common/Card';
import PieChart from '../charts/PieChart';

/**
 * Protocol distribution chart and metrics
 * @param {Object} props
 * @param {Array} props.data - Protocol distribution data
 * @param {boolean} [props.loading=false] - Whether data is loading
 */
const ProtocolDistribution = ({
  data = [],
  loading = false,
  ...props
}) => {
  // Colors for different protocols
  const protocolColors = {
    'MQTT': '#3B82F6', // blue-500
    'CoAP': '#10B981', // green-500
    'HTTP': '#F59E0B', // amber-500
    'WebSocket': '#8B5CF6', // violet-500
    'AMQP': '#EC4899', // pink-500
    'Other': '#6B7280', // gray-500
  };
  
  // Map data to colors
  const colors = data.map(item => 
    protocolColors[item.name] || protocolColors['Other']
  );
  
  // Calculate total connections
  const totalConnections = data.reduce((sum, item) => sum + item.value, 0);
  
  // Render loading state
  if (loading) {
    return (
      <Card title="Protocol Distribution" className="h-full" {...props}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card title="Protocol Distribution" className="h-full" {...props}>
      <div className="flex flex-col h-full">
        <div className="flex-1 min-h-[200px]">
          <PieChart
            data={data}
            nameKey="name"
            dataKey="value"
            colors={colors}
            height="100%"
          />
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {data.map(protocol => (
            <div key={protocol.name} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: protocolColors[protocol.name] || protocolColors['Other'] }}
              />
              <div>
                <p className="text-sm font-medium">{protocol.name}</p>
                <p className="text-xs text-gray-500">
                  {((protocol.value / totalConnections) * 100).toFixed(1)}% ({protocol.value})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProtocolDistribution;
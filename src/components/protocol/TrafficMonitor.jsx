// src/components/protocol/TrafficMonitor.jsx

import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

const TrafficMonitor = ({ protocol, trafficData = [], isLoading = false, error = null }) => {
  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format data for chart
  const formattedData = trafficData.map(item => ({
    ...item,
    time: formatTimestamp(item.timestamp),
    total: item.inbound + item.outbound
  }));

  // Calculate totals
  const totalInbound = trafficData.reduce((sum, item) => sum + item.inbound, 0);
  const totalOutbound = trafficData.reduce((sum, item) => sum + item.outbound, 0);
  const total = totalInbound + totalOutbound;

  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (isLoading) {
    return (
      <Card>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center p-8 text-center h-64">
          <FiAlertTriangle className="w-12 h-12 mb-4 text-red-500" />
          <h3 className="text-lg font-medium text-gray-900">Error loading traffic data</h3>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
        </div>
      </Card>
    );
  }

  if (!trafficData || trafficData.length === 0) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center p-8 text-center h-64">
          <FiAlertTriangle className="w-12 h-12 mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">No traffic data available</h3>
          <p className="mt-2 text-sm text-gray-500">There is no traffic data available for this protocol.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-800">Inbound Traffic</p>
              <p className="text-2xl font-bold text-blue-900">{formatNumber(totalInbound)} packets</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="text-sm font-medium text-green-800">Outbound Traffic</p>
              <p className="text-2xl font-bold text-green-900">{formatNumber(totalOutbound)} packets</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="text-sm font-medium text-gray-800">Total Traffic</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(total)} packets</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Chart</h3>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="inbound" name="Inbound" stroke="#3B82F6" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="outbound" name="Outbound" stroke="#10B981" />
                <Line type="monotone" dataKey="total" name="Total" stroke="#6B7280" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Data Table</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inbound</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outbound</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formattedData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{formatNumber(item.inbound)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{formatNumber(item.outbound)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrafficMonitor;
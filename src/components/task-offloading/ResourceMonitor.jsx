// src/components/task-offloading/ResourceMonitor.jsx
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Progress, Statistic, Select, Space, Tooltip, Badge } from 'antd';
import { 
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  WarningOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  CloudServerOutlined,
  LaptopOutlined,
  MobileOutlined,
  RocketOutlined
} from '@ant-design/icons';

const { Option } = Select;

const ResourceMonitor = () => {
  const [resourceData, setResourceData] = useState({
    cpu: {
      current: 0,
      history: []
    },
    memory: {
      current: 0,
      history: []
    },
    network: {
      current: 0,
      history: []
    },
    devices: {
      edge: 0,
      cloud: 0,
      fog: 0
    },
    tasks: {
      active: 0,
      queued: 0,
      completed: 0,
      failed: 0
    }
  });
  const [timeRange, setTimeRange] = useState('1h');
  const [offloadMetrics, setOffloadMetrics] = useState([]);
  const [resourceAllocation, setResourceAllocation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with actual API calls
    const fetchResourceData = async () => {
      try {
        // Simulate fetching data
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock CPU data
        const cpuHistory = generateMockTimeSeriesData(
          timeRange === '1h' ? 60 : timeRange === '6h' ? 360 : 1440,
          25, 75
        );
        
        // Mock memory data
        const memoryHistory = generateMockTimeSeriesData(
          timeRange === '1h' ? 60 : timeRange === '6h' ? 360 : 1440,
          40, 85
        );
        
        // Mock network data
        const networkHistory = generateMockTimeSeriesData(
          timeRange === '1h' ? 60 : timeRange === '6h' ? 360 : 1440,
          10, 90,
          true // More spiky
        );

        // Mock offload metrics
        const mockOffloadMetrics = [
          { name: 'Edge', value: 42 },
          { name: 'Fog', value: 28 },
          { name: 'Cloud', value: 30 }
        ];

        // Mock resource allocation
        const mockResourceAllocation = [
          { name: 'Data Processing', cpu: 35, memory: 45, network: 20 },
          { name: 'ML Inference', cpu: 25, memory: 30, network: 10 },
          { name: 'Sensor Data Collection', cpu: 15, memory: 10, network: 40 },
          { name: 'Protocol Translation', cpu: 10, memory: 5, network: 15 },
          { name: 'Dashboard Services', cpu: 15, memory: 10, network: 15 }
        ];

        // Update state with mock data
        setResourceData({
          cpu: {
            current: cpuHistory[cpuHistory.length - 1].value,
            history: cpuHistory
          },
          memory: {
            current: memoryHistory[memoryHistory.length - 1].value,
            history: memoryHistory
          },
          network: {
            current: networkHistory[networkHistory.length - 1].value,
            history: networkHistory
          },
          devices: {
            edge: 28,
            cloud: 12,
            fog: 17
          },
          tasks: {
            active: 14,
            queued: 5,
            completed: 127,
            failed: 3
          }
        });

        setOffloadMetrics(mockOffloadMetrics);
        setResourceAllocation(mockResourceAllocation);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching resource data:', error);
        setLoading(false);
      }
    };

    fetchResourceData();

    // Set up polling interval
    const interval = setInterval(fetchResourceData, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [timeRange]);

  // Helper function to generate mock time series data
  const generateMockTimeSeriesData = (points, min, max, spiky = false) => {
    const now = new Date();
    const data = [];
    
    let lastValue = Math.floor(min + Math.random() * (max - min));
    
    for (let i = points; i >= 0; i--) {
      const time = new Date(now.getTime() - i * (timeRange === '1h' ? 60000 : timeRange === '6h' ? 10000 : 1000));
      
      // Calculate next value with some randomness
      let change = spiky
        ? Math.random() > 0.9 ? Math.random() * 30 - 15 : Math.random() * 6 - 3
        : Math.random() * 6 - 3;
      
      let newValue = lastValue + change;
      
      // Keep within bounds
      newValue = Math.max(min, Math.min(max, newValue));
      
      data.push({
        time: time.toISOString(),
        value: parseFloat(newValue.toFixed(1))
      });
      
      lastValue = newValue;
    }
    
    return data;
  };

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    setLoading(true);
  };

  const getResourceStatusColor = (value) => {
    if (value >= 90) return '#f5222d'; // Red
    if (value >= 75) return '#fa8c16'; // Orange
    if (value >= 60) return '#faad14'; // Yellow
    return '#52c41a'; // Green
  };

  const formatTimeLabel = (time) => {
    const date = new Date(time);
    // Format based on time range
    if (timeRange === '1h') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === '6h') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
  };

  return (
    <div className="resource-monitor">
      <div className="resource-monitor-header">
        <h2>System Resources</h2>
        <div className="time-range-selector">
          <Space>
            <span>Time Range:</span>
            <Select value={timeRange} onChange={handleTimeRangeChange} loading={loading}>
              <Option value="1h">Last Hour</Option>
              <Option value="6h">Last 6 Hours</Option>
              <Option value="24h">Last 24 Hours</Option>
            </Select>
          </Space>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {/* CPU Usage */}
        <Col xs={24} sm={24} md={8}>
          <Card title="CPU Utilization" loading={loading}>
            <div className="resource-gauge">
              <Progress
                type="dashboard"
                percent={resourceData.cpu.current}
                strokeColor={getResourceStatusColor(resourceData.cpu.current)}
                width={120}
              />
              <div className="resource-details">
                <Statistic 
                  title="Current" 
                  value={resourceData.cpu.current} 
                  precision={1}
                  suffix="%" 
                  valueStyle={{ color: getResourceStatusColor(resourceData.cpu.current) }}
                />
                {resourceData.cpu.current > 85 && (
                  <Tooltip title="High CPU usage may affect system performance">
                    <WarningOutlined style={{ color: '#f5222d', fontSize: 16, marginLeft: 8 }} />
                  </Tooltip>
                )}
              </div>
            </div>
            <div className="resource-chart">
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={resourceData.cpu.history}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1890ff"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    hide={true}
                  />
                  <XAxis 
                    dataKey="time" 
                    tickFormatter={formatTimeLabel} 
                    minTickGap={50}
                    hide={true}
                  />
                  <RechartsTooltip
                    formatter={(value) => [`${value}%`, 'CPU']}
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* Memory Usage */}
        <Col xs={24} sm={24} md={8}>
          <Card title="Memory Utilization" loading={loading}>
            <div className="resource-gauge">
              <Progress
                type="dashboard"
                percent={resourceData.memory.current}
                strokeColor={getResourceStatusColor(resourceData.memory.current)}
                width={120}
              />
              <div className="resource-details">
                <Statistic 
                  title="Current" 
                  value={resourceData.memory.current} 
                  precision={1}
                  suffix="%" 
                  valueStyle={{ color: getResourceStatusColor(resourceData.memory.current) }}
                />
                {resourceData.memory.current > 90 && (
                  <Tooltip title="Memory usage is very high, consider optimizing or offloading tasks">
                    <WarningOutlined style={{ color: '#f5222d', fontSize: 16, marginLeft: 8 }} />
                  </Tooltip>
                )}
              </div>
            </div>
            <div className="resource-chart">
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={resourceData.memory.history}>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#722ed1"
                    fill="#f9f0ff"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    hide={true}
                  />
                  <XAxis 
                    dataKey="time" 
                    tickFormatter={formatTimeLabel} 
                    minTickGap={50}
                    hide={true}
                  />
                  <RechartsTooltip
                    formatter={(value) => [`${value}%`, 'Memory']}
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* Network Usage */}
        <Col xs={24} sm={24} md={8}>
          <Card title="Network Utilization" loading={loading}>
            <div className="resource-gauge">
              <Progress
                type="dashboard"
                percent={resourceData.network.current}
                strokeColor={getResourceStatusColor(resourceData.network.current)}
                width={120}
              />
              <div className="resource-details">
                <Statistic 
                  title="Current" 
                  value={resourceData.network.current} 
                  precision={1}
                  suffix="%" 
                  valueStyle={{ color: getResourceStatusColor(resourceData.network.current) }}
                />
                {resourceData.network.current > 80 && (
                  <Tooltip title="High network utilization may cause latency issues">
                    <WarningOutlined style={{ color: '#fa8c16', fontSize: 16, marginLeft: 8 }} />
                  </Tooltip>
                )}
              </div>
            </div>
            <div className="resource-chart">
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={resourceData.network.history}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#13c2c2"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    hide={true}
                  />
                  <XAxis 
                    dataKey="time" 
                    tickFormatter={formatTimeLabel} 
                    minTickGap={50}
                    hide={true}
                  />
                  <RechartsTooltip
                    formatter={(value) => [`${value}%`, 'Network']}
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* Connected Devices */}
        <Col xs={24} sm={12} md={6}>
          <Card title="Connected Devices" loading={loading}>
            <div className="device-stats">
              <div className="device-stat-item">
                <CloudServerOutlined className="device-icon cloud" />
                <Statistic 
                  title="Cloud" 
                  value={resourceData.devices.cloud} 
                  valueStyle={{ fontSize: '24px' }}
                />
              </div>
              <div className="device-stat-item">
                <LaptopOutlined className="device-icon fog" />
                <Statistic 
                  title="Fog" 
                  value={resourceData.devices.fog} 
                  valueStyle={{ fontSize: '24px' }}
                />
              </div>
              <div className="device-stat-item">
                <MobileOutlined className="device-icon edge" />
                <Statistic 
                  title="Edge" 
                  value={resourceData.devices.edge} 
                  valueStyle={{ fontSize: '24px' }}
                />
              </div>
            </div>
          </Card>
        </Col>

        {/* Task Status */}
        <Col xs={24} sm={12} md={6}>
          <Card title="Task Status" loading={loading}>
            <div className="task-stats">
              <div className="task-stat-row">
                <Badge status="processing" text="Active Tasks" />
                <span className="task-count">{resourceData.tasks.active}</span>
              </div>
              <div className="task-stat-row">
                <Badge status="warning" text="Queued Tasks" />
                <span className="task-count">{resourceData.tasks.queued}</span>
              </div>
              <div className="task-stat-row">
                <Badge status="success" text="Completed Tasks" />
                <span className="task-count">{resourceData.tasks.completed}</span>
              </div>
              <div className="task-stat-row">
                <Badge status="error" text="Failed Tasks" />
                <span className="task-count">{resourceData.tasks.failed}</span>
              </div>
            </div>
          </Card>
        </Col>

        {/* Offload Distribution */}
        <Col xs={24} sm={12} md={6}>
          <Card title="Offload Distribution" loading={loading}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={offloadMetrics} layout="vertical" barSize={20}>
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={80} />
                <RechartsTooltip formatter={(value) => [`${value}%`, 'Tasks']} />
                <Bar dataKey="value" fill="#1890ff" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Resource Allocation */}
        <Col xs={24} sm={12} md={6}>
          <Card title="Resource Allocation" loading={loading}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={resourceAllocation}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={20}
              >
                <XAxis dataKey="name" scale="point" tick={{ fontSize: 10 }} tickFormatter={(value) => value.split(' ')[0]} />
                <YAxis domain={[0, 100]} />
                <RechartsTooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="cpu" name="CPU" fill="#1890ff" stackId="a" />
                <Bar dataKey="memory" name="Memory" fill="#722ed1" stackId="a" />
                <Bar dataKey="network" name="Network" fill="#13c2c2" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .resource-monitor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .resource-gauge {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 16px;
        }
        
        .resource-details {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .device-stats {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .device-stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .device-icon {
          font-size: 24px;
          padding: 8px;
          border-radius: 50%;
        }
        
        .cloud {
          color: #1890ff;
          background-color: #e6f7ff;
        }
        
        .fog {
          color: #722ed1;
          background-color: #f9f0ff;
        }
        
        .edge {
          color: #52c41a;
          background-color: #f6ffed;
        }
        
        .task-stats {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .task-stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .task-count {
          font-weight: bold;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default ResourceMonitor;
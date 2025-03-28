// src/components/task-offloading/TaskDetail.jsx
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Descriptions, 
  Tabs, 
  Badge, 
  Button, 
  Tag, 
  Space, 
  Timeline, 
  Typography, 
  Row, 
  Col,
  Spin,
  Tooltip,
  Statistic,

  Empty,
  Progress,

} from 'antd';
import { 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  ExclamationCircleOutlined,
  SyncOutlined,
  RollbackOutlined,
  StopOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  LineChartOutlined,
  
} from '@ant-design/icons';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import api from '../../services/api';

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

const TaskDetail = ({ taskId }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState([]);
  
  useEffect(() => {
    console.log('taskId',taskId);
    // This would be replaced with an actual API call
    const fetchTaskDetail = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockTask = await api.getTaskDetailTask();
        // Mock performance data
        const mockPerformanceData = generateMockPerformanceData();
        
        setTask(mockTask);
        setPerformanceData(mockPerformanceData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setLoading(false);
      }
    };
    
    // if (taskId) { // task-id cannot be assigned now!
      fetchTaskDetail();                                  
    // }
  }, [taskId]);
  
  // Helper function to generate mock performance data
  const generateMockPerformanceData = () => {
    const data = [];
    const now = new Date();
    const startTime = new Date(now.getTime() - (3 * 60 * 60 * 1000)); // 3 hours ago
    
    for (let i = 0; i <= 36; i++) { // 36 data points, 5 minutes each
      const time = new Date(startTime.getTime() + (i * 5 * 60 * 1000));
      
      // Generate some realistic-looking patterns
      const progress = Math.min(100, Math.floor(i * 2.8));
      const baselineCpu = 30 + (progress/10);
      const baselineMemory = 0.8 + (progress/100);
      
      const cpuSpike = i >= 24 && i <= 27 ? 30 : 0; // CPU spike at some point
      
      data.push({
        time: time.toISOString(),
        cpu: Math.min(100, baselineCpu + (Math.random() * 10) + cpuSpike),
        memory: parseFloat((baselineMemory + (Math.random() * 0.3)).toFixed(1)),
        progress: progress
      });
    }
    
    return data;
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge status="default" text="Pending" />;
      case 'queued':
        return <Badge status="warning" text="Queued" />;
      case 'running':
        return <Badge status="processing" text="Running" />;
      case 'completed':
        return <Badge status="success" text="Completed" />;
      case 'failed':
        return <Badge status="error" text="Failed" />;
      case 'paused':
        return <Badge status="warning" text="Paused" />;
      default:
        return <Badge status="default" text={status} />;
    }
  };
  
  const getPriorityTag = (priority) => {
    switch (priority) {
      case 'low':
        return <Tag color="blue">Low</Tag>;
      case 'medium':
        return <Tag color="green">Medium</Tag>;
      case 'high':
        return <Tag color="orange">High</Tag>;
      case 'critical':
        return <Tag color="red">Critical</Tag>;
      default:
        return <Tag>{priority}</Tag>;
    }
  };
  
  const getLocationTag = (location) => {
    switch (location.type) {
      case 'cloud':
        return <Tag color="blue" icon={<span role="img" aria-label="cloud">☁️</span>}>{location.name}</Tag>;
      case 'fog':
        return <Tag color="purple" icon={<span role="img" aria-label="fog">🌫️</span>}>{location.name}</Tag>;
      case 'edge':
        return <Tag color="green" icon={<span role="img" aria-label="edge">📱</span>}>{location.name}</Tag>;
      default:
        return <Tag>{location.name}</Tag>;
    }
  };
  
  const getTimelineItemIcon = (type) => {
    switch (type) {
      case 'created':
        return <ClockCircleOutlined />;
      case 'queued':
        return <ClockCircleOutlined />;
      case 'started':
        return <SyncOutlined spin />;
      case 'milestone':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'error':
        return <ExclamationCircleOutlined style={{ color: '#f5222d' }} />;
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      default:
        return null;
    }
  };
  
  const getTimelineItemColor = (type) => {
    switch (type) {
      case 'warning':
        return 'orange';
      case 'error':
        return 'red';
      case 'milestone':
        return 'green';
      default:
        return 'blue';
    }
  };
  
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Loading task details..." />
      </div>
    );
  }
  
  if (!task) {
    return (
      <Card>
        <Title level={4}>Task Not Found</Title>
        <Paragraph>The requested task could not be found or may have been deleted.</Paragraph>
      </Card>
    );
  }
  
  return (
    <Card className="task-detail-card">
      <div className="task-header">
        <div>
          <Title level={4}>{task.name}</Title>
          <Space>
            {getStatusBadge(task.status)}
            {getPriorityTag(task.priority)}
            <Tag color="cyan">{task.type}</Tag>
            {getLocationTag(task.location)}
          </Space>
        </div>
        <div className="task-actions">
          <Space>
            {task.status === 'running' && (
              <Tooltip title="Pause Task">
                <Button icon={<PauseCircleOutlined />}>Pause</Button>
              </Tooltip>
            )}
            {task.status === 'paused' && (
              <Tooltip title="Resume Task">
                <Button type="primary" icon={<PlayCircleOutlined />}>Resume</Button>
              </Tooltip>
            )}
            {['running', 'paused'].includes(task.status) && (
              <Tooltip title="Stop Task">
                <Button danger icon={<StopOutlined />}>Stop</Button>
              </Tooltip>
            )}
            {task.status === 'completed' && (
              <Tooltip title="Restart Task">
                <Button icon={<RollbackOutlined />}>Restart</Button>
              </Tooltip>
            )}
          </Space>
        </div>
      </div>
      
      <Tabs defaultActiveKey="overview">
        <TabPane tab="Overview" key="overview">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Task Details" size="small">
                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="Task ID">{task.id}</Descriptions.Item>
                  <Descriptions.Item label="Type">{task.type}</Descriptions.Item>
                  <Descriptions.Item label="Status">{getStatusBadge(task.status)}</Descriptions.Item>
                  <Descriptions.Item label="Priority">{getPriorityTag(task.priority)}</Descriptions.Item>
                  <Descriptions.Item label="Created">{formatTimestamp(task.createdAt)}</Descriptions.Item>
                  <Descriptions.Item label="Started">{formatTimestamp(task.startedAt)}</Descriptions.Item>
                  <Descriptions.Item label="Completed">{formatTimestamp(task.completedAt)}</Descriptions.Item>
                  <Descriptions.Item label="Run Time">{task.runtime}</Descriptions.Item>
                  <Descriptions.Item label="Location" span={2}>{getLocationTag(task.location)}</Descriptions.Item>
                  <Descriptions.Item label="Description" span={2}>{task.description}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            
            <Col xs={24} lg={8}>
              <Card title="Resource Usage" size="small">
                <div className="resource-stats">
                  <Statistic
                    title="CPU Usage"
                    value={task.resourceUsage.cpu}
                    suffix="%"
                    valueStyle={{ color: task.resourceUsage.cpu > 80 ? '#f5222d' : '#3f8600' }}
                  />
                  <Statistic
                    title="Memory"
                    value={task.resourceUsage.memory}
                    suffix="GB"
                    precision={1}
                    valueStyle={{ color: task.resourceUsage.memory > 2 ? '#faad14' : '#3f8600' }}
                  />
                  <Statistic
                    title="Network"
                    value={task.resourceUsage.network}
                    suffix="MB/s"
                    precision={1}
                  />
                </div>
              </Card>
            </Col>
            
            <Col xs={24}>
              <Card title="Task Progress" size="small" extra={<span style={{ fontWeight: 'normal' }}>{task.progress}% Complete</span>}>
                <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="time" 
                        tickFormatter={(time) => {
                          const date = new Date(time);
                          return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                        }}
                      />
                      <YAxis yAxisId="left" domain={[0, 100]} />
                      <YAxis yAxisId="right" orientation="right" domain={[0, Math.max(2.5, Math.ceil(task.resourceUsage.memory + 0.5))]} />
                      <RechartsTooltip
                        formatter={(value, name) => {
                          if (name === 'cpu') return [`${value.toFixed(1)}%`, 'CPU'];
                          if (name === 'memory') return [`${value.toFixed(1)} GB`, 'Memory'];
                          if (name === 'progress') return [`${value}%`, 'Progress'];
                          return [value, name];
                        }}
                        labelFormatter={(label) => new Date(label).toLocaleString()}
                      />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="cpu" 
                        name="CPU" 
                        stroke="#1890ff" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="memory" 
                        name="Memory" 
                        stroke="#722ed1" 
                      />
                      <Line 
                        yAxisId="left"
                        type="stepAfter" 
                        dataKey="progress" 
                        name="Progress" 
                        stroke="#52c41a" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane tab="Parameters" key="parameters">
          <Card size="small">
            <Descriptions bordered column={2}>
              {Object.entries(task.parameters).map(([key, value]) => (
                <Descriptions.Item key={key} label={key}>{value}</Descriptions.Item>
              ))}
            </Descriptions>
          </Card>
        </TabPane>
        
        <TabPane tab="Dependencies" key="dependencies">
          <Card size="small">
            {task.dependencies.length === 0 ? (
              <Empty description="No dependencies" />
            ) : (
              <ul className="dependencies-list">
                {task.dependencies.map(dep => (
                  <li key={dep.id} className="dependency-item">
                    <div className="dependency-info">
                      <div className="dependency-name">{dep.name}</div>
                      <div className="dependency-id">ID: {dep.id}</div>
                    </div>
                    <div className="dependency-status">
                      {getStatusBadge(dep.status)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </TabPane>
        
        <TabPane tab="Events" key="events">
          <Card size="small">
            <Timeline mode="left">
              {task.events.map((event, index) => (
                <Timeline.Item 
                  key={index}
                  color={getTimelineItemColor(event.type)}
                  dot={getTimelineItemIcon(event.type)}
                  label={formatTimestamp(event.timestamp)}
                >
                  <div className="timeline-item-content">
                    <div className="timeline-item-type">{event.type}</div>
                    <div className="timeline-item-message">{event.message}</div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </TabPane>
        
        <TabPane tab="Results" key="results">
          <Card size="small">
            {task.status !== 'completed' ? (
              <div className="results-pending">
                <Text type="secondary">Results will be available once the task is completed.</Text>
                {task.status === 'running' && (
                  <div className="progress-info">
                    <Progress percent={task.progress} status="active" />
                  </div>
                )}
              </div>
            ) : (
              <Descriptions bordered column={2}>
                {Object.entries(task.results).map(([key, value]) => (
                  <Descriptions.Item key={key} label={key}>{value}</Descriptions.Item>
                ))}
              </Descriptions>
            )}
          </Card>
        </TabPane>
      </Tabs>
      
      <style jsx>{`
        .task-detail-card {
          margin-bottom: 16px;
        }
        
        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        
        .task-actions {
          margin-left: 16px;
        }
        
        .resource-stats {
          display: flex;
          justify-content: space-between;
        }
        
        .dependencies-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .dependency-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .dependency-item:last-child {
          border-bottom: none;
        }
        
        .dependency-name {
          font-weight: 500;
        }
        
        .dependency-id {
          font-size: 12px;
          color: #8c8c8c;
        }
        
        .timeline-item-content {
          display: flex;
          flex-direction: column;
        }
        
        .timeline-item-type {
          text-transform: capitalize;
          font-weight: 500;
        }
        
        .results-pending {
          text-align: center;
          padding: 24px;
        }
        
        .progress-info {
          max-width: 400px;
          margin: 16px auto 0;
        }
        
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }
      `}</style>
    </Card>
  );
};

export default TaskDetail;
  
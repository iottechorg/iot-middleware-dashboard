// src/components/task-offloading/TaskList.jsx
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Tag, 
  Space, 
  Button, 
  Input, 
  Select, 
  Badge, 
  Progress, 
  Dropdown, 
  Menu, 
  Tooltip,
  Card,
  Popconfirm
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EllipsisOutlined, 
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  DeleteOutlined,
  MoreOutlined,
  ClockCircleOutlined,
  CloudOutlined,
  LaptopOutlined,
  MobileOutlined,
  EditOutlined,
  EyeOutlined
} from '@ant-design/icons';
import api from '../../services/api';
const { Option } = Select;

const TaskList = ({ onViewTask, onEditTask }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchTasks = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockTasks = await api.getTaskListTasks();
        // Mock data for tasks;
        setTasks(mockTasks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);
  
  const handleTaskAction = (taskId, action) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) return;
    
    const task = updatedTasks[taskIndex];
    
    switch (action) {
      case 'start':
        task.status = 'running';
        task.startedAt = new Date().toISOString();
        break;
      case 'pause':
        task.status = 'paused';
        break;
      case 'resume':
        task.status = 'running';
        break;
      case 'stop':
        task.status = 'stopped';
        break;
      case 'delete':
        updatedTasks.splice(taskIndex, 1);
        break;
      default:
        return;
    }
    
    setTasks(updatedTasks);
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
      case 'stopped':
        return <Badge status="default" text="Stopped" />;
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
  
  const getTypeTag = (type) => {
    switch (type) {
      case 'ml-inference':
        return <Tag color="purple">ML Inference</Tag>;
      case 'data-processing':
        return <Tag color="blue">Data Processing</Tag>;
      case 'protocol-translation':
        return <Tag color="cyan">Protocol Translation</Tag>;
      case 'sensor-aggregation':
        return <Tag color="green">Sensor Aggregation</Tag>;
      default:
        return <Tag>{type}</Tag>;
    }
  };
  
  const getLocationIcon = (location) => {
    switch (location.type) {
      case 'cloud':
        return <CloudOutlined style={{ color: '#1890ff' }} />;
      case 'fog':
        return <LaptopOutlined style={{ color: '#722ed1' }} />;
      case 'edge':
        return <MobileOutlined style={{ color: '#52c41a' }} />;
      default:
        return null;
    }
  };
  
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  const renderTaskActions = (task) => {
    const menu = (
      <Menu>
        <Menu.Item key="view" icon={<EyeOutlined />} onClick={() => onViewTask(task.id)}>
          View Details
        </Menu.Item>
        
        <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => onEditTask(task)}>
          Edit Task
        </Menu.Item>
        
        {task.status === 'queued' && (
          <Menu.Item key="start" icon={<PlayCircleOutlined />} onClick={() => handleTaskAction(task.id, 'start')}>
            Start Now
          </Menu.Item>
        )}
        
        {task.status === 'running' && (
          <Menu.Item key="pause" icon={<PauseCircleOutlined />} onClick={() => handleTaskAction(task.id, 'pause')}>
            Pause
          </Menu.Item>
        )}
        
        {task.status === 'paused' && (
          <Menu.Item key="resume" icon={<PlayCircleOutlined />} onClick={() => handleTaskAction(task.id, 'resume')}>
            Resume
          </Menu.Item>
        )}
        
        {['running', 'paused'].includes(task.status) && (
          <Menu.Item key="stop" icon={<StopOutlined />} onClick={() => handleTaskAction(task.id, 'stop')}>
            Stop
          </Menu.Item>
        )}
        
        <Menu.Divider />
        
        <Menu.Item 
          key="delete" 
          icon={<DeleteOutlined />} 
          danger
          onClick={() => handleTaskAction(task.id, 'delete')}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
    
    return (
      <Space>
        <Button 
          type="primary" 
          icon={<EyeOutlined />} 
          size="small"
          onClick={() => onViewTask(task.id)}
        >
          View
        </Button>
        
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <Button icon={<MoreOutlined />} size="small" />
        </Dropdown>
      </Space>
    );
  };
  
  // Filter tasks based on search text and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.name.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(searchText.toLowerCase()) ||
      task.id.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesType = filterType === 'all' || task.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Table columns
  const columns = [
    {
      title: 'Task',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div className="task-name">{text}</div>
          <div className="task-description">{record.description}</div>
          <div className="task-meta">
            <ClockCircleOutlined /> Created: {formatTimestamp(record.createdAt)}
          </div>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <div>
          {getStatusBadge(status)}
          {['running', 'paused'].includes(status) && (
            <div className="task-progress">
              <Progress percent={record.progress} size="small" />
            </div>
          )}
        </div>
      ),
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Queued', value: 'queued' },
        { text: 'Running', value: 'running' },
        { text: 'Paused', value: 'paused' },
        { text: 'Completed', value: 'completed' },
        { text: 'Failed', value: 'failed' },
        { text: 'Stopped', value: 'stopped' }
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => getTypeTag(type),
      filters: [
        { text: 'ML Inference', value: 'ml-inference' },
        { text: 'Data Processing', value: 'data-processing' },
        { text: 'Protocol Translation', value: 'protocol-translation' },
        { text: 'Sensor Aggregation', value: 'sensor-aggregation' }
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => getPriorityTag(priority),
      filters: [
        { text: 'Critical', value: 'critical' },
        { text: 'High', value: 'high' },
        { text: 'Medium', value: 'medium' },
        { text: 'Low', value: 'low' }
      ],
      onFilter: (value, record) => record.priority === value,
      sorter: (a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      },
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location) => (
        <Tooltip title={location.name}>
          <Tag icon={getLocationIcon(location)}>
            {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
          </Tag>
        </Tooltip>
      ),
      filters: [
        { text: 'Cloud', value: 'cloud' },
        { text: 'Fog', value: 'fog' },
        { text: 'Edge', value: 'edge' }
      ],
      onFilter: (value, record) => record.location.type === value,
    },
    {
      title: 'Started',
      dataIndex: 'startedAt',
      key: 'startedAt',
      render: (timestamp) => formatTimestamp(timestamp),
      sorter: (a, b) => {
        if (!a.startedAt && !b.startedAt) return 0;
        if (!a.startedAt) return 1;
        if (!b.startedAt) return -1;
        return new Date(a.startedAt) - new Date(b.startedAt);
      },
    },
    {
      title: 'Completed',
      dataIndex: 'completedAt',
      key: 'completedAt',
      render: (timestamp) => formatTimestamp(timestamp),
      sorter: (a, b) => {
        if (!a.completedAt && !b.completedAt) return 0;
        if (!a.completedAt) return 1;
        if (!b.completedAt) return -1;
        return new Date(a.completedAt) - new Date(b.completedAt);
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => renderTaskActions(record),
    },
  ];
  
  return (
    <Card title="Task List">
      <div className="task-list-header">
        <div className="search-filters">
          <Space>
            <Input
              placeholder="Search tasks"
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            
            <Select
              placeholder="Filter by status"
              style={{ width: 150 }}
              value={filterStatus}
              onChange={(value) => setFilterStatus(value)}
            >
              <Option value="all">All Statuses</Option>
              <Option value="pending">Pending</Option>
              <Option value="queued">Queued</Option>
              <Option value="running">Running</Option>
              <Option value="paused">Paused</Option>
              <Option value="completed">Completed</Option>
              <Option value="failed">Failed</Option>
              <Option value="stopped">Stopped</Option>
            </Select>
            
            <Select
              placeholder="Filter by type"
              style={{ width: 180 }}
              value={filterType}
              onChange={(value) => setFilterType(value)}
            >
              <Option value="all">All Types</Option>
              <Option value="ml-inference">ML Inference</Option>
              <Option value="data-processing">Data Processing</Option>
              <Option value="protocol-translation">Protocol Translation</Option>
              <Option value="sensor-aggregation">Sensor Aggregation</Option>
            </Select>
          </Space>
        </div>
        
        <div className="task-actions">
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => onEditTask(null)}
          >
            Create Task
          </Button>
        </div>
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
      />
      
      <style jsx>{`
        .task-list-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        
        .task-name {
          font-weight: 500;
        }
        
        .task-description {
          color: rgba(0, 0, 0, 0.45);
          font-size: 12px;
          margin-top: 4px;
        }
        
        .task-meta {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 4px;
        }
        
        .task-progress {
          margin-top: 8px;
          max-width: 120px;
        }
      `}</style>
    </Card>
  );
};

export default TaskList;
// src/components/alert-notifications/AlertList.jsx

import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Space, Input, Select } from 'antd';
import { 
  CheckCircleOutlined, 
  ExclamationCircleOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import api from '../../services/api';

const { Search } = Input;
const { Option } = Select;

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState({
    severity: 'all',
    status: 'all'
  });

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      try {
        const data = await api.getAlerts();
        setAlerts(data);
        setFilteredAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, filter, alerts]);

  const applyFilters = () => {
    let result = [...alerts];
    
    // Apply search
    if (searchText) {
      const lowercaseSearch = searchText.toLowerCase();
      result = result.filter(alert => 
        alert.title.toLowerCase().includes(lowercaseSearch) || 
        alert.message.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    // Apply severity filter
    if (filter.severity !== 'all') {
      result = result.filter(alert => alert.severity === filter.severity);
    }
    
    // Apply status filter
    if (filter.status === 'acknowledged') {
      result = result.filter(alert => alert.acknowledged);
    } else if (filter.status === 'unacknowledged') {
      result = result.filter(alert => !alert.acknowledged);
    }
    
    setFilteredAlerts(result);
  };

  const handleAcknowledge = async (alertId) => {
    try {
      await api.acknowledgeAlert(alertId, { username: 'current-user' });
      // Update local state
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId ? { ...alert, acknowledged: true } : alert
        )
      );
    } catch (error) {
      console.error(`Error acknowledging alert ${alertId}:`, error);
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <Badge status="error" text="Critical" />;
      case 'error':
        return <Badge status="error" text="Error" />;
      case 'warning':
        return <Badge status="warning" text="Warning" />;
      case 'info':
        return <Badge status="processing" text="Info" />;
      default:
        return <Badge status="default" text={severity} />;
    }
  };

  const columns = [
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: severity => getSeverityBadge(severity),
      width: 100,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: 120,
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: timestamp => new Date(timestamp).toLocaleString(),
      width: 180,
    },
    {
      title: 'Status',
      key: 'status',
      render: alert => alert.acknowledged ? 
        <Badge status="success" text="Acknowledged" /> :
        <Badge status="default" text="Unacknowledged" />,
      width: 150,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, alert) => (
        <Space size="small">
          {!alert.acknowledged && (
            <Button 
              type="primary" 
              size="small" 
              icon={<CheckCircleOutlined />}
              onClick={() => handleAcknowledge(alert.id)}
            >
              Acknowledge
            </Button>
          )}
          <Button 
            type="default" 
            size="small"
          >
            Details
          </Button>
        </Space>
      ),
      width: 200,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Search
          placeholder="Search alerts"
          allowClear
          onSearch={value => setSearchText(value)}
          style={{ width: 300 }}
        />
        <Space>
          <Select
            placeholder="Filter by severity"
            style={{ width: 160 }}
            onChange={value => setFilter(prev => ({ ...prev, severity: value }))}
            defaultValue="all"
          >
            <Option value="all">All Severities</Option>
            <Option value="critical">Critical</Option>
            <Option value="error">Error</Option>
            <Option value="warning">Warning</Option>
            <Option value="info">Info</Option>
          </Select>
          <Select
            placeholder="Filter by status"
            style={{ width: 180 }}
            onChange={value => setFilter(prev => ({ ...prev, status: value }))}
            defaultValue="all"
          >
            <Option value="all">All Statuses</Option>
            <Option value="acknowledged">Acknowledged</Option>
            <Option value="unacknowledged">Unacknowledged</Option>
          </Select>
        </Space>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={filteredAlerts}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AlertList;
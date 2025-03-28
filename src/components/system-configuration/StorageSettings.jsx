// src/components/system-configuration/StorageSettings.jsx
import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Switch, 
  Select, 
  Card, 
  Row, 
  Col, 
  Space, 
  Table,
  Tag,
  Divider,
  Tooltip,
  message,
  Alert,
  Progress,
  Modal,
  Radio,
  Popconfirm,
  InputNumber,
  Tabs
} from 'antd';
import { 
  SaveOutlined, 
  DatabaseOutlined, 
  CloudOutlined, 
  HddOutlined,
  SettingOutlined,
  DeleteOutlined,
  SyncOutlined,
  PlusOutlined,
  ReloadOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import api from '../../services/api';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const StorageSettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('local');
  const [storageVolumes, setStorageVolumes] = useState([]);
  const [databases, setDatabases] = useState([]);
  const [addVolumeVisible, setAddVolumeVisible] = useState(false);
  const [addDatabaseVisible, setAddDatabaseVisible] = useState(false);
  
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchStorageSettings = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockVolumes = await api.getStorageVolumes();
        // Mock storage volume data
        const mockDatabases = await api.getStorageDatabases();
        // Mock database data
        const mockSettings = await api.getStorageSettings();
        
        setStorageVolumes(mockVolumes);
        setDatabases(mockDatabases);
        
        // Set form values
        form.setFieldsValue(mockSettings);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching storage settings:', error);
        setLoading(false);
      }
    };
    
    fetchStorageSettings();
  }, [form]);
  
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving storage settings:', values);
      message.success('Storage settings saved successfully!');
      setSaving(false);
    } catch (error) {
      console.error('Validation error:', error);
      setSaving(false);
    }
  };
  
  const handleDeleteVolume = (id) => {
    setStorageVolumes(storageVolumes.filter(volume => volume.id !== id));
    message.success('Storage volume removed successfully');
  };
  
  const handleDeleteDatabase = (id) => {
    setDatabases(databases.filter(db => db.id !== id));
    message.success('Database connection removed successfully');
  };
  
  const handleAddVolume = () => {
    setAddVolumeVisible(true);
  };
  
  const handleAddDatabase = () => {
    setAddDatabaseVisible(true);
  };
  
  const closeAddVolumeModal = () => {
    setAddVolumeVisible(false);
  };
  
  const closeAddDatabaseModal = () => {
    setAddDatabaseVisible(false);
  };
  
  const submitAddVolume = () => {
    // In a real application, this would add a new volume
    message.success('Storage volume added successfully');
    setAddVolumeVisible(false);
  };
  
  const submitAddDatabase = () => {
    // In a real application, this would add a new database connection
    message.success('Database connection added successfully');
    setAddDatabaseVisible(false);
  };
  
  const handleTestDbConnection = (id) => {
    message.loading('Testing database connection...', 1.5)
      .then(() => message.success('Database connection successful'));
  };
  
  const handleBackupNow = (id) => {
    message.loading('Starting backup...', 1.5)
      .then(() => message.success('Backup initiated successfully'));
  };
  
  const getStorageTypeTag = (type) => {
    const typeMap = {
      local: { color: 'blue', icon: <HddOutlined /> },
      nas: { color: 'cyan', icon: <HddOutlined /> },
      s3: { color: 'orange', icon: <CloudOutlined /> },
      azure: { color: 'purple', icon: <CloudOutlined /> },
      gcs: { color: 'red', icon: <CloudOutlined /> }
    };
    
    const typeInfo = typeMap[type] || { color: 'default', icon: null };
    
    return (
      <Tag color={typeInfo.color} icon={typeInfo.icon}>
        {type.toUpperCase()}
      </Tag>
    );
  };
  
  const getDatabaseTypeTag = (type) => {
    const typeMap = {
      postgresql: { color: 'blue', icon: <DatabaseOutlined /> },
      timescaledb: { color: 'geekblue', icon: <DatabaseOutlined /> },
      mongodb: { color: 'green', icon: <DatabaseOutlined /> },
      mysql: { color: 'orange', icon: <DatabaseOutlined /> },
      redis: { color: 'red', icon: <DatabaseOutlined /> },
      influxdb: { color: 'purple', icon: <DatabaseOutlined /> }
    };
    
    const typeInfo = typeMap[type] || { color: 'default', icon: <DatabaseOutlined /> };
    
    return (
      <Tag color={typeInfo.color} icon={typeInfo.icon}>
        {type.toUpperCase()}
      </Tag>
    );
  };
  
  const getStatusTag = (status) => {
    const statusMap = {
      online: { color: 'success', text: 'Online' },
      offline: { color: 'error', text: 'Offline' },
      degraded: { color: 'warning', text: 'Degraded' },
      maintenance: { color: 'processing', text: 'Maintenance' }
    };
    
    const statusInfo = statusMap[status] || { color: 'default', text: status };
    
    return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
  };
  
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp).toLocaleString();
  };
  
  const volumeColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => getStorageTypeTag(type),
      filters: [
        { text: 'Local', value: 'local' },
        { text: 'NAS', value: 'nas' },
        { text: 'S3', value: 's3' },
        { text: 'Azure', value: 'azure' },
        { text: 'GCS', value: 'gcs' }
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Location',
      key: 'location',
      render: (_, record) => (
        <span>
          {record.type === 'local' || record.type === 'nas'
            ? record.path
            : record.type === 's3'
            ? `s3://${record.bucket}`
            : record.type === 'azure'
            ? `azure://${record.container}`
            : record.type === 'gcs'
            ? `gs://${record.bucket}`
            : 'Unknown'}
        </span>
      ),
    },
    {
      title: 'Usage',
      key: 'usage',
      render: (_, record) => (
        <div style={{ width: 150 }}>
          <Progress 
            percent={Math.round((record.usedSpace / record.totalSpace) * 100)} 
            size="small"
            format={(percent) => `${percent}%`}
            status={
              percent => {
                if (percent > 90) return 'exception';
                if (percent > 70) return 'warning';
                return 'normal';
              }
            }
          />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>
            {record.usedSpace} GB / {record.totalSpace} GB
          </div>
        </div>
      ),
      sorter: (a, b) => (a.usedSpace / a.totalSpace) - (b.usedSpace / b.totalSpace),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Online', value: 'online' },
        { text: 'Offline', value: 'offline' },
        { text: 'Degraded', value: 'degraded' },
        { text: 'Maintenance', value: 'maintenance' }
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Last Backup',
      dataIndex: 'lastBackup',
      key: 'lastBackup',
      render: (text) => formatTimestamp(text),
      sorter: (a, b) => {
        if (!a.lastBackup && !b.lastBackup) return 0;
        if (!a.lastBackup) return 1;
        if (!b.lastBackup) return -1;
        return new Date(a.lastBackup) - new Date(b.lastBackup);
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<SettingOutlined />}
            size="small"
            onClick={() => message.info(`Configure volume ${record.name}`)}
          />
          <Button
            icon={<SyncOutlined />}
            size="small"
            onClick={() => handleBackupNow(record.id)}
          />
          <Popconfirm
            title="Are you sure you want to remove this storage volume?"
            onConfirm={() => handleDeleteVolume(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={record.name === 'Primary Storage'} // Prevent deletion of primary volume
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
              disabled={record.name === 'Primary Storage'} // Prevent deletion of primary volume
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  const databaseColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => getDatabaseTypeTag(type),
      filters: [
        { text: 'PostgreSQL', value: 'postgresql' },
        { text: 'TimescaleDB', value: 'timescaledb' },
        { text: 'MongoDB', value: 'mongodb' },
        { text: 'MySQL', value: 'mysql' },
        { text: 'Redis', value: 'redis' },
        { text: 'InfluxDB', value: 'influxdb' }
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Connection',
      key: 'connection',
      render: (_, record) => (
        <span>
          {record.host}:{record.port}
        </span>
      ),
    },
    {
      title: 'Database',
      dataIndex: 'database',
      key: 'database',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (size) => `${size} GB`,
      sorter: (a, b) => a.size - b.size,
    },
    {
      title: 'Connections',
      dataIndex: 'connections',
      key: 'connections',
      sorter: (a, b) => a.connections - b.connections,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Online', value: 'online' },
        { text: 'Offline', value: 'offline' },
        { text: 'Degraded', value: 'degraded' }
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<SettingOutlined />}
            size="small"
            onClick={() => message.info(`Configure database ${record.name}`)}
          />
          <Button
            icon={<ReloadOutlined />}
            size="small"
            onClick={() => handleTestDbConnection(record.id)}
          />
          <Popconfirm
            title="Are you sure you want to remove this database connection?"
            onConfirm={() => handleDeleteDatabase(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={record.name === 'Time Series Database'} // Prevent deletion of primary database
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
              disabled={record.name === 'Time Series Database'} // Prevent deletion of primary database
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  return (
    <div className="storage-settings">
      <Card 
        title={
          <Space>
            <DatabaseOutlined />
            <span>Storage Settings</span>
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={saving}
            disabled={loading}
          >
            Save Changes
          </Button>
        }
        loading={loading}
      >
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane 
            tab={
              <span>
                <HddOutlined />
                Local Storage
              </span>
            } 
            key="local"
          >
            <Form
              form={form}
              layout="vertical"
              disabled={loading}
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name={['local', 'dataPath']}
                    label="Data Path"
                    rules={[{ required: true, message: 'Data path is required' }]}
                  >
                    <Input placeholder="/var/lib/iot-middleware/data" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['local', 'tempPath']}
                    label="Temporary Path"
                    rules={[{ required: true, message: 'Temporary path is required' }]}
                  >
                    <Input placeholder="/var/lib/iot-middleware/temp" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['local', 'backupPath']}
                    label="Backup Path"
                    rules={[{ required: true, message: 'Backup path is required' }]}
                  >
                    <Input placeholder="/var/backups/iot-middleware" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider orientation="left">Retention Policy</Divider>
              
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name={['local', 'retentionPolicy', 'enabled']}
                    label="Enable Data Retention Policy"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name={['local', 'retentionPolicy', 'retentionDays', 'rawData']}
                    label="Raw Data Retention (days)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={3650} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['local', 'retentionPolicy', 'retentionDays', 'processedData']}
                    label="Processed Data (days)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={3650} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['local', 'retentionPolicy', 'retentionDays', 'logs']}
                    label="Logs Retention (days)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={3650} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['local', 'retentionPolicy', 'retentionDays', 'events']}
                    label="Events Retention (days)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={3650} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider orientation="left">Compression Settings</Divider>
              
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name={['local', 'compression', 'enabled']}
                    label="Enable Compression"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['local', 'compression', 'algorithm']}
                    label="Compression Algorithm"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select>
                      <Option value="gzip">GZip</Option>
                      <Option value="zstd">ZStandard</Option>
                      <Option value="lz4">LZ4</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['local', 'compression', 'level']}
                    label="Compression Level"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={9} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <CloudOutlined />
                Cloud Storage
              </span>
            } 
            key="cloud"
          >
            <Form
              form={form}
              layout="vertical"
              disabled={loading}
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name={['cloud', 'enabled']}
                    label="Enable Cloud Storage"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['cloud', 'provider']}
                    label="Cloud Provider"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select>
                      <Option value="s3">Amazon S3</Option>
                      <Option value="azure">Azure Blob Storage</Option>
                      <Option value="gcs">Google Cloud Storage</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['cloud', 'region']}
                    label="Region"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="us-west-2" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['cloud', 'bucket']}
                    label="Bucket/Container Name"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="iot-middleware-data" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['cloud', 'prefix']}
                    label="Prefix/Path"
                  >
                    <Input placeholder="data/" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider orientation="left">Credentials</Divider>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['cloud', 'credentials', 'accessKeyId']}
                    label="Access Key ID"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input.Password placeholder="Enter access key" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['cloud', 'credentials', 'secretAccessKey']}
                    label="Secret Access Key"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input.Password placeholder="Enter secret key" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider orientation="left">Sync Settings</Divider>
              
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name={['cloud', 'syncSettings', 'enabled']}
                    label="Enable Auto Sync"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['cloud', 'syncSettings', 'syncInterval']}
                    label="Sync Interval (minutes)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={5} max={1440} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['cloud', 'syncSettings', 'syncMode']}
                    label="Sync Mode"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select>
                      <Option value="incremental">Incremental</Option>
                      <Option value="full">Full</Option>
                      <Option value="intelligent">Intelligent</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name={['cloud', 'syncSettings', 'syncTypes']}
                label="Data Types to Sync"
                rules={[{ required: true, message: 'At least one type must be selected' }]}
              >
                <Select mode="multiple">
                  <Option value="device-data">Device Data</Option>
                  <Option value="events">Events</Option>
                  <Option value="logs">Logs</Option>
                  <Option value="backups">Backups</Option>
                  <Option value="configuration">Configuration</Option>
                </Select>
              </Form.Item>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <DatabaseOutlined />
                Database
              </span>
            } 
            key="database"
          >
            <Form
              form={form}
              layout="vertical"
              disabled={loading}
            >
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name={['database', 'connectTimeout']}
                    label="Connection Timeout (seconds)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={120} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['database', 'connectionPoolSize']}
                    label="Connection Pool Size"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['database', 'maxQueryDuration']}
                    label="Max Query Duration (seconds)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={3600} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['database', 'enableQueryCache']}
                    label="Enable Query Cache"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name={['database', 'queryCacheTTL']}
                    label="Query Cache TTL (seconds)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={3600} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider orientation="left">Database Backup Settings</Divider>
              
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name={['database', 'backupSettings', 'enabled']}
                    label="Enable Automated Backup"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['database', 'backupSettings', 'schedule']}
                    label="Backup Schedule"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select>
                      <Option value="hourly">Hourly</Option>
                      <Option value="daily">Daily</Option>
                      <Option value="weekly">Weekly</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['database', 'backupSettings', 'time']}
                    label="Backup Time"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="HH:MM" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['database', 'backupSettings', 'retentionDays']}
                    label="Backup Retention (days)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={365} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name={['database', 'backupSettings', 'compressionEnabled']}
                    label="Enable Backup Compression"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <HddOutlined />
                Storage Volumes
              </span>
            } 
            key="volumes"
          >
            <div className="volume-actions" style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddVolume}
              >
                Add Storage Volume
              </Button>
            </div>
            
            <Table
              columns={volumeColumns}
              dataSource={storageVolumes}
              rowKey="id"
              pagination={false}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="volume-details">
                    {record.type === 'local' && (
                      <p><strong>Mount Options:</strong> {record.mountOptions}</p>
                    )}
                    {record.type === 's3' && (
                      <>
                        <p><strong>Region:</strong> {record.region}</p>
                        <p><strong>Bucket:</strong> {record.bucket}</p>
                      </>
                    )}
                  </div>
                ),
              }}
            />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <DatabaseOutlined />
                Database Connections
              </span>
            } 
            key="connections"
          >
            <div className="database-actions" style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddDatabase}
              >
                Add Database Connection
              </Button>
            </div>
            
            <Table
              columns={databaseColumns}
              dataSource={databases}
              rowKey="id"
              pagination={false}
            />
          </TabPane>
        </Tabs>
      </Card>
      
      {/* Add Volume Modal */}
      <Modal
        title="Add Storage Volume"
        visible={addVolumeVisible}
        onOk={submitAddVolume}
        onCancel={closeAddVolumeModal}
      >
        <Form layout="vertical">
          <Form.Item
            name="volumeName"
            label="Volume Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input placeholder="Enter volume name" />
          </Form.Item>
          
          <Form.Item
            name="volumeType"
            label="Volume Type"
            rules={[{ required: true, message: 'Please select a type' }]}
          >
            <Select placeholder="Select volume type">
              <Option value="local">Local Storage</Option>
              <Option value="nas">Network Attached Storage</Option>
              <Option value="s3">Amazon S3</Option>
              <Option value="azure">Azure Blob Storage</Option>
              <Option value="gcs">Google Cloud Storage</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="volumePath"
            label="Path/Location"
            rules={[{ required: true, message: 'Please enter a path' }]}
          >
            <Input placeholder="/path/to/volume or bucket name" />
          </Form.Item>
          
          <Form.Item
            name="volumeMountOptions"
            label="Mount Options (for local volumes)"
          >
            <Input placeholder="defaults,noatime" />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Add Database Modal */}
      <Modal
        title="Add Database Connection"
        visible={addDatabaseVisible}
        onOk={submitAddDatabase}
        onCancel={closeAddDatabaseModal}
      >
        <Form layout="vertical">
          <Form.Item
            name="dbName"
            label="Connection Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input placeholder="Enter connection name" />
          </Form.Item>
          
          <Form.Item
            name="dbType"
            label="Database Type"
            rules={[{ required: true, message: 'Please select a type' }]}
          >
            <Select placeholder="Select database type">
              <Option value="postgresql">PostgreSQL</Option>
              <Option value="timescaledb">TimescaleDB</Option>
              <Option value="mongodb">MongoDB</Option>
              <Option value="mysql">MySQL</Option>
              <Option value="redis">Redis</Option>
              <Option value="influxdb">InfluxDB</Option>
            </Select>
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="dbHost"
                label="Host"
                rules={[{ required: true, message: 'Please enter a host' }]}
              >
                <Input placeholder="localhost or 192.168.1.100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="dbPort"
                label="Port"
                rules={[{ required: true, message: 'Please enter a port' }]}
              >
                <InputNumber min={1} max={65535} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="dbDatabase"
            label="Database Name"
            rules={[{ required: true, message: 'Please enter a database name' }]}
          >
            <Input placeholder="Enter database name" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dbUsername"
                label="Username"
                rules={[{ required: true, message: 'Please enter a username' }]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dbPassword"
                label="Password"
                rules={[{ required: true, message: 'Please enter a password' }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      
      <style jsx>{`
        .volume-details {
          padding: 16px;
          background-color: #f5f5f5;
        }
        
        .volume-details p {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
};

export default StorageSettings;

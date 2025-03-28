// src/components/system-configuration/NetworkSettings.jsx
import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Switch, 
  InputNumber, 
  Divider, 
  Card, 
  Row, 
  Col, 
  Space, 
  Table,
  Tag,
  Select,
  Tooltip,
  message,
  Alert,
  Popconfirm,
  Modal,
  Radio,
  Badge
} from 'antd';
import { 
  SaveOutlined, 
  PlusOutlined, 
  DeleteOutlined, 
  EditOutlined,
  LockOutlined,
  CloudOutlined,
  ApiOutlined,
  GlobalOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import api from '../../services/api';
const { Option } = Select;
const { TextArea } = Input;

const NetworkSettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [interfaces, setInterfaces] = useState([]);
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [addInterfaceVisible, setAddInterfaceVisible] = useState(false);
  
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchNetworkSettings = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock network interface data    
        const mockInterfaces = await api.getSystemNetworkInterfaces();
        
        // Mock general network settings
        const mockSettings = await api.getSystemNetworkSettings();
        
        setInterfaces(mockInterfaces);
        setProxyEnabled(mockSettings.proxy.enabled);
        
        // Set form values
        form.setFieldsValue(mockSettings);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching network settings:', error);
        setLoading(false);
      }
    };
    
    fetchNetworkSettings();
  }, [form]);
  
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving network settings:', values);
      message.success('Network settings saved successfully!');
      setSaving(false);
    } catch (error) {
      console.error('Validation error:', error);
      setSaving(false);
    }
  };
  
  const handleProxyToggle = (checked) => {
    setProxyEnabled(checked);
  };
  
  const handleDeleteInterface = (id) => {
    const updatedInterfaces = interfaces.filter(
      (iface) => iface.id !== id
    );
    setInterfaces(updatedInterfaces);
    message.success(`Interface ${id} removed successfully`);
  };
  
  const handleEditInterface = (id) => {
    message.info(`Edit interface ${id}`);
    // In a real application, this would open an edit dialog
  };
  
  const handleToggleInterface = (id, enabled) => {
    const updatedInterfaces = interfaces.map(
      (iface) => (iface.id === id ? { ...iface, enabled } : iface)
    );
    setInterfaces(updatedInterfaces);
    message.success(
      `Interface ${id} ${enabled ? 'enabled' : 'disabled'} successfully`
    );
  };
  
  const handleAddInterface = () => {
    setAddInterfaceVisible(true);
  };
  
  const closeAddInterfaceModal = () => {
    setAddInterfaceVisible(false);
  };
  
  const submitAddInterface = () => {
    // In a real application, this would add a new interface
    message.success('Interface added successfully');
    setAddInterfaceVisible(false);
  };
  
  const renderInterfaceStatus = (status) => {
    const statusMap = {
      up: { text: 'Up', status: 'success' },
      down: { text: 'Down', status: 'error' },
      unknown: { text: 'Unknown', status: 'default' }
    };
    
    const statusInfo = statusMap[status] || statusMap.unknown;
    
    return <Badge status={statusInfo.status} text={statusInfo.text} />;
  };
  
  const interfaceColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)' }}>
            {record.id} ({record.type})
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderInterfaceStatus(status),
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)' }}>
            {record.netmask}
          </div>
        </div>
      ),
    },
    {
      title: 'Gateway',
      dataIndex: 'gateway',
      key: 'gateway',
    },
    {
      title: 'MAC Address',
      dataIndex: 'mac',
      key: 'mac',
    },
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled, record) => (
        <Switch
          checked={enabled}
          onChange={(checked) => handleToggleInterface(record.id, checked)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditInterface(record.id)}
          />
          <Popconfirm
            title="Are you sure you want to delete this interface?"
            onConfirm={() => handleDeleteInterface(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
              disabled={record.id === 'eth0'} // Prevent deletion of primary interface
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  return (
    <div className="network-settings">
      <Card 
        title={
          <Space>
            <GlobalOutlined />
            <span>Network Settings</span>
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
        <Form
          form={form}
          layout="vertical"
          disabled={loading}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="hostname"
                label="Hostname"
                rules={[{ required: true, message: 'Hostname is required' }]}
              >
                <Input placeholder="Enter hostname" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="domainName"
                label="Domain Name"
              >
                <Input placeholder="Enter domain name" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        
        <Divider orientation="left">Network Interfaces</Divider>
        
        <div className="interface-actions" style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddInterface}
          >
            Add Interface
          </Button>
        </div>
        
        <Table
          columns={interfaceColumns}
          dataSource={interfaces}
          rowKey="id"
          pagination={false}
          expandable={{
            expandedRowRender: (record) => (
              <div className="interface-details">
                <Row gutter={16}>
                  <Col span={8}>
                    <h4>Configuration</h4>
                    <p><strong>DNS Servers:</strong> {record.dns.join(', ')}</p>
                    <p><strong>MTU:</strong> {record.mtu}</p>
                    {record.type === 'wifi' && (
                      <>
                        <h4>WiFi Details</h4>
                        <p><strong>SSID:</strong> {record.wifi.ssid}</p>
                        <p><strong>Security:</strong> {record.wifi.security}</p>
                        <p><strong>Channel:</strong> {record.wifi.channel}</p>
                        <p><strong>Frequency:</strong> {record.wifi.frequency}</p>
                        <p><strong>Signal Strength:</strong> {record.wifi.signalStrength}%</p>
                      </>
                    )}
                  </Col>
                  <Col span={16}>
                    <h4>Traffic Metrics</h4>
                    <Row gutter={16}>
                      <Col span={8}>
                        <p><strong>RX Bytes:</strong> {record.metrics.rxBytes}</p>
                        <p><strong>TX Bytes:</strong> {record.metrics.txBytes}</p>
                      </Col>
                      <Col span={8}>
                        <p><strong>RX Packets:</strong> {record.metrics.rxPackets.toLocaleString()}</p>
                        <p><strong>TX Packets:</strong> {record.metrics.txPackets.toLocaleString()}</p>
                      </Col>
                      <Col span={8}>
                        <p><strong>Errors:</strong> {record.metrics.errors}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            ),
          }}
        />
        
        <Divider orientation="left">HTTP Proxy Settings</Divider>
        
        <Form
          form={form}
          layout="vertical"
          disabled={loading}
        >
          <Form.Item
            name={['proxy', 'enabled']}
            label="Enable HTTP Proxy"
            valuePropName="checked"
          >
            <Switch onChange={handleProxyToggle} />
          </Form.Item>
          
          {proxyEnabled && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['proxy', 'httpProxy']}
                    label="HTTP Proxy"
                    rules={[
                      {
                        required: proxyEnabled,
                        message: 'HTTP proxy is required when proxy is enabled',
                      },
                    ]}
                  >
                    <Input placeholder="http://proxy.example.com:8080" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['proxy', 'httpsProxy']}
                    label="HTTPS Proxy"
                  >
                    <Input placeholder="http://proxy.example.com:8080" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name={['proxy', 'noProxy']}
                    label="No Proxy"
                    tooltip="Comma-separated list of hosts that should bypass the proxy"
                  >
                    <Input placeholder="localhost,127.0.0.1,internal.domain" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['proxy', 'username']}
                    label="Proxy Username"
                  >
                    <Input placeholder="Enter username if required" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['proxy', 'password']}
                    label="Proxy Password"
                  >
                    <Input.Password placeholder="Enter password if required" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          
          <Divider orientation="left">API Settings</Divider>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name={['api', 'port']}
                label="API Port"
                rules={[{ required: true, message: 'API port is required' }]}
              >
                <InputNumber min={1} max={65535} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['api', 'enableCors']}
                label="Enable CORS"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['api', 'allowedOrigins']}
                label="Allowed Origins"
                tooltip="Comma-separated list of allowed origins, or * for all"
              >
                <Input placeholder="*" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name={['api', 'rateLimit', 'enabled']}
                label="Enable Rate Limiting"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['api', 'rateLimit', 'requestsPerMinute']}
                label="Requests Per Minute"
              >
                <InputNumber min={1} max={10000} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['api', 'rateLimit', 'ipWhitelist']}
                label="IP Whitelist"
                tooltip="Comma-separated list of IPs or CIDR ranges exempt from rate limiting"
              >
                <Input placeholder="192.168.0.0/16,10.0.0.0/8" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      
      <Modal
        title="Add Network Interface"
        visible={addInterfaceVisible}
        onOk={submitAddInterface}
        onCancel={closeAddInterfaceModal}
      >
        <Form layout="vertical">
          <Form.Item
            name="interfaceType"
            label="Interface Type"
            rules={[{ required: true, message: 'Please select interface type' }]}
          >
            <Select placeholder="Select interface type">
              <Option value="ethernet">Ethernet</Option>
              <Option value="wifi">WiFi</Option>
              <Option value="vpn">VPN</Option>
              <Option value="bridge">Bridge</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="interfaceName"
            label="Interface Name"
            rules={[{ required: true, message: 'Please enter interface name' }]}
          >
            <Input placeholder="Enter interface name" />
          </Form.Item>
          
          <Form.Item
            name="ipAssignment"
            label="IP Assignment"
            rules={[{ required: true, message: 'Please select IP assignment method' }]}
          >
            <Radio.Group>
              <Radio value="dhcp">DHCP</Radio>
              <Radio value="static">Static IP</Radio>
            </Radio.Group>
          </Form.Item>
          
          <div className="static-ip-fields">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="ipAddress"
                  label="IP Address"
                >
                  <Input placeholder="192.168.1.100" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="netmask"
                  label="Netmask"
                >
                  <Input placeholder="255.255.255.0" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="gateway"
                  label="Gateway"
                >
                  <Input placeholder="192.168.1.1" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dns"
                  label="DNS Servers"
                >
                  <Input placeholder="8.8.8.8, 8.8.4.4" />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
      
      <style jsx>{`
        .interface-details {
          padding: 16px;
          background-color: #f5f5f5;
        }
        
        .interface-details h4 {
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .interface-details p {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
};

export default NetworkSettings;
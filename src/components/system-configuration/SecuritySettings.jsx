// src/components/system-configuration/SecuritySettings.jsx
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
  Tabs,
  Upload,
  Modal,
  Radio,
  Popconfirm,
  Badge,
  InputNumber,
} from 'antd';
import {
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  SecurityScanOutlined,
  KeyOutlined,
  UserOutlined,
  UploadOutlined,
  FileProtectOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import api from '../../services/api';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Password } = Input;

const SecuritySettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [users, setUsers] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [addUserVisible, setAddUserVisible] = useState(false);
  const [addCertificateVisible, setAddCertificateVisible] = useState(false);

  // Effects
  useEffect(() => {
    const fetchSecuritySettings = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockUsers =  await api.getSecurityUsers();
        const mockCertificates =  await api.getSecurityCertificates();
        const mockSettings = await api.getSecuritySettings();
        
        // Set mock data
        setUsers(mockUsers);
        setCertificates(mockCertificates);
        form.setFieldsValue(mockSettings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching security settings:', error);
        setLoading(false);
      }
    };

    fetchSecuritySettings();
  }, [form]);

  // Handlers
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Saving security settings:', values);
      message.success('Security settings saved successfully!');
      setSaving(false);
    } catch (error) {
      console.error('Validation error:', error);
      setSaving(false);
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    message.success('User deleted successfully');
  };

  const handleToggleUserStatus = (id, status) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
    message.success(`User ${status === 'active' ? 'disabled' : 'enabled'} successfully`);
  };

  const handleToggle2FA = (id, enabled) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, twoFactorEnabled: !enabled } : user
      )
    );
    message.success(`Two-factor authentication ${enabled ? 'disabled' : 'enabled'} for user`);
  };

  const handleAddUser = () => {
    setAddUserVisible(true);
  };

  const handleAddCertificate = () => {
    setAddCertificateVisible(true);
  };

  const closeAddUserModal = () => {
    setAddUserVisible(false);
  };

  const closeAddCertificateModal = () => {
    setAddCertificateVisible(false);
  };

  const submitAddUser = () => {
    // In a real application, this would add a new user
    message.success('User added successfully');
    setAddUserVisible(false);
  };

  const submitAddCertificate = () => {
    // In a real application, this would add a new certificate
    message.success('Certificate added successfully');
    setAddCertificateVisible(false);
  };

  const handleDeleteCertificate = (id) => {
    setCertificates(certificates.filter((cert) => cert.id !== id));
    message.success('Certificate deleted successfully');
  };

  const handleReissueCertificate = (id) => {
    message.success('Certificate reissue process started');
  };

  const handleDownloadCertificate = (id) => {
    message.success('Certificate download started');
  };

  // Render Helpers
  const renderUserStatus = (status) => {
    const statusMap = {
      active: { text: 'Active', color: 'success' },
      inactive: { text: 'Inactive', color: 'default' },
      locked: { text: 'Locked', color: 'error' },
    };

    const statusInfo = statusMap[status] || { text: status, color: 'default' };

    return <Badge status={statusInfo.color} text={statusInfo.text} />;
  };

  const renderCertificateStatus = (status) => {
    const statusMap = {
      valid: { text: 'Valid', color: 'success' },
      'expiring-soon': { text: 'Expiring Soon', color: 'warning' },
      expired: { text: 'Expired', color: 'error' },
      revoked: { text: 'Revoked', color: 'default' },
    };

    const statusInfo = statusMap[status] || { text: status, color: 'default' };

    return <Badge status={statusInfo.color} text={statusInfo.text} />;
  };

  const renderRoleBadge = (role) => {
    const roleMap = {
      administrator: { color: 'red', icon: <LockOutlined /> },
      operator: { color: 'blue', icon: <UserOutlined /> },
      developer: { color: 'purple', icon: <KeyOutlined /> },
      viewer: { color: 'green', icon: null },
    };

    const roleInfo = roleMap[role] || { color: 'default', icon: null };

    return (
      <Tag color={roleInfo.color} icon={roleInfo.icon}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Tag>
    );
  };

  // Columns Definitions
  const userColumns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)' }}>
            {record.email}
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => renderRoleBadge(role),
      filters: [
        { text: 'Administrator', value: 'administrator' },
        { text: 'Operator', value: 'operator' },
        { text: 'Developer', value: 'developer' },
        { text: 'Viewer', value: 'viewer' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderUserStatus(status),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Locked', value: 'locked' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.lastLogin) - new Date(b.lastLogin),
    },
    {
      title: '2FA',
      dataIndex: 'twoFactorEnabled',
      key: 'twoFactorEnabled',
      render: (enabled, record) => (
        <Switch
          checked={enabled}
          size="small"
          onChange={() => handleToggle2FA(record.id, enabled)}
        />
      ),
      filters: [
        { text: 'Enabled', value: true },
        { text: 'Disabled', value: false },
      ],
      onFilter: (value, record) => record.twoFactorEnabled === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => message.info(`Edit user ${record.username}`)}
          />
          <Button
            icon={record.status === 'active' ? <LockOutlined /> : <UserOutlined />}
            size="small"
            onClick={() => handleToggleUserStatus(record.id, record.status)}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={record.username === 'admin'}
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
              disabled={record.username === 'admin'} // Prevent deletion of admin user
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const certificateColumns = [
    {
      title: 'Certificate',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)' }}>
            {record.issuedTo}
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'server' ? 'blue' : 'purple'}>
          {type === 'server' ? 'Server' : 'Client'}
        </Tag>
      ),
      filters: [
        { text: 'Server', value: 'server' },
        { text: 'Client', value: 'client' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Validity',
      key: 'validity',
      render: (_, record) => (
        <div>
          <div>From: {new Date(record.validFrom).toLocaleDateString()}</div>
          <div>To: {new Date(record.validTo).toLocaleDateString()}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderCertificateStatus(status),
      filters: [
        { text: 'Valid', value: 'valid' },
        { text: 'Expiring Soon', value: 'expiring-soon' },
        { text: 'Expired', value: 'expired' },
        { text: 'Revoked', value: 'revoked' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Algorithm',
      dataIndex: 'algorithm',
      key: 'algorithm',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<FileProtectOutlined />}
            size="small"
            onClick={() => handleDownloadCertificate(record.id)}
          />
          <Button
            icon={<KeyOutlined />}
            size="small"
            onClick={() => handleReissueCertificate(record.id)}
          />
          <Popconfirm
            title="Are you sure you want to delete this certificate?"
            onConfirm={() => handleDeleteCertificate(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // UI Rendering
  return (
    <div className="security-settings">
      <Card
        title={
          <Space>
            <SecurityScanOutlined />
            <span>Security Settings</span>
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
                <LockOutlined />
                General Security
              </span>
            }
            key="general"
          >
            <Form form={form} layout="vertical" disabled={loading}>
              <Divider orientation="left">Password Policy</Divider>

              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name={['general', 'passwordPolicy', 'minLength']}
                    label="Minimum Password Length"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={8} max={32} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['general', 'passwordPolicy', 'passwordExpiryDays']}
                    label="Password Expiry (days)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={0} max={365} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['general', 'passwordPolicy', 'preventReuseCount']}
                    label="Password History"
                    tooltip="Number of previous passwords that cannot be reused"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={0} max={24} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['general', 'enableTwoFactor']}
                    label="Require Two-Factor"
                    valuePropName="checked"
                    tooltip="Require two-factor authentication for all users"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name={['general', 'passwordPolicy', 'requireUppercase']}
                    label="Require Uppercase"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['general', 'passwordPolicy', 'requireLowercase']}
                    label="Require Lowercase"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['general', 'passwordPolicy', 'requireNumbers']}
                    label="Require Numbers"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['general', 'passwordPolicy', 'requireSpecialChars']}
                    label="Require Special Chars"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">Login Security</Divider>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name={['general', 'sessionTimeout']}
                    label="Session Timeout (minutes)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={5} max={1440} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['general', 'maxLoginAttempts']}
                    label="Max Login Attempts"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={10} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['general', 'lockoutDuration']}
                    label="Lockout Duration (minutes)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={5} max={1440} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <LockOutlined />
                TLS/SSL Settings
              </span>
            }
            key="tls"
          >
            <Form form={form} layout="vertical" disabled={loading}>
              <Alert
                message="Important: Changes to TLS settings might require a service restart"
                description="Modifying TLS/SSL configuration could impact existing connections and might require a restart of affected services."
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['tls', 'minTlsVersion']}
                    label="Minimum TLS Version"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select>
                      <Option value="tls1.0">TLS 1.0 (Deprecated)</Option>
                      <Option value="tls1.1">TLS 1.1 (Deprecated)</Option>
                      <Option value="tls1.2">TLS 1.2</Option>
                      <Option value="tls1.3">TLS 1.3</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['tls', 'preferredCipherSuites']}
                    label="Preferred Cipher Suites"
                    tooltip="Comma-separated list of cipher suites in order of preference"
                  >
                    <TextArea rows={2} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name={['tls', 'enableStrictTransportSecurity']}
                    label="HTTP Strict Transport Security"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['tls', 'hstsMaxAge']}
                    label="HSTS Max Age (seconds)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['tls', 'enableOcspStapling']}
                    label="Enable OCSP Stapling"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['tls', 'enforceCertificateRevocation']}
                    label="Enforce Certificate Revocation"
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
                <KeyOutlined />
                API Security
              </span>
            }
            key="api"
          >
            <Form form={form} layout="vertical" disabled={loading}>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name={['api', 'tokenExpiration']}
                    label="Token Expiration (minutes)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={1440} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['api', 'jwtAlgorithm']}
                    label="JWT Signature Algorithm"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select>
                      <Option value="HS256">HS256</Option>
                      <Option value="HS384">HS384</Option>
                      <Option value="HS512">HS512</Option>
                      <Option value="RS256">RS256</Option>
                      <Option value="RS384">RS384</Option>
                      <Option value="RS512">RS512</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['api', 'enforceHttps']}
                    label="Enforce HTTPS for API"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['api', 'enableApiKeyAuth']}
                    label="Enable API Key Authentication"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['api', 'apiKeyExpirationDays']}
                    label="API Key Expiration (days)"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <InputNumber min={1} max={3650} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <UserOutlined />
                User Management
              </span>
            }
            key="users"
          >
            <div className="user-actions" style={{ marginBottom: 16 }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
                Add User
              </Button>
            </div>

            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>

          <TabPane
            tab={
              <span>
                <FileProtectOutlined />
                Certificates
              </span>
            }
            key="certificates"
          >
            <Alert
              message="Certificate Management"
              description="Manage SSL/TLS certificates for secure communication. Ensure certificates are renewed before expiration to avoid service disruptions."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />

            <div className="certificate-actions" style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddCertificate}
              >
                Add Certificate
              </Button>
            </div>

            <Table
              columns={certificateColumns}
              dataSource={certificates}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="certificate-details">
                    <p>
                      <strong>Issued By:</strong> {record.issuedBy}
                    </p>
                    <p>
                      <strong>Fingerprint:</strong> {record.fingerprint}
                    </p>
                  </div>
                ),
              }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Add User Modal */}
      <Modal
        title="Add User"
        visible={addUserVisible}
        onOk={submitAddUser}
        onCancel={closeAddUserModal}
      >
        <Form layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter a username' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter an email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter a password' }]}
          >
            <Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[
              { required: true, message: 'Please confirm the password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select placeholder="Select role">
              <Option value="administrator">Administrator</Option>
              <Option value="operator">Operator</Option>
              <Option value="developer">Developer</Option>
              <Option value="viewer">Viewer</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="requireTwoFactor"
            label="Require Two-Factor Authentication"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Certificate Modal */}
      <Modal
        title="Add Certificate"
        visible={addCertificateVisible}
        onOk={submitAddCertificate}
        onCancel={closeAddCertificateModal}
      >
        <Form layout="vertical">
          <Form.Item
            name="certificateType"
            label="Certificate Type"
            rules={[{ required: true, message: 'Please select a certificate type' }]}
          >
            <Radio.Group>
              <Radio value="server">Server Certificate</Radio>
              <Radio value="client">Client Certificate</Radio>
              <Radio value="ca">Certificate Authority</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="certificateName"
            label="Certificate Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input placeholder="Enter certificate name" />
          </Form.Item>

          <Form.Item
            name="issuedTo"
            label="Common Name (CN)"
            rules={[{ required: true, message: 'Please enter a common name' }]}
          >
            <Input placeholder="e.g., *.example.com" />
          </Form.Item>

          <Form.Item
            name="uploadMethod"
            label="Certificate Source"
            rules={[{ required: true, message: 'Please select a certificate source' }]}
          >           
           <Radio.Group>
              <Radio value="generate">Generate New Certificate</Radio>
              <Radio value="upload">Upload Existing Certificate</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="certificateFile"
            label="Certificate File"
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Select Certificate File</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="keyFile"
            label="Private Key File"
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Select Private Key File</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <style jsx>{`
        .certificate-details {
          padding: 16px;
          background-color: #f5f5f5;
        }

        .certificate-details p {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
};

export default SecuritySettings;
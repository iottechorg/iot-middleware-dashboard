// src/components/system-configuration/GeneralSettings.jsx
import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Select, 
  Switch, 
  InputNumber, 
  Divider, 
  Card, 
  Row, 
  Col, 
  Space,
  message,
  Radio,
  Alert,
  Tooltip,
  TimePicker,
  Tabs
} from 'antd';
import { 
  SaveOutlined, 
  QuestionCircleOutlined, 
  SyncOutlined, 
  SettingOutlined,
  GlobalOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';
import api from '../../services/api';
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const GeneralSettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchSettings = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock data
        const mockSettings = await api.getSystemSettings();
        
        // Set form values
        form.setFieldsValue({
          ...mockSettings
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setLoading(false);
      }
    };
    
    fetchSettings();
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
      
      console.log('Saving settings:', values);
      message.success('Settings saved successfully!');
      setSaving(false);
    } catch (error) {
      console.error('Validation error:', error);
      setSaving(false);
    }
  };
  
  const handleReset = () => {
    // Confirm before resetting form
    if (window.confirm('Are you sure you want to reset all changes?')) {
      // This would typically reload data from the API
      form.resetFields();
      message.info('Form reset to last saved values');
    }
  };
  
  return (
    <Card 
      title={
        <Space>
          <SettingOutlined />
          <span>General System Settings</span>
        </Space>
      }
      extra={
        <Space>
          <Button onClick={handleReset} disabled={loading}>
            Reset
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={saving}
            disabled={loading}
          >
            Save Changes
          </Button>
        </Space>
      }
      loading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        disabled={loading}
      >
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane 
            tab={
              <span>
                <GlobalOutlined />
                General
              </span>
            } 
            key="general"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['general', 'systemName']}
                  label="System Name"
                  rules={[{ required: true, message: 'System name is required' }]}
                >
                  <Input placeholder="Enter system name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['general', 'adminEmail']}
                  label="Administrator Email"
                  rules={[
                    { required: true, message: 'Administrator email is required' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input placeholder="Enter administrator email" />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item
              name={['general', 'description']}
              label="System Description"
            >
              <TextArea rows={3} placeholder="Enter system description" />
            </Form.Item>
            
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name={['general', 'language']}
                  label="Language"
                >
                  <Select placeholder="Select language">
                    <Option value="en-US">English (United States)</Option>
                    <Option value="en-GB">English (United Kingdom)</Option>
                    <Option value="es-ES">Spanish (Spain)</Option>
                    <Option value="fr-FR">French (France)</Option>
                    <Option value="de-DE">German (Germany)</Option>
                    <Option value="ja-JP">Japanese (Japan)</Option>
                    <Option value="zh-CN">Chinese (Simplified)</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['general', 'timezone']}
                  label="Timezone"
                >
                  <Select 
                    placeholder="Select timezone"
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="UTC">UTC</Option>
                    <Option value="America/New_York">America/New_York (EDT/EST)</Option>
                    <Option value="America/Los_Angeles">America/Los_Angeles (PDT/PST)</Option>
                    <Option value="America/Chicago">America/Chicago (CDT/CST)</Option>
                    <Option value="Europe/London">Europe/London (BST/GMT)</Option>
                    <Option value="Europe/Paris">Europe/Paris (CEST/CET)</Option>
                    <Option value="Asia/Tokyo">Asia/Tokyo (JST)</Option>
                    <Option value="Asia/Shanghai">Asia/Shanghai (CST)</Option>
                    <Option value="Australia/Sydney">Australia/Sydney (AEDT/AEST)</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['general', 'timeFormat']}
                  label="Time Format"
                >
                  <Radio.Group>
                    <Radio value="24hour">24-hour</Radio>
                    <Radio value="12hour">12-hour (AM/PM)</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item
              name={['general', 'dateFormat']}
              label="Date Format"
            >
              <Select placeholder="Select date format">
                <Option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</Option>
                <Option value="MM/DD/YYYY">MM/DD/YYYY (US)</Option>
                <Option value="DD/MM/YYYY">DD/MM/YYYY (EU)</Option>
                <Option value="DD.MM.YYYY">DD.MM.YYYY</Option>
                <Option value="YYYY.MM.DD">YYYY.MM.DD</Option>
              </Select>
            </Form.Item>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <SyncOutlined />
                Performance
              </span>
            } 
            key="performance"
          >
            <Alert
              message="Warning: Changing these settings may affect system performance"
              description="Adjusting these values incorrectly can lead to performance issues or system instability. Consult documentation before making changes."
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
            
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name={['performance', 'maxThreads']}
                  label={
                    <span>
                      Max Threads
                      <Tooltip title="Maximum number of concurrent processing threads">
                        <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                      </Tooltip>
                    </span>
                  }
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <InputNumber min={1} max={64} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['performance', 'taskQueueSize']}
                  label={
                    <span>
                      Task Queue Size
                      <Tooltip title="Maximum number of tasks in the queue before rejecting">
                        <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                      </Tooltip>
                    </span>
                  }
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <InputNumber min={10} max={10000} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['performance', 'dataRetentionDays']}
                  label={
                    <span>
                      Data Retention (days)
                      <Tooltip title="Number of days to keep data before automatic cleanup">
                        <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                      </Tooltip>
                    </span>
                  }
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <InputNumber min={1} max={365} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['performance', 'enableCaching']}
                  label="Enable Data Caching"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['performance', 'cacheTTL']}
                  label="Cache TTL (seconds)"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <InputNumber min={60} max={86400} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['performance', 'enableCompression']}
                  label="Enable Data Compression"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['performance', 'loggingLevel']}
                  label="Logging Level"
                >
                  <Select placeholder="Select logging level">
                    <Option value="debug">Debug</Option>
                    <Option value="info">Info</Option>
                    <Option value="warning">Warning</Option>
                    <Option value="error">Error</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <ClockCircleOutlined />
                Maintenance
              </span>
            } 
            key="maintenance"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['maintenance', 'enableAutoUpdates']}
                  label="Enable Automatic Updates"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['maintenance', 'updateCheckInterval']}
                  label="Update Check Interval"
                >
                  <Select placeholder="Select interval">
                    <Option value="hourly">Hourly</Option>
                    <Option value="daily">Daily</Option>
                    <Option value="weekly">Weekly</Option>
                    <Option value="monthly">Monthly</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            
            <Divider orientation="left">Maintenance Window</Divider>
            
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name={['maintenance', 'maintenanceWindow', 'enabled']}
                  label="Enable Maintenance Window"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['maintenance', 'maintenanceWindow', 'dayOfWeek']}
                  label="Day of Week"
                >
                  <Select placeholder="Select day">
                    <Option value="monday">Monday</Option>
                    <Option value="tuesday">Tuesday</Option>
                    <Option value="wednesday">Wednesday</Option>
                    <Option value="thursday">Thursday</Option>
                    <Option value="friday">Friday</Option>
                    <Option value="saturday">Saturday</Option>
                    <Option value="sunday">Sunday</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['maintenance', 'maintenanceWindow', 'startTime']}
                  label="Start Time"
                >
                  <Input placeholder="HH:MM" />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item
              name={['maintenance', 'maintenanceWindow', 'duration']}
              label="Duration (minutes)"
            >
              <InputNumber min={15} max={360} style={{ width: '100%' }} />
            </Form.Item>
            
            <Divider orientation="left">Backup Schedule</Divider>
            
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name={['maintenance', 'backupSchedule', 'enabled']}
                  label="Enable Automated Backup"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['maintenance', 'backupSchedule', 'frequency']}
                  label="Backup Frequency"
                >
                  <Select placeholder="Select frequency">
                    <Option value="daily">Daily</Option>
                    <Option value="weekly">Weekly</Option>
                    <Option value="monthly">Monthly</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={['maintenance', 'backupSchedule', 'time']}
                  label="Backup Time"
                >
                  <Input placeholder="HH:MM" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['maintenance', 'backupSchedule', 'retentionCount']}
                  label="Backup Retention Count"
                  tooltip="Number of backups to keep before deleting the oldest"
                >
                  <InputNumber min={1} max={30} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Backup Location">
                  <Input defaultValue="/var/backups/iot-middleware" disabled />
                  <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(0, 0, 0, 0.45)' }}>
                    Default location. Can be changed in storage settings.
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Form>
    </Card>
  );
};

export default GeneralSettings;
// src/components/task-offloading/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Divider, 
  Row, 
  Col, 
  Card, 
  Slider, 
  InputNumber, 
  Switch, 
  Space,
  Alert,
  Tabs,
  Tag,
  Radio,
  Upload,
  message
} from 'antd';
import { 
  SaveOutlined, 
  RocketOutlined, 
  UploadOutlined, 
  CloudOutlined,
  LaptopOutlined,
  MobileOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const TaskForm = ({ task, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('basic');
  const [taskType, setTaskType] = useState(task ? task.type : 'data-processing');
  const [placementStrategy, setPlacementStrategy] = useState(task ? task.placementStrategy : 'auto');
  const [availableResources, setAvailableResources] = useState({
    edge: [],
    fog: [],
    cloud: []
  });
  const [resourceEstimates, setResourceEstimates] = useState(null);
  
  useEffect(() => {
    // This would be replaced with an actual API call to fetch available resources
    const fetchAvailableResources = async () => {
      // Mock resource data
      const mockResources = {
        edge: [
          { id: 'edge-1', name: 'Edge Device 1', cpu: 80, memory: 2, network: 5 },
          { id: 'edge-2', name: 'Edge Device 2', cpu: 60, memory: 4, network: 10 },
          { id: 'edge-3', name: 'Edge Device 3', cpu: 40, memory: 8, network: 15 }
        ],
        fog: [
          { id: 'fog-1', name: 'Fog Node 1', cpu: 70, memory: 16, network: 100 },
          { id: 'fog-2', name: 'Fog Node 2', cpu: 50, memory: 32, network: 200 }
        ],
        cloud: [
          { id: 'cloud-1', name: 'AWS Instance 1', cpu: 40, memory: 64, network: 1000 },
          { id: 'cloud-2', name: 'Azure VM 1', cpu: 30, memory: 128, network: 2000 },
          { id: 'cloud-3', name: 'Google Cloud 1', cpu: 20, memory: 256, network: 5000 }
        ]
      };
      
      setAvailableResources(mockResources);
    };
    
    fetchAvailableResources();
    
    if (task) {
      // Initialize form with task data
      form.setFieldsValue({
        name: task.name,
        description: task.description,
        type: task.type,
        priority: task.priority,
        placementStrategy: task.placementStrategy,
        resourceRequirements: task.resourceRequirements,
        parameters: task.parameters,
        dependencies: task.dependencies
      });
      
      setTaskType(task.type);
      setPlacementStrategy(task.placementStrategy);
    } else {
      // Initialize with default values for a new task
      form.setFieldsValue({
        name: '',
        description: '',
        type: 'data-processing',
        priority: 'medium',
        placementStrategy: 'auto',
        resourceRequirements: {
          cpu: 2,
          memory: 4,
          network: 10
        },
        parameters: {},
        dependencies: []
      });
    }
  }, [form, task]);
  
  useEffect(() => {
    // Estimate resources based on task type and parameters
    const estimateResources = () => {
      const values = form.getFieldsValue();
      
      // This is a simplified estimation logic - in a real app this would be more sophisticated
      let cpuEstimate, memoryEstimate, networkEstimate;
      
      switch (taskType) {
        case 'ml-inference':
          cpuEstimate = 4;
          memoryEstimate = 8;
          networkEstimate = 20;
          break;
        case 'data-processing':
          cpuEstimate = 2;
          memoryEstimate = 4;
          networkEstimate = 10;
          break;
        case 'protocol-translation':
          cpuEstimate = 1;
          memoryEstimate = 2;
          networkEstimate = 30;
          break;
        case 'sensor-aggregation':
          cpuEstimate = 1;
          memoryEstimate = 1;
          networkEstimate = 5;
          break;
        default:
          cpuEstimate = 1;
          memoryEstimate = 2;
          networkEstimate = 10;
      }
      
      // Adjust based on parameters if available
      if (values.parameters) {
        if (taskType === 'ml-inference' && values.parameters.batchSize) {
          const batchFactor = values.parameters.batchSize / 10;
          cpuEstimate *= batchFactor;
          memoryEstimate *= batchFactor;
        }
      }
      
      setResourceEstimates({
        cpu: cpuEstimate,
        memory: memoryEstimate,
        network: networkEstimate
      });
      
      // Update form resource requirements with estimates if auto-scaling is enabled
      const autoScaling = form.getFieldValue(['resourceRequirements', 'autoScale']);
      if (autoScaling) {
        form.setFieldsValue({
          resourceRequirements: {
            ...values.resourceRequirements,
            cpu: cpuEstimate,
            memory: memoryEstimate,
            network: networkEstimate
          }
        });
      }
    };
    
    estimateResources();
  }, [form, taskType]);
  
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  const handleTaskTypeChange = (value) => {
    setTaskType(value);
    
    // Reset task-specific parameters when type changes
    form.setFieldsValue({
      parameters: {}
    });
  };
  
  const handlePlacementStrategyChange = (value) => {
    setPlacementStrategy(value);
  };
  
  const handleAutoScaleChange = (checked) => {
    if (checked && resourceEstimates) {
      form.setFieldsValue({
        resourceRequirements: {
          ...form.getFieldValue('resourceRequirements'),
          cpu: resourceEstimates.cpu,
          memory: resourceEstimates.memory,
          network: resourceEstimates.network
        }
      });
    }
  };
  
  const getRecommendedPlacement = () => {
    const values = form.getFieldsValue();
    const resourceReqs = values.resourceRequirements || {};
    
    // Simple logic to recommend placement based on resource requirements
    if (resourceReqs.cpu <= 1 && resourceReqs.memory <= 2) {
      return 'edge';
    } else if (resourceReqs.cpu <= 4 && resourceReqs.memory <= 16) {
      return 'fog';
    } else {
      return 'cloud';
    }
  };
  
  const renderTypeSpecificParams = () => {
    switch (taskType) {
      case 'ml-inference':
        return (
          <>
            <Form.Item
              name={['parameters', 'modelName']}
              label="Model Name"
              rules={[{ required: true, message: 'Please select a model' }]}
            >
              <Select placeholder="Select model">
                <Option value="yolov5">YOLOv5 (Object Detection)</Option>
                <Option value="resnet50">ResNet50 (Image Classification)</Option>
                <Option value="bert">BERT (Text Analysis)</Option>
                <Option value="wavenet">WaveNet (Audio Processing)</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name={['parameters', 'batchSize']}
              label="Batch Size"
              initialValue={16}
            >
              <InputNumber min={1} max={128} />
            </Form.Item>
            
            <Form.Item
              name={['parameters', 'accelerator']}
              label="Accelerator"
            >
              <Select placeholder="Select accelerator">
                <Option value="none">None (CPU only)</Option>
                <Option value="gpu">GPU</Option>
                <Option value="tpu">TPU</Option>
                <Option value="vpu">VPU (Vision Processing Unit)</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name={['parameters', 'precision']}
              label="Precision"
              initialValue="fp32"
            >
              <Select placeholder="Select precision">
                <Option value="fp32">FP32 (Full Precision)</Option>
                <Option value="fp16">FP16 (Mixed Precision)</Option>
                <Option value="int8">INT8 (Quantized)</Option>
              </Select>
            </Form.Item>
          </>
        );
        
      case 'data-processing':
        return (
          <>
            <Form.Item
              name={['parameters', 'inputType']}
              label="Input Type"
              rules={[{ required: true, message: 'Please select input type' }]}
            >
              <Select placeholder="Select input type">
                <Option value="csv">CSV</Option>
                <Option value="json">JSON</Option>
                <Option value="binary">Binary</Option>
                <Option value="image">Image</Option>
                <Option value="video">Video</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name={['parameters', 'operations']}
              label="Operations"
            >
              <Select mode="multiple" placeholder="Select operations">
                <Option value="filter">Filter</Option>
                <Option value="transform">Transform</Option>
                <Option value="aggregate">Aggregate</Option>
                <Option value="enrich">Enrich</Option>
                <Option value="compress">Compress</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name={['parameters', 'outputFormat']}
              label="Output Format"
            >
              <Select placeholder="Select output format">
                <Option value="csv">CSV</Option>
                <Option value="json">JSON</Option>
                <Option value="parquet">Parquet</Option>
                <Option value="avro">Avro</Option>
              </Select>
            </Form.Item>
          </>
        );
        
      case 'protocol-translation':
        return (
          <>
            <Form.Item
              name={['parameters', 'sourceProtocol']}
              label="Source Protocol"
              rules={[{ required: true, message: 'Please select source protocol' }]}
            >
              <Select placeholder="Select source protocol">
                <Option value="mqtt">MQTT</Option>
                <Option value="http">HTTP/REST</Option>
                <Option value="coap">CoAP</Option>
                <Option value="modbus">Modbus</Option>
                <Option value="opc-ua">OPC UA</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name={['parameters', 'targetProtocol']}
              label="Target Protocol"
              rules={[{ required: true, message: 'Please select target protocol' }]}
            >
              <Select placeholder="Select target protocol">
                <Option value="mqtt">MQTT</Option>
                <Option value="http">HTTP/REST</Option>
                <Option value="coap">CoAP</Option>
                <Option value="websocket">WebSocket</Option>
                <Option value="kafka">Kafka</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name={['parameters', 'preserveQoS']}
              label="Preserve QoS"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>
          </>
        );
        
      case 'sensor-aggregation':
        return (
          <>
            <Form.Item
              name={['parameters', 'sensorTypes']}
              label="Sensor Types"
              rules={[{ required: true, message: 'Please select at least one sensor type' }]}
            >
              <Select mode="multiple" placeholder="Select sensor types">
                <Option value="temperature">Temperature</Option>
                <Option value="humidity">Humidity</Option>
                <Option value="pressure">Pressure</Option>
                <Option value="light">Light</Option>
                <Option value="motion">Motion</Option>
                <Option value="proximity">Proximity</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name={['parameters', 'aggregationWindow']}
              label="Aggregation Window"
              initialValue={60}
            >
              <InputNumber min={1} addonAfter="seconds" />
            </Form.Item>
            
            <Form.Item
              name={['parameters', 'aggregationFunction']}
              label="Aggregation Function"
            >
              <Select placeholder="Select function">
                <Option value="avg">Average</Option>
                <Option value="sum">Sum</Option>
                <Option value="min">Minimum</Option>
                <Option value="max">Maximum</Option>
                <Option value="count">Count</Option>
              </Select>
            </Form.Item>
          </>
        );
        
      default:
        return (
          <Alert
            message="Select a task type to see specific parameters"
            type="info"
            showIcon
          />
        );
    }
  };
  
  const renderResourceRecommendation = () => {
    if (!resourceEstimates) return null;
    
    return (
      <Alert
        message="Resource Recommendation"
        description={
          <div>
            <p>Based on the selected task type, we recommend:</p>
            <ul>
              <li><strong>CPU:</strong> {resourceEstimates.cpu} cores</li>
              <li><strong>Memory:</strong> {resourceEstimates.memory} GB</li>
              <li><strong>Network:</strong> {resourceEstimates.network} MB/s</li>
              <li><strong>Recommended Placement:</strong> {getRecommendedPlacement()}</li>
            </ul>
          </div>
        }
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
    );
  };
  
  const renderPlacementSection = () => {
    if (placementStrategy === 'auto') {
      return (
        <Alert
          message="Automatic Placement"
          description="The task will be automatically placed on the most suitable resource based on availability and requirements."
          type="info"
          showIcon
        />
      );
    } else if (placementStrategy === 'manual') {
      const selectedLocation = form.getFieldValue(['location', 'type']) || 'cloud';
      
      return (
        <>
          <Form.Item
            name={['location', 'type']}
            label="Location Type"
            initialValue="cloud"
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="edge">
                <MobileOutlined /> Edge
              </Radio.Button>
              <Radio.Button value="fog">
                <LaptopOutlined /> Fog
              </Radio.Button>
              <Radio.Button value="cloud">
                <CloudOutlined /> Cloud
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item
            name={['location', 'resourceId']}
            label="Specific Resource"
            rules={[{ required: true, message: 'Please select a resource' }]}
          >
            <Select placeholder="Select resource">
              {availableResources[selectedLocation]?.map(resource => (
                <Option key={resource.id} value={resource.id}>
                  {resource.name} - CPU: {resource.cpu}%, Memory: {resource.memory} GB
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      );
    }
    
    return null;
  };
  
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Prepare task data
      const taskData = {
        ...values,
        id: task ? task.id : `task-${Date.now()}`
      };
      
      onSave(taskData);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };
  
  return (
    <div className="task-form">
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Basic Information" key="basic">
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Task Name"
              rules={[{ required: true, message: 'Please enter a task name' }]}
            >
              <Input placeholder="Enter task name" />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Description"
            >
              <TextArea
                rows={4}
                placeholder="Describe the purpose of this task"
              />
            </Form.Item>
            
            <Form.Item
              name="type"
              label="Task Type"
              rules={[{ required: true, message: 'Please select a task type' }]}
            >
              <Select 
                placeholder="Select task type"
                onChange={handleTaskTypeChange}
              >
                <Option value="data-processing">Data Processing</Option>
                <Option value="ml-inference">ML Inference</Option>
                <Option value="protocol-translation">Protocol Translation</Option>
                <Option value="sensor-aggregation">Sensor Data Aggregation</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true, message: 'Please select a priority' }]}
            >
              <Select placeholder="Select priority">
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
                <Option value="critical">Critical</Option>
              </Select>
            </Form.Item>
          </Form>
        </TabPane>
        
        <TabPane tab="Parameters" key="parameters">
          <Card title="Task-Specific Parameters">
            <Form
              form={form}
              layout="vertical"
            >
              {renderTypeSpecificParams()}
            </Form>
          </Card>
        </TabPane>
        
        <TabPane tab="Resources" key="resources">
          <Card title="Resource Requirements">
            {renderResourceRecommendation()}
            
            <Form
              form={form}
              layout="vertical"
            >
              <Form.Item
                name={['resourceRequirements', 'autoScale']}
                label="Auto-scale Resources"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch onChange={handleAutoScaleChange} />
              </Form.Item>
              
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name={['resourceRequirements', 'cpu']}
                    label="CPU Cores"
                    rules={[{ required: true, message: 'Please specify CPU requirements' }]}
                  >
                    <InputNumber min={0.5} max={64} step={0.5} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['resourceRequirements', 'memory']}
                    label="Memory (GB)"
                    rules={[{ required: true, message: 'Please specify memory requirements' }]}
                  >
                    <InputNumber min={0.5} max={256} step={0.5} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['resourceRequirements', 'network']}
                    label="Network (MB/s)"
                    rules={[{ required: true, message: 'Please specify network requirements' }]}
                  >
                    <InputNumber min={1} max={10000} step={1} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="placementStrategy"
                label="Placement Strategy"
                rules={[{ required: true, message: 'Please select a placement strategy' }]}
              >
                <Radio.Group onChange={(e) => handlePlacementStrategyChange(e.target.value)}>
                  <Radio value="auto">Auto (Recommended)</Radio>
                  <Radio value="manual">Manual Selection</Radio>
                </Radio.Group>
              </Form.Item>
              
              {renderPlacementSection()}
            </Form>
          </Card>
        </TabPane>
        
        <TabPane tab="Dependencies" key="dependencies">
          <Card title="Task Dependencies">
            <Form
              form={form}
              layout="vertical"
            >
              <Form.List name="dependencies">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(field => (
                      <div key={field.key} className="dependency-item">
                        <Space align="baseline">
                          <Form.Item
                            {...field}
                            name={[field.name, 'taskId']}
                            fieldKey={[field.fieldKey, 'taskId']}
                            rules={[{ required: true, message: 'Select task' }]}
                          >
                            <Select placeholder="Select dependency" style={{ width: 300 }}>
                              <Option value="task-3">Data Pre-processing</Option>
                              <Option value="task-7">Model Loading</Option>
                              <Option value="task-12">Data Collection</Option>
                            </Select>
                          </Form.Item>
                          
                          <Form.Item
                            {...field}
                            name={[field.name, 'type']}
                            fieldKey={[field.fieldKey, 'type']}
                            rules={[{ required: true, message: 'Select type' }]}
                          >
                            <Select placeholder="Dependency type" style={{ width: 150 }}>
                              <Option value="required">Required</Option>
                              <Option value="optional">Optional</Option>
                            </Select>
                          </Form.Item>
                          
                          <Button
                            type="danger"
                            icon={<MinusCircleOutlined />}
                            onClick={() => remove(field.name)}
                          />
                        </Space>
                      </div>
                    ))}
                    
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Dependency
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
      
      <Divider />
      
      <div className="form-actions">
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSubmit}
          >
            Save Task
          </Button>
          <Button
            type="default"
            icon={<RocketOutlined />}
            onClick={() => {
              handleSubmit();
              message.success('Task scheduled for immediate execution');
            }}
          >
            Save and Execute
          </Button>
        </Space>
      </div>
      
      <style jsx>{`
        .task-form {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .dependency-item {
          margin-bottom: 8px;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};

export default TaskForm;
// src/components/system-configuration/SystemConfiguration.jsx
import React, { useState } from 'react';
import { Tabs } from 'antd';
import { 
  SettingOutlined, 
  GlobalOutlined, 
  SecurityScanOutlined,
  DatabaseOutlined 
} from '@ant-design/icons';

import GeneralSettings from './GeneralSettings';
import NetworkSettings from './NetworkSettings';
import SecuritySettings from './SecuritySettings';
import StorageSettings from './StorageSettings';

const { TabPane } = Tabs;

const SystemConfiguration = () => {
  const [activeTab, setActiveTab] = useState('general');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="system-configuration">
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane
          tab={
            <span>
              <SettingOutlined />
              General
            </span>
          }
          key="general"
        >
          <GeneralSettings />
        </TabPane>
        
        <TabPane
          tab={
            <span>
              <GlobalOutlined />
              Network
            </span>
          }
          key="network"
        >
          <NetworkSettings />
        </TabPane>
        
        <TabPane
          tab={
            <span>
              <SecurityScanOutlined />
              Security
            </span>
          }
          key="security"
        >
          <SecuritySettings />
        </TabPane>
        
        <TabPane
          tab={
            <span>
              <DatabaseOutlined />
              Storage
            </span>
          }
          key="storage"
        >
          <StorageSettings />
        </TabPane>
      </Tabs>
      
      <style jsx>{`
        .system-configuration {
          min-height: 800px;
        }
      `}</style>
    </div>
  );
};

export default SystemConfiguration;
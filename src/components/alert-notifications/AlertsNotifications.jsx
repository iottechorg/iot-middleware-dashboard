import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import AlertList from './AlertList';
import AlertHistory from './AlertHistory';
import AlertRules from './AlertRules';
import NotificationSettings from './NotificaitonSettings';

const AlertsNotifications = () => {
  const [activeTab, setActiveTab] = useState('alerts');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h1>
        <p className="text-gray-500">Manage system alerts and notification settings</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-6">
          <Button
            variant={activeTab === 'alerts' ? 'tab-active' : 'tab'}
            onClick={() => setActiveTab('alerts')}
          >
            Active Alerts
          </Button>
          <Button
            variant={activeTab === 'history' ? 'tab-active' : 'tab'}
            onClick={() => setActiveTab('history')}
          >
            Alert History
          </Button>
          <Button
            variant={activeTab === 'rules' ? 'tab-active' : 'tab'}
            onClick={() => setActiveTab('rules')}
          >
            Alert Rules
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'tab-active' : 'tab'}
            onClick={() => setActiveTab('settings')}
          >
            Notification Settings
          </Button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'alerts' && <AlertList />}
        {activeTab === 'history' && <AlertHistory />}
        {activeTab === 'rules' && <AlertRules />}
        {activeTab === 'settings' && <NotificationSettings />}
      </div>
    </div>
  );
};

export default AlertsNotifications;
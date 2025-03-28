import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import api from '../../services/api';
import { notification } from 'antd';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    channels: [],
    preferences: {
      criticalAlerts: true,
      warningAlerts: true,
      infoAlerts: false,
      systemUpdates: true,
      securityEvents: true,
      deviceEvents: false,
      dailyDigest: true
    }
  });
  const [loading, setLoading] = useState(true);
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [newChannel, setNewChannel] = useState({
    type: 'email',
    destination: '',
    name: '',
    enabled: true
  });

  useEffect(() => {
    // Simulate API call to fetch notification settings
    const fetchSettings = async () => {
      try {
        // Replace with actual API call
        const  notifications = await api.getNotificationSettings();
        setSettings({
          channels:  notifications.channels || [],
          preferences: notifications.preferences || {
            criticalAlerts: true,
            warningAlerts: true,
            infoAlerts: false,
            systemUpdates: true,
            securityEvents: true,
            deviceEvents: false,
            dailyDigest: true
          }
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notification settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleToggleChannel = (id) => {
    setSettings(prev => ({
      ...prev,
      channels: prev.channels.map(channel =>
        channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
      )
    }));
    // In a real app, you would call an API to update the channel
  };

  const handleDeleteChannel = (id) => {
    setSettings(prev => ({
      ...prev,
      channels: prev.channels.filter(channel => channel.id !== id)
    }));
    // In a real app, you would call an API to delete the channel
  };

  const handleAddChannel = () => {
    const newChannelWithId = {
      ...newChannel,
      id: Date.now().toString()
    };
    
    setSettings(prev => ({
      ...prev,
      channels: [...prev.channels, newChannelWithId]
    }));
    
    setNewChannel({
      type: 'email',
      destination: '',
      name: '',
      enabled: true
    });
    
    setShowAddChannel(false);
    // In a real app, you would call an API to add the channel
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewChannel(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }));
    // In a real app, you would call an API to update the preferences
  };

  const getChannelTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return '✉️';
      case 'sms':
        return '📱';
      case 'webhook':
        return '🔗';
      case 'slack':
        return '💬';
      default:
        return '📢';
    }
  };

  return (
    <Card title="Notification Settings">
      {loading ? (
        <div className="flex justify-center p-4">Loading settings...</div>
      ) : (
        <div className="space-y-6">
          {/* Notification Channels */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Notification Channels</h3>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAddChannel(true)}
              >
                Add Channel
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              {settings.channels.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No notification channels configured. Add a channel to receive alerts.
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {settings.channels.map((channel) => (
                    <li key={channel.id} className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{channel.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={channel.enabled}
                            onChange={() => handleToggleChannel(channel.id)}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log('Edit channel', channel.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteChannel(channel.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Notification Preferences */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    id="criticalAlerts"
                    name="criticalAlerts"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={settings.preferences.criticalAlerts}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="criticalAlerts" className="ml-2 block text-sm text-gray-900">
                    Critical Alerts
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="warningAlerts"
                    name="warningAlerts"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={settings.preferences.warningAlerts}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="warningAlerts" className="ml-2 block text-sm text-gray-900">
                    Warning Alerts
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="infoAlerts"
                    name="infoAlerts"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={settings.preferences.infoAlerts}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="infoAlerts" className="ml-2 block text-sm text-gray-900">
                    Info Alerts
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="systemUpdates"
                    name="systemUpdates"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={settings.preferences.systemUpdates}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="systemUpdates" className="ml-2 block text-sm text-gray-900">
                    System Updates
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="securityEvents"
                    name="securityEvents"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={settings.preferences.securityEvents}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="securityEvents" className="ml-2 block text-sm text-gray-900">
                    Security Events
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="deviceEvents"
                    name="deviceEvents"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={settings.preferences.deviceEvents}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="deviceEvents" className="ml-2 block text-sm text-gray-900">
                    Device Events
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="dailyDigest"
                    name="dailyDigest"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={settings.preferences.dailyDigest}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="dailyDigest" className="ml-2 block text-sm text-gray-900">
                    Daily Digest
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={() => console.log('Save preferences', settings.preferences)}
            >
              Save Preferences
            </Button>
          </div>
        </div>
      )}

      {/* Add New Channel Modal */}
      {showAddChannel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Notification Channel</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Channel Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newChannel.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Development Team Email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Channel Type
                </label>
                <select
                  name="type"
                  value={newChannel.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="webhook">Webhook</option>
                  <option value="slack">Slack</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {newChannel.type === 'email' ? 'Email Address' : 
                   newChannel.type === 'sms' ? 'Phone Number' :
                   newChannel.type === 'webhook' ? 'Webhook URL' :
                   newChannel.type === 'slack' ? 'Slack Channel URL' : 'Destination'}
                </label>
                <input
                  type="text"
                  name="destination"
                  value={newChannel.destination}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={newChannel.type === 'email' ? 'team@example.com' : 
                              newChannel.type === 'sms' ? '+1234567890' :
                              newChannel.type === 'webhook' ? 'https://example.com/webhook' :
                              newChannel.type === 'slack' ? 'https://hooks.slack.com/services/...' : ''}
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={newChannel.enabled}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable channel immediately
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowAddChannel(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleAddChannel}
                disabled={!newChannel.name || !newChannel.destination}
              >
                Add Channel
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default NotificationSettings;
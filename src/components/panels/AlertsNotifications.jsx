// src/components/panels/AlertsNotifications.jsx

import React from 'react';
import Card from '../common/Card';
import AlertsNotificationsComponent from '../alert-notifications/AlertsNotifications';

const AlertsNotifications = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Alerts & Notifications</h2>
          <AlertsNotificationsComponent />
        </div>
      </Card>
    </div>
  );
};

export default AlertsNotifications;
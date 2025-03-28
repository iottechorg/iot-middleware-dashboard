// src/components/panels/SystemConfiguration.jsx

import React from 'react';
import Card from '../common/Card';
import SystemConfigComponent from '../system-configuration/SystemConfiguration';

const SystemConfiguration = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">System Configuration</h2>
          <SystemConfigComponent />
        </div>
      </Card>
    </div>
  );
};

export default SystemConfiguration;
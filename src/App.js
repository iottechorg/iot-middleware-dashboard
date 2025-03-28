// src/App.jsx
import React from 'react'; // Import React

import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import OverviewDashboard from './components/panels/OverviewDashboard';
import DeviceManagement from './components/panels/DeviceManagement';
import ProtocolHandlers from './components/panels/ProtocolHandlers';
import DataProcessing from './components/panels/DataProcessing';
import TaskOffloading from './components/panels/TaskOffloading';
import SystemConfiguration from './components/panels/SystemConfiguration';
import AlertsNotifications from './components/panels/AlertsNotifications';

function App() {
  const [activePanel, setActivePanel] = useState('overview');

  // Map panel IDs to their respective components
  const panels = {
    overview: <OverviewDashboard />,
    devices: <DeviceManagement />,
    protocols: <ProtocolHandlers />,
    dataProcessing: <DataProcessing />,
    taskOffloading: <TaskOffloading />,
    systemConfig: <SystemConfiguration />,
    alerts: <AlertsNotifications />,
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header activePanel={activePanel} />
        <main className="flex-1 overflow-y-auto p-4">
          {panels[activePanel]}
        </main>
      </div>
    </div>
  );
}

export default App;
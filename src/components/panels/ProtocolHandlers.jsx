// src/components/panels/ProtocolHandlers.jsx
import React from 'react'; // Import React
import Card from '../common/Card';
import ProtocolHandlersComponent from '../protocol/ProtocolHandlers';

const ProtocolHandlers = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Protocol Handlers</h2>
          <ProtocolHandlersComponent />
        </div>
      </Card>
    </div>
  );
};

export default ProtocolHandlers;
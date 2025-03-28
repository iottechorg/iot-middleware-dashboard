// src/components/panels/overview/StatusCard.jsx
import React from 'react';
import Card from '../common/Card';
import StatusIndicator from '../common/StatusIndicator';

/**
 * Component that displays system component status
 * @param {Object} props
 * @param {string} props.title - Component name
 * @param {string} props.status - Current status (healthy, warning, critical)
 * @param {string} props.details - Additional details about the status
 * @param {React.ReactNode} props.icon - Icon for the component
 */
const StatusCard = ({
  title,
  status,
  details,
  icon,
  ...props
}) => {
  // Map status to color and icon
  const statusMap = {
    healthy: {
      color: 'text-green-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    warning: {
      color: 'text-yellow-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    critical: {
      color: 'text-red-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    }
  };
  
  const statusInfo = statusMap[status] || statusMap.warning;
  
  return (
    <Card className="h-full" {...props}>
      <div className="flex items-center mb-2">
        <div className="mr-2 text-blue-500">
          {icon}
        </div>
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>
      
      <div className="flex items-center mb-2">
        {statusInfo.icon}
        <span className={`ml-2 font-medium ${statusInfo.color}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      <p className="text-sm text-gray-500">{details}</p>
    </Card>
  );
};

export default StatusCard;
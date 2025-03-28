
// src/components/common/StatusIndicator.jsx
import React from 'react';

/**
 * Status indicator that shows different states with color coding
 * @param {Object} props
 * @param {string} props.status - Current status (online, offline, warning, error, success)
 * @param {string} [props.size='md'] - Size of the indicator (sm, md, lg)
 * @param {string} [props.label] - Optional label text to display
 * @param {boolean} [props.pulse=false] - Whether the indicator should pulse
 */
const StatusIndicator = ({
  status,
  size = 'md',
  label,
  pulse = false,
  className = '',
  ...props
}) => {
  // Status colors
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    critical: 'bg-red-600',
    success: 'bg-green-500',
    healthy: 'bg-green-500',
    idle: 'bg-blue-400'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };
  
  // Text size classes based on indicator size
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  // Pulse animation
  const pulseClass = pulse ? 'animate-pulse' : '';
  
  return (
    <div className={`flex items-center ${className}`} {...props}>
      <div 
        className={`
          ${statusColors[status] || 'bg-gray-500'} 
          ${sizeClasses[size]} 
          ${pulseClass} 
          rounded-full
        `}
      />
      {label && (
        <span className={`ml-2 ${textSizeClasses[size]}`}>
          {label}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;
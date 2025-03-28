
// src/components/common/Card.jsx
import React from 'react';

/**
 * Card component for containing content with optional header and footer
 * @param {Object} props
 * @param {string} [props.title] - Card title displayed in header
 * @param {React.ReactNode} [props.headerAction] - Action element displayed in header
 * @param {React.ReactNode} [props.footer] - Footer content
 * @param {boolean} [props.noPadding=false] - Remove padding from content area
 * @param {React.ReactNode} props.children - Card content
 */
const Card = ({
  title,
  headerAction,
  footer,
  noPadding = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow overflow-hidden ${className}`}
      {...props}
    >
      {(title || headerAction) && (
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          {title && <h3 className="font-medium text-gray-900">{title}</h3>}
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-4'}>
        {children}
      </div>
      
      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
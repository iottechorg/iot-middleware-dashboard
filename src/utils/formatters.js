
// src/utils/formatters.js

/**
 * Format a number with thousands separators
 * @param {number} value - Number to format
 * @param {number} [precision=0] - Decimal precision
 * @returns {string} Formatted number
 */
export const formatNumber = (value, precision = 0) => {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }
    
    return Number(value).toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    });
  };
  
  /**
   * Format a value as a percentage
   * @param {number} value - Value to format (0-100 or 0-1)
   * @param {number} [precision=1] - Decimal precision
   * @param {boolean} [convertFromDecimal=false] - Whether to convert from decimal (0-1)
   * @returns {string} Formatted percentage
   */
  export const formatPercent = (value, precision = 1, convertFromDecimal = false) => {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }
    
    const percentValue = convertFromDecimal && value <= 1 ? value * 100 : value;
    
    return `${Number(percentValue).toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    })}%`;
  };
  
  /**
   * Format a file size in bytes to a human-readable string
   * @param {number} bytes - Size in bytes
   * @param {number} [precision=2] - Decimal precision
   * @returns {string} Formatted file size
   */
  export const formatFileSize = (bytes, precision = 2) => {
    if (bytes === 0) return '0 Bytes';
    if (!bytes || isNaN(bytes)) return '';
    
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, unitIndex);
    
    return `${value.toFixed(precision)} ${units[unitIndex]}`;
  };
  
  /**
   * Format a data rate (bytes per second) to a human-readable string
   * @param {number} bytesPerSecond - Rate in bytes per second
   * @param {number} [precision=2] - Decimal precision
   * @returns {string} Formatted data rate
   */
  export const formatDataRate = (bytesPerSecond, precision = 2) => {
    if (bytesPerSecond === 0) return '0 Bps';
    if (!bytesPerSecond || isNaN(bytesPerSecond)) return '';
    
    const units = ['Bps', 'KBps', 'MBps', 'GBps', 'TBps'];
    const unitIndex = Math.floor(Math.log(bytesPerSecond) / Math.log(1024));
    const value = bytesPerSecond / Math.pow(1024, unitIndex);
    
    return `${value.toFixed(precision)} ${units[unitIndex]}`;
  };
  
  /**
   * Format a number as a metric with K, M, B, T suffixes
   * @param {number} value - Number to format
   * @param {number} [precision=1] - Decimal precision
   * @returns {string} Formatted metric
   */
  export const formatMetric = (value, precision = 1) => {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }
    
    if (value === 0) return '0';
    
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';
    
    if (absValue < 1000) {
      return `${sign}${absValue.toFixed(precision).replace(/\.0+$/, '')}`;
    } else if (absValue < 1000000) {
      return `${sign}${(absValue / 1000).toFixed(precision).replace(/\.0+$/, '')}K`;
    } else if (absValue < 1000000000) {
      return `${sign}${(absValue / 1000000).toFixed(precision).replace(/\.0+$/, '')}M`;
    } else if (absValue < 1000000000000) {
      return `${sign}${(absValue / 1000000000).toFixed(precision).replace(/\.0+$/, '')}B`;
    } else {
      return `${sign}${(absValue / 1000000000000).toFixed(precision).replace(/\.0+$/, '')}T`;
    }
  };
  
  /**
   * Truncate a string if it exceeds a maximum length
   * @param {string} str - String to truncate
   * @param {number} [maxLength=50] - Maximum length
   * @param {string} [suffix='...'] - Suffix to add to truncated string
   * @returns {string} Truncated string
   */
  export const truncateString = (str, maxLength = 50, suffix = '...') => {
    if (!str) return '';
    
    if (str.length <= maxLength) return str;
    
    return str.slice(0, maxLength - suffix.length) + suffix;
  };
  
  /**
   * Format an IP address with optional port
   * @param {string} ip - IP address
   * @param {number|string} [port] - Port number
   * @returns {string} Formatted IP address
   */
  export const formatIpAddress = (ip, port) => {
    if (!ip) return '';
    
    return port ? `${ip}:${port}` : ip;
  };
  
  export default {
    formatNumber,
    formatPercent,
    formatFileSize,
    formatDataRate,
    formatMetric,
    truncateString,
    formatIpAddress
  };
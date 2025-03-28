
// src/utils/dateUtils.js

/**
 * Format a date as a string
 * @param {Date} date - Date to format
 * @param {string} [format='full'] - Format type: 'full', 'date', 'time', 'datetime', 'relative'
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'full') => {
    if (!date) return '';
    
    // Convert string dates to Date objects
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Return empty string for invalid dates
    if (isNaN(dateObj.getTime())) {
      console.warn('Invalid date:', date);
      return '';
    }
    
    switch (format) {
      case 'full':
        return dateObj.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
      case 'date':
        return dateObj.toLocaleDateString();
        
      case 'time':
        return dateObj.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit'
        });
        
      case 'datetime':
        return dateObj.toLocaleDateString() + ' ' + 
          dateObj.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
          });
          
      case 'relative':
        return formatRelativeTime(dateObj);
        
      default:
        return dateObj.toString();
    }
  };
  
  /**
   * Format a date as a relative time (e.g., "2 hours ago")
   * @param {Date} date - Date to format
   * @returns {string} Relative time string
   */
  export const formatRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) {
      return diffSec <= 5 ? 'just now' : `${diffSec} seconds ago`;
    }
    
    if (diffMin < 60) {
      return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
    }
    
    if (diffHour < 24) {
      return `${diffHour} hour${diffHour === 1 ? '' : 's'} ago`;
    }
    
    if (diffDay < 7) {
      return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
    }
    
    // For older dates, just use the date format
    return formatDate(date, 'date');
  };
  
  /**
   * Format a duration in seconds to a human-readable string
   * @param {number} seconds - Duration in seconds
   * @param {boolean} [compact=false] - Whether to use compact format
   * @returns {string} Formatted duration string
   */
  export const formatDuration = (seconds, compact = false) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
      return '';
    }
    
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (compact) {
      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      if (hours > 0) parts.push(`${hours}h`);
      if (minutes > 0) parts.push(`${minutes}m`);
      if (remainingSeconds > 0 && parts.length === 0) parts.push(`${remainingSeconds}s`);
      
      return parts.length > 0 ? parts.join(' ') : '0s';
    } else {
      const parts = [];
      if (days > 0) parts.push(`${days} day${days === 1 ? '' : 's'}`);
      if (hours > 0) parts.push(`${hours} hour${hours === 1 ? '' : 's'}`);
      if (minutes > 0) parts.push(`${minutes} minute${minutes === 1 ? '' : 's'}`);
      if (remainingSeconds > 0 && parts.length === 0) {
        parts.push(`${remainingSeconds} second${remainingSeconds === 1 ? '' : 's'}`);
      }
      
      return parts.length > 0 ? parts.join(', ') : '0 seconds';
    }
  };
  
  /**
   * Get start and end dates for different time ranges
   * @param {string} range - Time range: 'today', 'yesterday', 'week', 'month', 'year'
   * @returns {Object} Object with start and end dates
   */
  export const getDateRange = (range) => {
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);
    
    switch (range) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        break;
        
      case 'yesterday':
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        break;
        
      case 'week':
        start.setDate(start.getDate() - start.getDay());
        start.setHours(0, 0, 0, 0);
        break;
        
      case 'month':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        break;
        
      case 'year':
        start.setMonth(0, 1);
        start.setHours(0, 0, 0, 0);
        break;
        
      // Custom formats for IoT data
      case '1h':
        start.setHours(start.getHours() - 1);
        break;
        
      case '6h':
        start.setHours(start.getHours() - 6);
        break;
        
      case '24h':
        start.setHours(start.getHours() - 24);
        break;
        
      case '7d':
        start.setDate(start.getDate() - 7);
        break;
        
      case '30d':
        start.setDate(start.getDate() - 30);
        break;
        
      default:
        break;
    }
    
    return {
      start,
      end
    };
  };
  
  export default {
    formatDate,
    formatRelativeTime,
    formatDuration,
    getDateRange
  };
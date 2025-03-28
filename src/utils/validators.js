// src/utils/validators.js

/**
 * A utility module for form validation with common validation patterns
 */

/**
 * Validates that a value is not empty
 * 
 * @param {*} value The value to check
 * @param {string} message Custom error message (optional)
 * @returns {string|null} Error message or null if valid
 */
export const required = (value, message = 'This field is required') => {
    if (value === undefined || value === null || value === '') {
      return message;
    }
    
    if (typeof value === 'string' && value.trim() === '') {
      return message;
    }
    
    if (Array.isArray(value) && value.length === 0) {
      return message;
    }
    
    return null;
  };
  
  /**
   * Validates minimum length for a string
   * 
   * @param {number} minLength Minimum length required
   * @param {string} message Custom error message (optional)
   * @returns {function} Validation function
   */
  export const minLength = (minLength, message) => (value) => {
    if (value === undefined || value === null || value === '') {
      return null; // Skip validation if empty (use required() for that)
    }
    
    if (typeof value !== 'string') {
      return 'Value must be a string';
    }
    
    if (value.length < minLength) {
      return message || `Must be at least ${minLength} characters`;
    }
    
    return null;
  };
  
  /**
   * Validates maximum length for a string
   * 
   * @param {number} maxLength Maximum length allowed
   * @param {string} message Custom error message (optional)
   * @returns {function} Validation function
   */
  export const maxLength = (maxLength, message) => (value) => {
    if (value === undefined || value === null || value === '') {
      return null; // Skip validation if empty
    }
    
    if (typeof value !== 'string') {
      return 'Value must be a string';
    }
    
    if (value.length > maxLength) {
      return message || `Must be at most ${maxLength} characters`;
    }
    
    return null;
  };
  
  /**
   * Validates that a value is a valid email address
   * 
   * @param {string} value The value to check
   * @param {string} message Custom error message (optional)
   * @returns {string|null} Error message or null if valid
   */
  export const email = (value, message = 'Please enter a valid email address') => {
    if (value === undefined || value === null || value === '') {
      return null; // Skip validation if empty (use required() for that)
    }
    
    // Email regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(value)) {
      return message;
    }
    
    return null;
  };
  
  /**
   * Validates that a value is a number within optional range
   * 
   * @param {Object} options Configuration options
   * @param {number} options.min Minimum value (optional)
   * @param {number} options.max Maximum value (optional)
   * @param {boolean} options.integer Whether the value must be an integer (optional)
   * @param {string} options.message Custom error message (optional)
   * @returns {function} Validation function
   */
  export const number = (options = {}) => (value) => {
    if (value === undefined || value === null || value === '') {
      return null; // Skip validation if empty (use required() for that)
    }
    
    const { min, max, integer, message } = options;
    const numValue = Number(value);
    
    if (isNaN(numValue)) {
      return message || 'Please enter a valid number';
    }
    
    if (integer && !Number.isInteger(numValue)) {
      return message || 'Please enter a whole number';
    }
    
    if (min !== undefined && numValue < min) {
      return message || `Value must be greater than or equal to ${min}`;
    }
    
    if (max !== undefined && numValue > max) {
      return message || `Value must be less than or equal to ${max}`;
    }
    
    return null;
  };
  
  /**
   * Validates that a value matches a regex pattern
   * 
   * @param {RegExp} pattern The pattern to match against
   * @param {string} message Custom error message (optional)
   * @returns {function} Validation function
   */
  export const pattern = (pattern, message = 'Invalid format') => (value) => {
    if (value === undefined || value === null || value === '') {
      return null; // Skip validation if empty (use required() for that)
    }
    
    if (!pattern.test(value)) {
      return message;
    }
    
    return null;
  };
  
  /**
   * Validates that a value matches another field value (e.g., password confirmation)
   * 
   * @param {string} fieldName The name of the field to match against
   * @param {Object} formValues The form values object
   * @param {string} message Custom error message (optional)
   * @returns {function} Validation function
   */
  export const matches = (fieldName, formValues, message) => (value) => {
    if (value === undefined || value === null || value === '') {
      return null; // Skip validation if empty (use required() for that)
    }
    
    const fieldValue = formValues[fieldName];
    
    if (value !== fieldValue) {
      return message || `Must match ${fieldName}`;
    }
    
    return null;
  };
  
  /**
   * Validates a URL
   * 
   * @param {Object} options Configuration options
   * @param {boolean} options.requireProtocol Whether the URL must include a protocol (optional)
   * @param {string} options.message Custom error message (optional)
   * @returns {function} Validation function
   */
  export const url = (options = {}) => (value) => {
    if (value === undefined || value === null || value === '') {
      return null; // Skip validation if empty (use required() for that)
    }
    
    const { requireProtocol = true, message = 'Please enter a valid URL' } = options;
    
    let pattern;
    if (requireProtocol) {
      pattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    } else {
      pattern = /^((https?:\/\/)?(www\.)?)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    }
    
    if (!pattern.test(value)) {
      return message;
    }
    
    return null;
  };
  
  /**
   * Validates an IP address (v4 or v6)
   * 
   * @param {Object} options Configuration options
   * @param {string} options.version IP version to validate ('v4', 'v6', or 'both')
   * @param {string} options.message Custom error message (optional)
   * @returns {function} Validation function
   */
  export const ipAddress = (options = {}) => (value) => {
    if (value === undefined || value === null || value === '') {
      return null; // Skip validation if empty (use required() for that)
    }
    
    const { version = 'both', message } = options;
    
    // IPv4 pattern
    const ipv4Pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    
    // Simplified IPv6 pattern (not fully comprehensive)
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,7}:|^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}$|^([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}$|^([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}$|^([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})$|^:((:[0-9a-fA-F]{1,4}){1,7}|:)$/;
    
    if (version === 'v4' || version === 'both') {
      if (ipv4Pattern.test(value)) {
        // Additional validation for IPv4 address
        const parts = value.split('.').map(part => parseInt(part, 10));
        const isValid = parts.every(part => part >= 0 && part <= 255);
        
        if (isValid) {
          return null;
        }
      }
    }
    
    if (version === 'v6' || version === 'both') {
      if (ipv6Pattern.test(value)) {
        return null;
      }
    }
    
    return message || `Please enter a valid IP${version === 'v4' ? 'v4' : version === 'v6' ? 'v6' : ''} address`;
  };
  
  /**
   * Validates a MAC address
   * 
   * @param {string} value The value to check
   * @param {string} message Custom error message (optional)
   * @returns {string|null} Error message or null if valid
   */
  export const macAddress = (value, message = 'Please enter a valid MAC address') => {
    if (value === undefined || value === null || value === '') {
      return null; // Skip validation if empty (use required() for that)
    }
    
    // MAC address patterns (various formats)
    const patterns = [
      /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/i,                  // 00:1A:2B:3C:4D:5E
      /^([0-9A-F]{4}[.]){2}([0-9A-F]{4})$/i,                   // 001A.2B3C.4D5E
      /^([0-9A-F]{12})$/i                                       // 001A2B3C4D5E
    ];
    
    if (patterns.some(pattern => pattern.test(value))) {
      return null;
    }
    
    return message;
  };
  
  /**
   * Runs multiple validators against a value
   * 
   * @param {Array} validators Array of validator functions to run
   * @returns {function} Validation function that returns the first error found
   */
  export const compose = (validators) => (value, formValues) => {
    for (const validator of validators) {
      const error = validator(value, formValues);
      if (error) {
        return error;
      }
    }
    
    return null;
  };
  
  export default {
    required,
    minLength,
    maxLength,
    email,
    number,
    pattern,
    matches,
    url,
    ipAddress,
    macAddress,
    compose
  };
// src/utils/localStorage.js

/**
 * A utility module for handling localStorage operations with error handling,
 * serialization, expiration, and namespace support.
 */

// Prefix for all keys to avoid collisions with other apps
const APP_PREFIX = 'iot_middleware_';

/**
 * Get a value from localStorage with proper parsing
 * 
 * @param {string} key The key to retrieve
 * @param {*} defaultValue Default value if the key doesn't exist
 * @param {string} namespace Optional namespace to append to the key
 * @returns {*} The retrieved value or defaultValue if not found
 */
export const getItem = (key, defaultValue = null, namespace = '') => {
  try {
    const prefixedKey = buildKey(key, namespace);
    const item = localStorage.getItem(prefixedKey);
    
    if (item === null) {
      return defaultValue;
    }
    
    const parsedItem = JSON.parse(item);
    
    // Check if the item has expired
    if (parsedItem._expires && new Date(parsedItem._expires) < new Date()) {
      // Remove the expired item
      removeItem(key, namespace);
      return defaultValue;
    }
    
    return parsedItem._value;
  } catch (error) {
    console.error(`Error getting item "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Store a value in localStorage with proper serialization
 * 
 * @param {string} key The key to store
 * @param {*} value The value to store
 * @param {string} namespace Optional namespace to append to the key
 * @param {number} expiresInMinutes Optional expiration time in minutes
 * @returns {boolean} Success status
 */
export const setItem = (key, value, namespace = '', expiresInMinutes = null) => {
  try {
    const prefixedKey = buildKey(key, namespace);
    
    // Prepare the value with metadata
    const itemToStore = {
      _value: value,
      _timestamp: new Date().toISOString()
    };
    
    // Add expiration if specified
    if (expiresInMinutes !== null) {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + expiresInMinutes);
      itemToStore._expires = expiryDate.toISOString();
    }
    
    localStorage.setItem(prefixedKey, JSON.stringify(itemToStore));
    return true;
  } catch (error) {
    console.error(`Error setting item "${key}" in localStorage:`, error);
    return false;
  }
};

/**
 * Remove an item from localStorage
 * 
 * @param {string} key The key to remove
 * @param {string} namespace Optional namespace
 * @returns {boolean} Success status
 */
export const removeItem = (key, namespace = '') => {
  try {
    const prefixedKey = buildKey(key, namespace);
    localStorage.removeItem(prefixedKey);
    return true;
  } catch (error) {
    console.error(`Error removing item "${key}" from localStorage:`, error);
    return false;
  }
};

/**
 * Check if a key exists in localStorage
 * 
 * @param {string} key The key to check
 * @param {string} namespace Optional namespace
 * @returns {boolean} True if the key exists and is not expired
 */
export const hasItem = (key, namespace = '') => {
  try {
    const prefixedKey = buildKey(key, namespace);
    const item = localStorage.getItem(prefixedKey);
    
    if (item === null) {
      return false;
    }
    
    const parsedItem = JSON.parse(item);
    
    // Check if the item has expired
    if (parsedItem._expires && new Date(parsedItem._expires) < new Date()) {
      // Remove the expired item
      removeItem(key, namespace);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error checking item "${key}" in localStorage:`, error);
    return false;
  }
};

/**
 * Clear all items with the app prefix
 * 
 * @param {string} namespace Optional namespace to clear
 * @returns {boolean} Success status
 */
export const clearAppStorage = (namespace = '') => {
  try {
    const prefix = namespace 
      ? `${APP_PREFIX}${namespace}_`
      : APP_PREFIX;
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error clearing app storage:', error);
    return false;
  }
};

/**
 * Get all keys that match the app prefix and optional namespace
 * 
 * @param {string} namespace Optional namespace
 * @returns {string[]} Array of matching keys without the prefix
 */
export const getKeys = (namespace = '') => {
  try {
    const prefix = namespace 
      ? `${APP_PREFIX}${namespace}_`
      : APP_PREFIX;
    
    return Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .map(key => key.replace(prefix, ''));
  } catch (error) {
    console.error('Error getting keys from localStorage:', error);
    return [];
  }
};

/**
 * Get the total size of localStorage usage
 * 
 * @returns {number} Size in bytes
 */
export const getStorageSize = () => {
  try {
    let totalSize = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      totalSize += key.length + value.length;
    }
    
    return totalSize;
  } catch (error) {
    console.error('Error calculating localStorage size:', error);
    return 0;
  }
};

/**
 * Build a prefixed key with optional namespace
 * 
 * @param {string} key Base key
 * @param {string} namespace Optional namespace
 * @returns {string} Prefixed key
 */
const buildKey = (key, namespace = '') => {
  return namespace 
    ? `${APP_PREFIX}${namespace}_${key}`
    : `${APP_PREFIX}${key}`;
};

export default {
  getItem,
  setItem,
  removeItem,
  hasItem,
  clearAppStorage,
  getKeys,
  getStorageSize
};
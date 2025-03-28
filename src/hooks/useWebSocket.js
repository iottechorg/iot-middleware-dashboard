// src/hooks/useWebSocket.js

import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Custom hook for WebSocket connections with automatic
 * reconnection, authentication, and message handling
 *
 * @param {string} url WebSocket server URL
 * @param {Object} options Configuration options
 * @returns {Object} WebSocket state and methods
 */
const useWebSocket = (url, options = {}) => {
  const { user } = useContext(AuthContext);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);

  // Default options
  const {
    autoConnect = true,
    reconnectOnClose = true,
    reconnectInterval = 2000,
    maxReconnectAttempts = 10,
    maxMessages = 100,
    onMessage,
    onConnect,
    onDisconnect,
    onError,
    protocols
  } = options;

  // Create and setup WebSocket
  const setupSocket = useCallback(() => {
    if (!url) return;

    // Clear any existing reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    // Close existing socket if any
    if (socketRef.current) {
      socketRef.current.close();
    }

    try {
      // Create new WebSocket
      socketRef.current = new WebSocket(url, protocols);

      // WebSocket event handlers
      socketRef.current.onopen = (event) => {
        setConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;

        // Send authentication message if user is logged in
        if (user && user.token) {
          const authMessage = {
            type: 'auth',
            token: user.token
          };
          socketRef.current.send(JSON.stringify(authMessage));
        }

        // Call onConnect callback if provided
        if (onConnect) {
          onConnect(event);
        }
      };

      socketRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Add message to state
          setMessages(prev => {
            const newMessages = [data, ...prev];
            // Limit the number of stored messages
            return newMessages.slice(0, maxMessages);
          });

          // Call onMessage callback if provided
          if (onMessage) {
            onMessage(data, event);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      socketRef.current.onclose = (event) => {
        setConnected(false);

        // Call onDisconnect callback if provided
        if (onDisconnect) {
          onDisconnect(event);
        }

        // Attempt to reconnect if enabled
        if (reconnectOnClose && !event.wasClean) {
          attemptReconnect();
        }
      };

      socketRef.current.onerror = (event) => {
        setError('WebSocket connection error');

        // Call onError callback if provided
        if (onError) {
          onError(event);
        }
      };
    } catch (err) {
      setError(`WebSocket setup error: ${err.message}`);
      
      // Call onError callback if provided
      if (onError) {
        onError(err);
      }
      
      // Attempt to reconnect on setup error
      if (reconnectOnClose) {
        attemptReconnect();
      }
    }
  }, [url, protocols, user, onConnect, onMessage, onDisconnect, onError, reconnectOnClose, maxMessages]);

  // Attempt to reconnect
  const attemptReconnect = useCallback(() => {
    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      setError(`Maximum reconnect attempts (${maxReconnectAttempts}) reached`);
      return;
    }

    reconnectAttemptsRef.current++;
    const delay = reconnectInterval * Math.pow(1.5, reconnectAttemptsRef.current - 1);
    
    reconnectTimeoutRef.current = setTimeout(() => {
      setupSocket();
    }, delay);
  }, [maxReconnectAttempts, reconnectInterval, setupSocket]);

  // Connect manually
  const connect = useCallback(() => {
    reconnectAttemptsRef.current = 0;
    setupSocket();
  }, [setupSocket]);

  // Disconnect manually
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    
    setConnected(false);
  }, []);

  // Send message
  const sendMessage = useCallback((data) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      setError('WebSocket is not connected');
      return false;
    }

    try {
      const message = typeof data === 'string' ? data : JSON.stringify(data);
      socketRef.current.send(message);
      return true;
    } catch (err) {
      setError(`Error sending message: ${err.message}`);
      return false;
    }
  }, []);

  // Send a ping to keep the connection alive
  const ping = useCallback(() => {
    return sendMessage({ type: 'ping', timestamp: Date.now() });
  }, [sendMessage]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Connect on mount if autoConnect is true
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // Cleanup on unmount
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [autoConnect, connect]);

  // Reconnect when URL changes
  useEffect(() => {
    if (autoConnect && url) {
      connect();
    }
  }, [url, autoConnect, connect]);

  // Reconnect when authentication changes
  useEffect(() => {
    if (connected && user && socketRef.current) {
      // Send new auth message when user changes
      const authMessage = {
        type: 'auth',
        token: user.token
      };
      socketRef.current.send(JSON.stringify(authMessage));
    }
  }, [user, connected]);

  return {
    connected,
    messages,
    error,
    connect,
    disconnect,
    sendMessage,
    ping,
    clearMessages,
    socket: socketRef.current
  };
};

export default useWebSocket;
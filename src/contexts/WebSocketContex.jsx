// src/contexts/WebSocketContext.jsx

import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { AuthContext } from './AuthContext';

// Create the WebSocket context
export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const webSocketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  
  // WebSocket server URL (would come from environment variables in production)
  const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080/ws';
  
  // WebSocket configuration
  const maxReconnectAttempts = 5;
  const reconnectInterval = 3000; // 3 seconds

  // Initialize WebSocket connection
  const initWebSocket = useCallback(() => {
    if (!isAuthenticated) return;
    
    // Close existing connection if any
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }
    
    try {
      const socket = new WebSocket(wsUrl);
      
      socket.onopen = () => {
        setConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
        
        // Send authentication message
        if (user && user.token) {
          socket.send(JSON.stringify({
            type: 'auth',
            token: user.token
          }));
        }
      };
      
      socket.onclose = (event) => {
        setConnected(false);
        
        // Only attempt to reconnect if it wasn't a clean close
        if (!event.wasClean && isAuthenticated) {
          attemptReconnect();
        }
      };
      
      socket.onerror = (event) => {
        setError('WebSocket connection error');
        console.error('WebSocket error:', event);
      };
      
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleMessage(data);
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };
      
      webSocketRef.current = socket;
    } catch (err) {
      setError(`WebSocket initialization error: ${err.message}`);
      console.error('WebSocket initialization error:', err);
      
      // Attempt to reconnect
      if (isAuthenticated) {
        attemptReconnect();
      }
    }
  }, [wsUrl, isAuthenticated, user]);

  // Attempt to reconnect to WebSocket
  const attemptReconnect = useCallback(() => {
    // Clear any existing reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      setError(`Maximum reconnect attempts (${maxReconnectAttempts}) reached`);
      return;
    }
    
    reconnectAttemptsRef.current++;
    
    // Exponential backoff for reconnection
    const delay = reconnectInterval * Math.pow(1.5, reconnectAttemptsRef.current - 1);
    
    reconnectTimeoutRef.current = setTimeout(() => {
      initWebSocket();
    }, delay);
  }, [initWebSocket, maxReconnectAttempts, reconnectInterval]);

  // Handle incoming WebSocket messages
  const handleMessage = useCallback((message) => {
    // Handle different message types
    switch (message.type) {
      case 'auth_response':
        if (message.status === 'success') {
          console.log('WebSocket authentication successful');
        } else {
          setError('WebSocket authentication failed');
          console.error('WebSocket authentication failed:', message.error);
        }
        break;
        
      case 'ping':
        // Response to ping message
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
          webSocketRef.current.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
        }
        break;
        
      case 'notification':
        // Handle notifications (e.g., through a notification system)
        console.log('Received notification:', message.data);
        // You would dispatch this to a notification context/system
        break;
        
      case 'data_update':
        // Handle data updates (e.g., for real-time charts)
        console.log('Received data update:', message.data);
        // You would dispatch this to relevant component/context
        break;
        
      case 'error':
        // Handle server-side errors
        console.error('Server error:', message.error);
        break;
        
      default:
        // Unknown message type
        console.log('Received unknown message type:', message);
    }
  }, []);

  // Send a message through the WebSocket
  const sendMessage = useCallback((message) => {
    if (!webSocketRef.current || webSocketRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return false;
    }
    
    try {
      const messageString = typeof message === 'string' ? message : JSON.stringify(message);
      webSocketRef.current.send(messageString);
      return true;
    } catch (err) {
      console.error('Error sending WebSocket message:', err);
      return false;
    }
  }, []);

  // Connect to WebSocket when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      initWebSocket();
    } else {
      // Close connection when logged out
      if (webSocketRef.current) {
        webSocketRef.current.close();
        webSocketRef.current = null;
      }
      
      // Clear any pending reconnect
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      
      setConnected(false);
    }
    
    // Cleanup on unmount
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [isAuthenticated, initWebSocket]);

  // Keep-alive ping (every 30 seconds)
  useEffect(() => {
    let pingInterval;
    
    if (connected) {
      pingInterval = setInterval(() => {
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
          webSocketRef.current.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
        }
      }, 30000); // 30 seconds
    }
    
    return () => {
      if (pingInterval) {
        clearInterval(pingInterval);
      }
    };
  }, [connected]);

  // Create the context value
  const contextValue = {
    connected,
    error,
    sendMessage,
    socket: webSocketRef.current,
    reconnect: initWebSocket
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
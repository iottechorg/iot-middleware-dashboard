// src/hooks/useNotifications.js

import { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { WebSocketContext } from '../contexts/WebSocketContext';
import localStorage from '../utils/localStorage';

/**
 * Hook for managing application notifications
 * 
 * @param {Object} options Configuration options
 * @returns {Object} Notification methods and state
 */
const useNotifications = (options = {}) => {
  const { user } = useContext(AuthContext);
  const { socket, connected } = useContext(WebSocketContext);
  
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (user) {
      const loadNotifications = () => {
        try {
          const stored = localStorage.getItem(`notifications_${user.id}`, [], 'notifications');
          if (stored && Array.isArray(stored)) {
            setNotifications(stored);
            setUnreadCount(stored.filter(n => !n.read).length);
          }
        } catch (err) {
          console.error('Error loading notifications:', err);
        }
      };

      loadNotifications();
    } else {
      // Clear notifications when user logs out
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (user && notifications.length > 0) {
      localStorage.setItem(`notifications_${user.id}`, notifications, 'notifications');
    }
  }, [notifications, user]);

  // Listen for new notifications from WebSocket
  useEffect(() => {
    if (socket && connected) {
      const handleNewNotification = (message) => {
        if (message && message.type === 'notification') {
          addNotification(message.data);
        }
      };

      socket.on('message', handleNewNotification);

      return () => {
        socket.off('message', handleNewNotification);
      };
    }
  }, [socket, connected]);

  // Add a new notification
  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    // Show browser notification if allowed
    if (options.showBrowserNotifications && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: notification.icon || '/logo192.png'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    }

    return newNotification;
  }, [options.showBrowserNotifications]);

  // Mark a notification as read
  const markAsRead = useCallback((id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );

    // Update unread count
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  }, []);

  // Remove a notification
  const removeNotification = useCallback((id) => {
    setNotifications(prev => {
      const notificationToRemove = prev.find(n => n.id === id);
      const wasUnread = notificationToRemove && !notificationToRemove.read;
      
      // Update unread count if needed
      if (wasUnread) {
        setUnreadCount(prevCount => Math.max(0, prevCount - 1));
      }

      return prev.filter(notification => notification.id !== id);
    });
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
    
    if (user) {
      localStorage.removeItem(`notifications_${user.id}`, 'notifications');
    }
  }, [user]);

  // Request permission for browser notifications
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      } catch (err) {
        console.error('Error requesting notification permission:', err);
        return false;
      }
    }
    return false;
  }, []);

  // Check if browser notifications are supported and permission is granted
  const [browserNotificationsAllowed, setBrowserNotificationsAllowed] = useState(
    'Notification' in window && Notification.permission === 'granted'
  );

  // Update notification permission status when it changes
  useEffect(() => {
    if ('Notification' in window) {
      const checkPermission = () => {
        setBrowserNotificationsAllowed(Notification.permission === 'granted');
      };

      checkPermission();

      // Try to listen for permission changes
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'notifications' })
          .then(permissionStatus => {
            permissionStatus.onchange = checkPermission;
          })
          .catch(err => console.error('Error checking notification permission:', err));
      }
    }
  }, []);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    browserNotificationsAllowed,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    requestNotificationPermission
  };
};

export default useNotifications;
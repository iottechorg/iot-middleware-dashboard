
import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create the auth context
export const AuthContext = createContext();

// Default user state
const defaultUser = {
  id: null,
  username: null,
  email: null,
  role: null,
  token: null,
  permissions: []
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          
          // Verify token is still valid (mock implementation)
          // In a real app, you would validate the token with your backend
          const isTokenValid = true; // Replace with actual token validation
          
          if (isTokenValid) {
            setUser({
              ...parsedUser,
              token: storedToken
            });
            setIsAuthenticated(true);
          } else {
            // Token expired or invalid, clear storage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError('Failed to initialize authentication');
        // Clear potentially corrupted storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual API call
      // const response = await api.post('/auth/login', credentials);
      
      // Mock successful response
      const mockResponse = {
        id: 'user-1',
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        role: 'admin',
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
        permissions: ['read:all', 'write:all', 'admin:dashboard']
      };
      
      // Store user data and token
      localStorage.setItem('user', JSON.stringify(mockResponse));
      localStorage.setItem('token', mockResponse.token);
      
      // Update state
      setUser(mockResponse);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
      return { 
        success: false, 
        error: err.message || 'Authentication failed' 
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    // Clear auth data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Reset state
    setUser(defaultUser);
    setIsAuthenticated(false);
  }, []);

  // Register function (for user registration if needed)
  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual API call
      // const response = await api.post('/auth/register', userData);
      
      // Mock successful response
      const mockResponse = {
        success: true,
        message: 'User registered successfully'
      };
      
      return mockResponse;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register');
      return { 
        success: false, 
        error: err.message || 'Registration failed' 
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (profileData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual API call
      // const response = await api.put('/auth/profile', profileData);
      
      // Mock successful response
      const updatedUser = {
        ...user,
        ...profileData
      };
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      
      return { success: true };
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Failed to update profile');
      return { 
        success: false, 
        error: err.message || 'Profile update failed' 
      };
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Check if user has a specific permission
  const hasPermission = useCallback((permission) => {
    if (!user || !user.permissions) {
      return false;
    }
    
    if (user.role === 'admin') {
      return true; // Admin has all permissions
    }
    
    return user.permissions.includes(permission);
  }, [user]);

  // Context value
  const authContextValue = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    updateProfile,
    hasPermission
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
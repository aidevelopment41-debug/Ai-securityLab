'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = authService.getStoredToken();
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        setError(err.response?.data?.detail || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      await authService.login(credentials);
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Login failed';
      setError(errorMsg);
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const register = async (userData) => {
    try {
      setError(null);
      await authService.register(userData);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Registration failed';
      setError(errorMsg);
      throw err;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        isAuthenticated: !!user,
        login, 
        logout, 
        register, 
        error,
        clearError 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

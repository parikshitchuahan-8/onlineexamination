import React, { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
    isAuthLoading: true,
  });

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setAuth({ token: null, user: null, isAuthLoading: false });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            logout();
        } else {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setAuth({ token, user: { username: decoded.sub }, isAuthLoading: false });
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
        setAuth(prev => ({...prev, isAuthLoading: false}));
    }
  }, [logout]);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuth({ token, user: { username: decoded.sub }, isAuthLoading: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

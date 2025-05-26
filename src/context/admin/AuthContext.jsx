import React, { createContext, useState } from 'react';
import api from '../../Utils/api';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => { 
      const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
      });
      ;
      
 const login = async (identifier, password) => {
    try {
      const response = await api.post('/login', { identifier, password });

      if (response.data && response.data.data.token) {
        setUser(response?.data?.data?.user);
        localStorage.setItem('token', response?.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));

        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem("user");

            
  };
   return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
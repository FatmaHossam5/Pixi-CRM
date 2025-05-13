import React, { createContext, useState } from 'react';
import api from '../../Utlis/api';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => { 
      const [user, setUser] = useState(null);
      
 const login = async (identifier, password) => {
    try {
      const response = await api.post('/login', { identifier, password });
console.log(response);

      if (response.data && response.data.data.token) {
        setUser(response?.data?.data?.user?.name);
        localStorage.setItem('token', response?.data?.data?.token);
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
            
  };
   return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
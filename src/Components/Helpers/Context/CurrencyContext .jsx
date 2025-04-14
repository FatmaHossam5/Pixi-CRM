// CurrencyContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children   }) => {
  const [currencyData, setCurrencyData] = useState([]);
  const [loading, setLoading] = useState(false);
    const { baseUrlMis, Headers } = useContext(AuthContext);

  const fetchCurrencyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrlMis}/currency/all/`, { Headers });
      // Adjust based on actual API response structure
      const data = response.data.map(item => item.currency);
      setCurrencyData(data);
    } catch (error) {
      console.error("Error fetching currency data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currencyData, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;

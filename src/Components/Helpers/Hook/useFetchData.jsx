

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";


export default function useFetchData(endpoint) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { baseUrlPms = "", Headers = {} } = useContext(AuthContext) || {};
  const { setIsLoading,isLoading } = useContext(AuthContext)
  // Fetch data function
  const fetchData = async () => {
    if (!endpoint) {
      setError("Endpoint is required");
      return;
    }
    // setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrlPms}/${endpoint}`, { headers: Headers });
      const fetchedData = Array.isArray(response.data) ? response.data : response.data.data || [];
      setData([...fetchedData]);
    
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch data";
      setError(errorMessage);
      console.error("Fetch Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
console.log(data);

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  // Return data, loading state, error, fetchData, and setData for local updates
  return { data, fetchData, setData, isLoading, error };
}

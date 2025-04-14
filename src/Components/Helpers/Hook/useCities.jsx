import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const useCities = () => {
  const [cities, setCities] = useState([]);
  const [selectedGovernate, setSelectedGovernate] = useState(null);
  const { baseUrlMis, Headers } = useContext(AuthContext);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (selectedGovernate) {
          const response = await axios.get(
            `${baseUrlMis}/city/all/?governorate_id=${selectedGovernate}`,
            {
              headers: Headers,
             
            }
          );
          setCities(response.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [baseUrlMis, Headers, selectedGovernate]);

  const handleGovernateChange = (event) => {
    console.log(event);
  
    setSelectedGovernate(event[0].value);
  };
  return { cities, handleGovernateChange };
};

export default useCities;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const useGovernoraties = () => {
  const [governates, setGovernates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { baseUrlMis, Headers } = useContext(AuthContext);

  useEffect(() => {
    const fetchGovernates = async () => {
      try {
        if (selectedCountry) {
          console.log(selectedCountry);
          const response = await axios.get(
            `${baseUrlMis}/governorate/all/?country_id=${selectedCountry}`,
            {
              headers:Headers,
              
            }
          );
          setGovernates(response.data);
        }
      } catch (error) {
        console.error("Error fetching governorates:", error);
      }
    };

    fetchGovernates();
  }, [baseUrlMis, Headers, selectedCountry]);


  const handleCountryChange = (event) => {
    console.log(event[0].value);
    setSelectedCountry(event[0].value);
  };
  return { governates, handleCountryChange };
};

export default useGovernoraties;

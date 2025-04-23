import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';

export default function useLocationData() {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const{base_url}=useContext(AuthContext)
    useEffect(() => {
        axios.get(`${base_url}/locations/countries`, { params: { per_page: 100, page: 1 } })
          .then(res => setCountries(res.data?.data?.data || []))
          .catch(console.error);
      }, []);
      useEffect(() => {
        if (!selectedCountry) return;
        axios.get(`${base_url}/locations/countries/${selectedCountry}/cities`, { params: { per_page: 100, page: 1 } })
          .then(res => setCities(res.data?.data?.data || []))
          .catch(console.error);
      }, [selectedCountry]);
      useEffect(() => {
        if (!selectedCity) return;
        axios.get(`${base_url}/locations/cities/${selectedCity}/areas`, { params: { per_page: 100, page: 1 } })
          .then(res => setAreas(res.data?.data?.data || []))
          .catch(console.error);
      }, [selectedCity]);
      return {
        countries,
        cities,
        areas,
        selectedCountry,
        selectedCity,
        selectedArea,
        setSelectedCountry,
        setSelectedCity,
        setSelectedArea
      };
}

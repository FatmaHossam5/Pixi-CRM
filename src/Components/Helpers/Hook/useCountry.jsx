import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from './../Context/AuthContext';


function useCountry() {

    const { baseUrlMis, Headers } = useContext(AuthContext);
    const [countries, setCountries] = useState([])

    const getAllCountries = () => {
        axios.get(`${baseUrlMis}/country/all/`,
            {
                headers:Headers
                
            }
        )
            .then(res => {
                // setCountries(res.data)
                setCountries(res.data); 

            }
            )
            // .catch(error =>)
    }
    
    useEffect(() => {
        getAllCountries()
    }, [])

  return ( {countries} )
}

export default useCountry
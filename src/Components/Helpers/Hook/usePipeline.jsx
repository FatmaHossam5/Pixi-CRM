import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { use } from 'react';
import axios from 'axios';

export default function usePipeline() {
    const[pipeline,setPipeline]=React.useState([])
    const{base_url,Headers}=useContext(AuthContext);
    useEffect(() => {  
        const fetchPipeline = async () => {
            try {
                const response = await axios.get(`${base_url}/pipelines`,{ headers: Headers });
                console.log(response);
                setPipeline(response.data.data.data);
            } catch (error) {
                console.error('Error fetching pipeline:', error);
            }
         }
        fetchPipeline()
    ;       
        },[])
  return { pipeline };
}

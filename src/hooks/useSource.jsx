import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/admin/AuthContext';

export default function useSource() {
    const [source, setSource] = React.useState([]);
    const{base_url,Headers}=useContext(AuthContext)

    useEffect(() => {
        const fetchSource = async () => {
            try {
                const response = await axios.get(`${base_url}/sources`,{ headers: Headers });
                console.log(response);
                
                setSource(response.data.data.data);
            } catch (error) {
                console.error('Error fetching source:', error);
            }
        };

        fetchSource();
    }, []);
  return { source };
}

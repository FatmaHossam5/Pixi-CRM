import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function useRole() {
    const [role, setRole] = React.useState([]);
    const { base_url, Headers } = useContext(AuthContext);
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`${base_url}/roles`, { headers: Headers });
                console.log(response);
                setRole(response.data);
            } catch (error) {
                console.error('Error fetching contact:', error);
            }
        };

        fetchRoles();
    }, []);
    return { role };

}

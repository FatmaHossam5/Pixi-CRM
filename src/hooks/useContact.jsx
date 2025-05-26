import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function useContact() {
    const [contact, setContact] = React.useState([]);
    const { base_url, Headers } = useContext(AuthContext);
    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`${base_url}/clients`, { headers: Headers });
                console.log(response);
                setContact(response.data.data.data);
            } catch (error) {
                console.error('Error fetching contact:', error);
            }
        };

        fetchContact();
    }, []);
    return { contact };

}

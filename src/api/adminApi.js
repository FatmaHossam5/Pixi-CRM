import axios from "axios";

const ADMIN_API_BASE_URL = 'https://tenant1.billiqa.com/api/';
export const loginAdmin = async (credentials) => {
    const response = axios.post(`${ADMIN_API_BASE_URL}login`, credentials);
    console.log(response);
    
return response;
}

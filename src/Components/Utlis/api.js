import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tenant1.billiqa.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;


import axios from 'axios';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },

  timeout: 10000,
});

export default api;

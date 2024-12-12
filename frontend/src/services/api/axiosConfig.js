import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response && 
        (error.response.data.message === 'Token has expired' || 
         error.response.data.message === 'Invalid token')) {
      
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      
      alert('Your session has expired. Please log in again.');
      
      window.location.reload();
    }
    
    return Promise.reject(error);
  }
);

export default API;
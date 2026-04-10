import axios from 'axios';

// Create an Axios instance configured for the UMA backend
export const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // adjust backend URL as needed
   headers: {
      'Content-Type': 'application/json',
   },
});

// Add a request interceptor to automatically attach the JWT token
api.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token');
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// Add a response interceptor to handle global errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         // Clear invalid token
         localStorage.removeItem('token');
         // Redirect to login if not already there
         if (window.location.pathname !== '/auth/login' && window.location.pathname !== '/') {
            window.location.href = '/auth/login';
         }
      }
      return Promise.reject(error);
   }
);

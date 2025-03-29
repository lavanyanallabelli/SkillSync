import axios from 'axios';

// Create an axios instance with custom config
const API_BASE_URL = 'http://localhost:3001/api';     //process.env.REACT_APP_API_BASE_URL || 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    
    // Format error message
    const errorMessage = 
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message || 'An unknown error occurred';
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
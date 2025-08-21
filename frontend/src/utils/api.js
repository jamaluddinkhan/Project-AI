import axios from 'axios'; // You would need to install axios

// Create a configured axios instance

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend server's address
  timeout: 10000,
});

// Add a request interceptor to include auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

export const videoAPI = {
  getAll: () => api.get('/videos'),
  getById: (id) => api.get(`/videos/${id}`),
  upload: (formData) => api.post('/videos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default api;
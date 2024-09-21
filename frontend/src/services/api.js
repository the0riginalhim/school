import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = (email, password) => api.post('/login', { email, password });
export const register = (userData) => api.post('/register', userData);
export const createPost = (content) => api.post('/posts', { content });
export const searchUsers = (query) => api.get(`/search?query=${query}`);
export const addConnection = (connectionId) => api.post('/connections', { connectionId });

export default api;
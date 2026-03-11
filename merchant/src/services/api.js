import axios from 'axios';
import { API_BASE_URL } from '../utils/config';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
};

export const storesService = {
  getAll: () => api.get('/stores'),
  getById: (id) => api.get(`/stores/${id}`),
};

export const productsService = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
};

export const ordersService = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  update: (id, orderData) => api.put(`/orders/${id}`, orderData),
};

export default api;

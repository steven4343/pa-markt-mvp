import axios from 'axios';
import { API_BASE_URL } from '../utils/config';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = (email, password) => 
  api.post('/auth/login', { email, password });

export const getProviderBookings = (providerId) => 
  api.get(`/bookings?providerId=${providerId}`);

export const getBookingById = (bookingId) => 
  api.get(`/bookings/${bookingId}`);

export const updateBooking = (bookingId, data) => 
  api.put(`/bookings/${bookingId}`, data);

export const getProviderProfile = (providerId) => 
  api.get(`/providers/${providerId}`);

export const getServices = (providerId) => 
  api.get(`/services?providerId=${providerId}`);

export default api;

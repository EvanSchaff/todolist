import API from './axiosConfig';
import { handleError } from './errorHandler';

export async function loginUser(username, password) {
  try {
    const response = await API.post('/login', { username, password });
    return response.data;
  } catch (err) {
    handleError(err, 'An error occurred during login');
  }
}

export async function registerUser(username, password) {
  try {
    const response = await API.post('/register', { username, password });
    return response.data;
  } catch (err) {
    handleError(err, 'An error occurred during registration');
  }
}

export async function logoutUser() {
  try {
    const response = await API.post('/logout');
    return response.data;
  } catch (err) {
    handleError(err, 'An error occurred during logout');
  }
}
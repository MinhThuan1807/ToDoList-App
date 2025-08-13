import axios from 'axios';

const API_URL = 'http://localhost:8017/v1/users/';
interface LoginResponse {
  token: string,
  user: {
    id: string,
    email: string
  }
}
export const register = (data: { email: string, password: string }) => {
  return axios.post(`${API_URL}register`, data)
};

export const login = (data: { email: string, password: string }) => {
  return axios.post<LoginResponse>(`${API_URL}login`, data)
}
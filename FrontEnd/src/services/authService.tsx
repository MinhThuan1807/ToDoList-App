import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = 'http://localhost:8017'
interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
  }
}
export const register = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/v1/users/register`, data)
  toast.success(
    'Account created successfully! Please check and verify your email before logging in!',
    { theme: 'colored' }
  )
  return response.data
}

export const login = (data: { email: string; password: string }) => {
  return axios.post<LoginResponse>(`${API_URL}login`, data)
}

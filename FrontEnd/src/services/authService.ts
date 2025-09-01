import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../utils/constants'
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
    { theme: 'light' }
  )
  return response.data
}

export const login = async (data: { email: string; password: string }) => {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/v1/users/login`,
    data
  )
  toast.success('Login successful!', { theme: 'light' })
  return response.data
}

export const logout = async () => {
  await axios.delete(`${API_URL}/v1/users/logout`)
  toast.success('Logout successful!', { theme: 'light' })
}

export const verifyEmail = async (data: { email: string; token: string }) => {
  const response = await axios.put(`${API_URL}/v1/users/verify`, data)
  toast.success(
    'Your verified successfully! Now you can login to enjoy our services! Have a good day!',
    { theme: 'light' }
  )
  return response.data
}

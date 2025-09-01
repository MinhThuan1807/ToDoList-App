import axios from 'axios'
import { logoutUserApi } from '../redux/user/userSlice'
import { toast } from 'react-toastify'

//Inject store to import redux store in non-component
let axiosReduxStore: any

export const injectStore = (mainStore: any) => {
  axiosReduxStore = mainStore
}

// Create an instance of axios to configure authorization headers
let authorizeAxiosInstance = axios.create()

// Time to wait for a response before timing out
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

// withCredentials allows sending cookies and authorization headers for any requests
authorizeAxiosInstance.defaults.withCredentials = true

// Interceptor response
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.data?.statusCode === 401) {
      toast.error('Session expired. Please log in again.', {
        theme: 'light'
      })
      axiosReduxStore.dispatch(logoutUserApi())
    }
    // Handle 429 Too Many Requests
    if (error.response?.status === 429) {
      // Optionally, you can implement a retry mechanism or show a user-friendly message
      toast.error('Too many requests. Please try again later.', {
        theme: 'light'
      })
    }
    if (error.response?.status !== 401 && error.response?.status !== 429) {
      // Handle other errors
      let errorMessage = error?.message
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      }

      if (errorMessage) {
        toast.error(errorMessage, {
          theme: 'light'
        })
      }
    }
    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance

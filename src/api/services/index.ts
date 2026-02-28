import { cookiesKeys } from '@/lib/cookies.keys'
import axios, { AxiosError, type AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
})


// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(cookiesKeys.accessToken)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
       window.localStorage.removeItem(cookiesKeys.accessToken);

      window.location.href = '/en'
    }
    return Promise.reject(error)
  }
)

export default api
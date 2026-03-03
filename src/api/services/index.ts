import { cookiesKeys } from '@/lib/cookies.keys'
import axios, { AxiosError, type AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
})


// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(cookiesKeys.accessToken)

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
      //  Cookies.remove(cookiesKeys.accessToken)
      //  window.location.href = '/en'

         // Token expired or invalid, clear auth-related data and redirect to language-specific root
      Cookies.remove(cookiesKeys.accessToken)

      window.localStorage.removeItem(cookiesKeys.userDetails)

      const path = window.location.pathname || '/'

      const segments = path.split('/').filter(Boolean)
      const currentLang = segments[0] || 'en'

      const redirectPath = `/${currentLang}`

      if (window.history && typeof window.history.pushState === 'function') {
        window.history.pushState({}, '', redirectPath)
        window.dispatchEvent(new PopStateEvent('popstate', { state: {} }))
      } else {
        window.location.href = redirectPath
      }
    }
    return Promise.reject(error)
  }
)

export default api
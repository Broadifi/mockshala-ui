import axios, { type AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: {
    
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGU0ZmU0ODFmYjA5MzhhZGM0ODE5Y2YiLCJuYW1lIjoiQXJpaml0IEtoYW4iLCJpYXQiOjE3NzE4MjA4NTcsImV4cCI6MTc3MzExNjg1N30.uf_GkgI90WmFBiGmN7MZ_8HZr0qfsLeGiHsaJ5J9BWk"

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default api
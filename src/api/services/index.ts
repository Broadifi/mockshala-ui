import axios, { type AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: {
    
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTk4MGMxYjJhMGU4ZTg3YWFhMzBlNWIiLCJlbWFpbCI6Imdob3Noc3VtYW4xNDM1QGdtYWlsLmNvbSIsIm5hbWUiOiJERUJBU0lTSCBHSE9TSCIsImlhdCI6MTc3MTU3MjI1MSwiZXhwIjoxNzcyODY4MjUxfQ.jbnPeFXthszzDkl_A0UdForbwPWWlmiVvjVq01H-a08"
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
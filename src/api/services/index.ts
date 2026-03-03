import axios, { type AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: {
    
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('authToken');
    
    console.log("Interceptor checking token:", token);

    if (token) {
     
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api
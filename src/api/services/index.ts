import { cookiesKeys } from "@/lib/cookies.keys";
import { useAuthStore } from "@/stores/authStore";
import axios, { AxiosError, type AxiosInstance } from "axios";
import Cookies from "js-cookie";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(cookiesKeys.accessToken);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ✅ Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 👇 Clear everything via Zustand (cookie + persisted user)
      useAuthStore.getState().auth.logout();

      // 👇 Language-aware redirect
      const path = window.location.pathname || "/";
      const segments = path.split("/").filter(Boolean);
      const currentLang = segments[0] || "en";
      const redirectPath = `/${currentLang}`;

      if (window.history && typeof window.history.pushState === "function") {
        window.history.pushState({}, "", redirectPath);
        window.dispatchEvent(new PopStateEvent("popstate"));
      } else {
        window.location.href = redirectPath;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
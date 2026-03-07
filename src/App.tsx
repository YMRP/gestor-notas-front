import { BrowserRouter, Routes } from "react-router-dom";
import AppRoutes from "./router";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useEffect } from "react";

function App() {

  useEffect(() => {

    // 🔹 Permitir envío de cookies (refresh token)
    axios.defaults.withCredentials = true;

    // 🔹 Interceptor para enviar el access token automáticamente
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    // 🔹 Variables para controlar refresh concurrente
    let isRefreshing = false;
    let failedQueue: any[] = [];

    const processQueue = (error: any, token: string | null = null) => {
      failedQueue.forEach((prom) => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      });
      failedQueue = [];
    };

    // 🔹 Interceptor para manejar expiración y refresh automático
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest.url.includes("/api/auth/login") &&
          !originalRequest._retry
        ) {

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const response = await axios.post(
              "http://localhost:8080/api/auth/refresh",
              {},
              { withCredentials: true }
            );

            const newToken = response.data.token;

            localStorage.setItem("token", newToken);

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;

            processQueue(null, newToken);

            return axios(originalRequest);

          } catch (err) {
            processQueue(err, null);

            localStorage.removeItem("token");
            toast.error("Tu sesión ha expirado");
            window.location.href = "/";

            return Promise.reject(err);

          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );

    // 🔹 Limpiar interceptores al desmontar
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

  }, []);

  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>{AppRoutes}</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
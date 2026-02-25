import { BrowserRouter, Routes } from "react-router-dom";
import AppRoutes from "./router";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useEffect } from "react";

function App() {
  //interceptor para enviar el token automaticamente sin necesidad de hacerlo manual
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    //interceptor para la expiracion del token
     // 🔹 Interceptor para manejar 401 (pero ignorando login)
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {

        const originalRequest = error.config;

        // 🚨 Ignorar el endpoint de login
        if (
          error.response?.status === 401 &&
          !originalRequest.url.includes("/api/auth/login")
        ) {
          localStorage.removeItem("token");
          toast.error("Tu sesión ha expirado");
          window.location.href = "/";
        }

        return Promise.reject(error);
      }
    );
    //COLOQUE INCERPETORES DE TOKEN PARA CONTROLAR EL ENVIO YEXPICARIOPN DE TOKEN AUTOMATICO, PERO NO HE PROTEGIDO NINGUNA RUTA
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

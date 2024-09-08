import { create } from "zustand";
import axios from "axios";

// URL base de la API
const API_URL = "http://localhost:5000/auth"; 

// Crear una instancia de Axios que incluya las cookies en todas las solicitudes
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // Permitir el envío de cookies con cada solicitud
});

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // Función para registrar un nuevo usuario
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/signup", { email, password, name });
      set({
        user: response.data.user,
        isAuthenticated: true,  // Marcar como autenticado después del registro exitoso
        error: null,
        isLoading: false,
      });
      console.log("Usuario registrado:", response.data.user);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  // Función de login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/login", { email, password });
      set({
        user: response.data.data.user,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      });
      console.log("Usuario logueado:", response.data.data.user);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  // Función para verificar si el usuario ya está autenticado
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/me");
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },

  // Función para cerrar sesión
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post("/logout");
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Error logging out",
        isLoading: false,
      });
      throw error;
    }
  },
}));
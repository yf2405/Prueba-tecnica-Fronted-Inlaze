import { create } from "zustand";
import axios from "axios";

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_LOCAL_URL;

// Crear una instancia de Axios que incluya las cookies en todas las solicitudes
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Permitir el envío de cookies con cada solicitud
});

interface AuthState {
  user: any; // Define un tipo más específico si es posible
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;
  logout: () => Promise<void>;

  // Función para registrar un nuevo usuario
  signup: (email: string, password: string, name: string) => Promise<void>;

  // Función de login
  login: (email: string, password: string) => Promise<void>;

  // Función para verificar si el usuario ya está autenticado
  checkAuth: () => Promise<void>;
   // Nueva función para verificar el correo electrónico
   verifyEmail: (code: string) => Promise<void>; // <-- Añadida

}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/logout");
      set({
        user: null, // Limpiar el usuario después del logout
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      console.log("Usuario deslogueado:", response.data.message);
    } catch (error) {
      throw error;
    }
  },

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/signup", {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true, // Marcar como autenticado después del registro exitoso
        error: null,
        isLoading: false,
      });
      console.log("Usuario registrado:", response.data.user);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({
          error: error.response.data.message || "Error signing up",
          isLoading: false,
        });
      } else {
        set({
          error: "An unexpected error occurred",
          isLoading: false,
        });
      }
      throw error;
    }
  },

  // Función de login
  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post("/login", { email, password });

      set({
        user: response.data.user, // Asegúrate de que user esté en data
        error: null,
        isLoading: false,
      });

      // Log correcto de la respuesta
      console.log("Usuario logueado:", response.data.user);
    } catch (error) {
      // Verificar si es un error de Axios y si hay una respuesta del servidor
      if (axios.isAxiosError(error) && error.response) {
        set({
          error: error.response.data.message || "Error logging in",
          isLoading: false,
        });
      } else {
        set({
          error: "An unexpected error occurred",
          isLoading: false,
        });
      }

      throw error; // Lanza el error para manejo posterior, si es necesario
    }
  },
  verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify-email`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error: any) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},
  // Función para verificar si el usuario ya está autenticado
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/checkAuth");
      set({
        user: response.data.data.user,
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
}));

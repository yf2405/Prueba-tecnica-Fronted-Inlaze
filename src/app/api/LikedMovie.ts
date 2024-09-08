import { create } from "zustand";
import axios from "axios";

// Configuración del cliente de Axios para las películas
const MOVIE_API_URL = "http://localhost:5000/users";  // Actualiza según tu URL
const axiosInstanceMovies = axios.create({
  baseURL: MOVIE_API_URL,
  withCredentials: true,  // Permitir el envío de cookies
});

export const useMovieStore = create((set) => ({
  likedMovies: [],  // Películas que ha dado "like" el usuario
  error: null,
  isLoading: false,

  // Función para alternar "like" y "dislike" de una película
  toggleLikeMovie: async (userId, movieId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstanceMovies.post(`/like-movie`, { userId, movieId });
      set({
        likedMovies: response.data.likedMovies,  // Actualiza el estado de las películas que le gustan al usuario
        error: null,
        isLoading: false,
      });
      console.log("Películas que le gustan al usuario:", response.data.likedMovies);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al dar like/dislike a la película",
        isLoading: false,
      });
      throw error;
    }
  },
}));
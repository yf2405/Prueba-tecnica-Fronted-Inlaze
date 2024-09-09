import { create } from "zustand";
import axios from "axios";

const MOVIE_API_URL = process.env.NEXT_PUBLIC_API_LOCAL_URL_USER; // Actualiza según tu URL
const axiosInstanceMovies = axios.create({
  baseURL: MOVIE_API_URL,
  withCredentials: true,
});

interface MovieStoreState {
  likedMovies: number[];
  error: string | null;
  isLoading: boolean;
  toggleLikeMovie: (userId: number, movieId: number) => void;
}

export const useMovieStore = create<MovieStoreState>((set) => ({
  likedMovies: [], // Películas que ha dado "like" el usuario
  error: null,
  isLoading: false,

  // Función para alternar "like" y "dislike" de una película
  toggleLikeMovie: async (userId: number, movieId: number): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstanceMovies.post(`/like-movie`, {
        userId,
        movieId,
      });
      set({
        likedMovies: response.data.likedMovies, // Actualiza el estado de las películas que le gustan al usuario
        error: null,
        isLoading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          error:
            error.response?.data?.message ||
            "Error al dar like/dislike a la película",
          isLoading: false,
        });
      } else {
        set({
          error: "Error inesperado",
          isLoading: false,
        });
      }
      throw error; // Opcional: relanzar el error si necesitas manejarlo más arriba
    }
  },
}));

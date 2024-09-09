import axios from "axios";

// URL base y API key
const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

interface Movie {
  id: number;
  title: string;
  // Otros campos relevantes
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  // Otros detalles de la película
}

interface Genre {
  id: number;
  name: string;
}
// Obtener películas populares
export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/movie/popular`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results as Movie[];
  } catch (error) {
    throw error;
  }
};

// Obtener película por ID
export const getMovieById = async (id: number): Promise<MovieDetails> => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        api_key: API_KEY,
      },
    });
    return response.data as MovieDetails;
  } catch (error) {
    throw error;
  }
};

// Obtener géneros de películas
export const getMovieCategories = async (): Promise<Genre[]> => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/genre/movie/list`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres as Genre[];
  } catch (error) {
    throw error;
  }
};

// Obtener películas por categoría
export const getMoviesByCategory = async (categoryName: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/discover/movie`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        api_key: API_KEY,
        with_genres: categoryName,
      },
    });
    return response.data.results as Movie[];
  } catch (error) {
    throw error;
  }
};

// Obtener detalles de la película
export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data as MovieDetails;
  } catch (error) {
    throw error;
  }
};

// Obtener películas relacionadas
export const getRelatedMovies = async (id: number): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/movie/${id}/similar`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results as Movie[];
  } catch (error) {
    throw error;
  }
};
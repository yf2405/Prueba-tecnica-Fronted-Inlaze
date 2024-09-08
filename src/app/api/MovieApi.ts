import axios from 'axios';

// URL base y API key
const TMDB_API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '8a3713dd5f4aaf48a1e9247f0b598d8b';

// Token JWT
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTM3MTNkZDVmNGFhZjQ4YTFlOTI0N2YwYjU5OGQ4YiIsIm5iZiI6MTcyNTcyNTgwMC42NDg4MzEsInN1YiI6IjYyOWI3MzlkZGMxY2I0MGU0OTQwNWY2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2gPVrjjxnonG7SW10J0JHQ8RFVP6aYTEqR6UG3NCx9A';

// Obtener las películas populares con el token
export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/movie/popular`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,  // Incluye el token JWT en los headers
      },
      params: {
        api_key: API_KEY,  // También puedes incluir la API key si es necesaria
      },
    });
    return response.data.results;  // Retorna la lista de películas
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;  // Lanza el error para manejarlo en el componente
  }
};

// Obtener detalles de una película por ID
export const getMovieById = async (id: string) => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;  // Retorna los datos de la película
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};

// Obtener categorías de películas (géneros)
export const getMovieCategories = async () => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/genre/movie/list`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;  // Retorna la lista de géneros
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    throw error;
  }
};

export const getMoviesByCategory = async (categoryName: string) => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: categoryName,  // Filtro por género o categoría
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies by category:', error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error; 
  }
};
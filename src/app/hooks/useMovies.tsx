"use client";
import { useState, useEffect } from "react";
import { getPopularMovies } from "../api/MovieApi";

interface Movie {
  id: number;
  title: string;
}
export const useMovies = () => {
  const [movies, setMovies] =  useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
        console.log(data);
      } catch (error) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

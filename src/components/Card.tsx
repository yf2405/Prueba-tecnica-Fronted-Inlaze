"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getMoviesByCategory, getPopularMovies } from "@/app/api/MovieApi";
import { useMovieStore } from "@/app/api/LikedMovie";
import { HeartIcon, StarIcon } from "./IconsFuctions";
import { useAuthStore } from "@/app/api/UsersApi";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}
export default function Card({ selectedCategory }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { likedMovies, toggleLikeMovie, isLoading } = useMovieStore(); // Acceso al estado global de likes
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let data;
        if (selectedCategory) {
          data = await getMoviesByCategory(selectedCategory); // Llamada a la API con la categoría seleccionada
        } else {
          data = await getPopularMovies(); // Películas populares por defecto
        }
        setMovies(data);
      } catch (error) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="grid grid-cols-4 gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {movies.map((movie) => {
        const isLiked = likedMovies.includes(movie.id); // Verifica si esta película ya está en la lista de "likes"

        return (
          <div
            key={movie.id}
            className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
          >
            <Link
              href={`/movie/${movie.id}`}
              className="absolute inset-0 z-10"
              prefetch={false}
            >
              <span className="sr-only">View</span>
            </Link>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className="object-cover w-full h-[450px]"
              style={{ aspectRatio: "300/450", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <Link
              href={`/movie/${movie.id}`}
              className="absolute inset-0 z-10"
              prefetch={false}
            >
              <span className="sr-only">View</span>
            </Link>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-lg font-semibold text-white">
                {movie.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-white">
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 fill-yellow-400" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <button
                onClick={() => toggleLikeMovie(movie.id, user?.id)}
                className={`absolute top-4 right-4 text-white hover:bg-white/20 rounded-full ${isLiked ? "text-red-500" : ""}`}
                aria-label="Like"
                disabled={isLoading}
              >
                <HeartIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

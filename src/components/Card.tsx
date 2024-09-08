"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getMoviesByCategory, getPopularMovies } from '@/app/api/MovieApi';
import { useMovieStore } from '@/app/api/LikedMovie';



export default function Card({ selectedCategory }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { likedMovies, toggleLikeMovie, isLoading } = useMovieStore();  // Acceso al estado global de likes
  
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
        setError('Failed to fetch movies');
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
        const isLiked = likedMovies.includes(movie.id);  // Verifica si esta película ya está en la lista de "likes"
        
        return (
          <div key={movie.id} className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
            <Link href={`/movie/${movie.id}`} className="absolute inset-0 z-10" prefetch={false}>
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
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
              <div className="flex items-center justify-between text-sm text-white">
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 fill-yellow-400" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <button
                onClick={() => toggleLikeMovie(movie.id)}  
                className={`absolute top-4 right-4 text-white hover:bg-white/20 rounded-full ${isLiked ? 'text-red-500' : ''}`}
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

function HeartIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}


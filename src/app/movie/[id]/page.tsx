"use client";
import { useEffect, useState } from "react";
import { getMovieDetails, getRelatedMovies } from "@/app/api/MovieApi";
import Link from "next/link";
import { HeartIcon } from "@/components/IconsFuctions";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import type { MovieDetails } from '@/app/types';


export default function MovieDetails() {
  const [movie, setMovie] = useState<MovieDetails | null>(null); // Usas la interfaz importada
  const [relatedMovies, setRelatedMovies] = useState<MovieDetails[]>([]); // Usas la interfaz importada
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const url = window.location.pathname;
    const id = url.split("/").pop();

    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        // También obtener películas relacionadas
        const related = await getRelatedMovies(id);
        setRelatedMovies(related);
      } catch (error) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      {/* Renderizar la película */}
      <header className="relative w-full h-[400px] overflow-hidden rounded-b-xl">
        <div className="relative w-full h-full">
          {/* Imagen de fondo */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          {/* Contenido sobre la imagen */}
          <div className="relative z-10 flex flex-col items-start justify-between h-full px-6 py-8 md:px-12 md:py-12">
            {/* Géneros en la imagen de portada */}
            <div className="flex space-x-2 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-black/60 text-white py-1 px-2 rounded-lg"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            {/* Título y puntuación */}
            <div className="flex flex-col items-start justify-end w-full h-full">
              <div className="flex items-center justify-between w-full">
                <div>
                  <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">
                    {movie.title}
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <HeartIcon />
                  <div className="relative w-16 h-16 md:w-20 md:h-20">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-100 text-sm font-medium md:text-base">
                      <CircularProgressbar
                        value={Math.round(movie.vote_average * 10)}
                        text={`${Math.round(movie.vote_average * 10)}%`}
                        styles={{
                          path: {
                            stroke: "#00ff2f"
                          },
                          text: {
                            fill: "#00ff2f",
                            fontSize: "16px"
                          },
                          trail: {
                            stroke: "#d6d6d6"
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sección de películas relacionadas */}
      <section className="px-6 py-8 md:px-12 md:py-12">
        <h2 className="text-2xl font-semibold text-gray-800">
          Películas relacionadas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {relatedMovies.map((relatedMovie) => (
            <div
              key={relatedMovie.id}
              className="relative overflow-hidden rounded-lg shadow-lg group"
            >
              <Link
                href={`/movie/${relatedMovie.id}`}
                className="absolute inset-0 z-10"
                prefetch={false}
              >
                <span className="sr-only">View</span>
              </Link>
              <img
                src={`https://image.tmdb.org/t/p/w500/${relatedMovie.poster_path}`}
                alt={relatedMovie.title}
                className="object-cover w-full h-[300px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-lg font-semibold text-white">
                  {relatedMovie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

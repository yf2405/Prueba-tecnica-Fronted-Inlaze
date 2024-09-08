'use client'
import { useEffect, useState } from 'react';
import { getMovieDetails } from '@/app/api/MovieApi';

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = window.location.pathname;
    const id = url.split('/').pop();

    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);  // Ya que 'data' contiene todos los detalles de la película
      } catch (error) {
        setError('Failed to fetch movie details');
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
        {/* Solo imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
            backgroundSize: 'cover', // Asegura que la imagen cubra todo el espacio
            backgroundPosition: 'center',
          }}
        />
                {/* Contenido sobre la imagen */}
                <div className="relative z-10 flex flex-col items-start justify-between h-full px-6 py-8 md:px-12 md:py-12">
                  <div className="flex flex-col items-start justify-end w-full h-full">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">
                          {movie.title}
                        </h1>
                        <p className="mt-2 text-lg text-slate-100 md:text-xl">
                          {movie.overview.length > 150
                            ? movie.overview.substring(0, 150) + '...'
                            : movie.overview}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 md:w-20 md:h-20">
                          <div className="absolute inset-0 flex items-center justify-center text-slate-100 text-sm font-medium md:text-base">
                            {Math.round(movie.vote_average * 10)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      </header>

      {/* Detalles adicionales */}
      <section className="px-6 py-8 md:px-12 md:py-12">
        <h2 className="text-2xl font-semibold text-gray-800">Detalles</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li><strong>Fecha de lanzamiento:</strong> {new Date(movie.release_date).toLocaleDateString()}</li>
          <li><strong>Géneros:</strong> {movie.genres.map((genre) => genre.name).join(', ')}</li>
          <li><strong>Duración:</strong> {movie.runtime} minutos</li>
        </ul>
      </section>
    </div>
  );
}
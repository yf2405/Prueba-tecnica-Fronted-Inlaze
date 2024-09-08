import { getPopularMovies } from '@/app/api/MovieApi';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function Header() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setPopularMovies(data);
      } catch (error) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <header className="relative w-full h-[400px] overflow-hidden rounded-b-xl">
      <Swiper
    spaceBetween={10}
    slidesPerView={1}
    autoplay={{ delay: 5000 }}
    loop={true}
    pagination={{ clickable: true }}
    navigation={true}
    className="h-full" // Asegura que el Swiper ocupe toda la altura
  
>
  {popularMovies.map((movie) => (
    <SwiperSlide key={movie.id}>
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
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
      </header>
    </div>
  );
}
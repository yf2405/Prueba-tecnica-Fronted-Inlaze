
export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    backdrop_path: string;
    // Otros campos relevantes
  }
  
  export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    backdrop_path: string;
    genres: Genre[];  
  }
  
  
  export interface Genre {
    id: number;
    name: string;
  }
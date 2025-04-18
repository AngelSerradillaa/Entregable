const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

import { Movie } from '../types/types'; // Ajusta la ruta

export const fetchPopularMovies = async (page: number): Promise<Movie[]> => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
  );
  const data = await res.json();
  return data.results; // Asegúrate de que esto sea un array de películas
};

export const searchMovies = async (query: string, page = 1): Promise<Movie[]> => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  const data = await res.json();
  return data.results;
};

export const fetchMovieDetail = async (id: string): Promise<Movie | null> => {
    try {
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`, {
        next: { revalidate: 60 }, // para que se regenere cada 60 segundos
      });
  
      if (!res.ok) {
        throw new Error(`Error al obtener detalles de la película: ${res.statusText}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('fetchMovieDetail error:', error);
      return null;
    }
  };
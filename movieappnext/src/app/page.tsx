'use client';

import { useEffect, useState } from 'react';
import { Movie } from '../types/types';
import { fetchPopularMovies, searchMovies } from '../lib/connection_api';
import MovieCard from '../components/MovieCard';
import styles from './page.module.css'; // Importar los estilos

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Películas cargadas
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [page, setPage] = useState(1); // Página actual, comenzamos en la 1
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda

  useEffect(() => {
    loadMovies(page, searchTerm);
  }, [page, searchTerm]);

  const loadMovies = async (pageToLoad: number, term: string) => {
    setLoading(true);
    const data = term
      ? await searchMovies(term, pageToLoad)
      : await fetchPopularMovies(pageToLoad);

    if (Array.isArray(data)) {
      setMovies(data); // Cargar las películas de la página actual
    } else {
      console.error('No se pudieron cargar las películas');
      setMovies([]); // Si hay error, mostramos un array vacío
    }
    setLoading(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reiniciar a la primera página con cada nueva búsqueda
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Películas Populares</h1>

      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles['search-input']} 
        />
      </div>

      {loading ? (
        <div className={styles.center}>Cargando...</div>
      ) : (
        <>
          <div className={styles.pagination}>
            <button
              className={styles['pagination-btn']}
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              ⬅ Página anterior
            </button>
            <span className={styles['pagination-info']}>Página {page}</span>
            <button className={styles['pagination-btn']} onClick={handleNextPage}>
              Página siguiente ➡
            </button>
          </div>

          <div className={styles.grid}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

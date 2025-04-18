import { useEffect, useState } from 'react';
import { fetchPopularMovies, searchMovies } from '../connection_api';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMovies(page, searchTerm);
  }, [page, searchTerm]);

  const loadMovies = async (pageToLoad, term) => {
    setLoading(true);
    const data = term
      ? await searchMovies(term, pageToLoad)
      : await fetchPopularMovies(pageToLoad);

    if (Array.isArray(data)) {
      setMovies(data);
    } else {
      console.error('No se pudieron cargar las películas');
      setMovies([]);
    }
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reiniciar a la primera página con cada nueva búsqueda
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));

  return (
    <div className="home">
      <h1>Películas Populares</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div className="center">Cargando...</div>
      ) : (
        <>
        {/* Paginación */}
        <div className="pagination">
          <button className="pagination-btn" onClick={handlePrevPage} disabled={page === 1}>
            ⬅ Página anterior
          </button>
          <span className="pagination-info">Página {page}</span>
          <button className="pagination-btn" onClick={handleNextPage}>
            Página siguiente ➡
          </button>
        </div>
          <div className="grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          
        </>
      )}
    </div>
  );
};

export default Home;
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { fetchMovieDetail } from '../connection_api';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetail(id).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="center">Cargando detalles...</div>;
  if (!movie) return <div className="center">Película no encontrada</div>;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-detail">
      <img src={imageUrl} alt={movie.title} className="movie-detail-poster" />
      <div className="movie-detail-info">
        <h1>{movie.title}</h1>
        <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
        <p><strong>Calificación:</strong> {movie.vote_average} / 10</p>
        <p><strong>Sinopsis:</strong></p>
        <p>{movie.overview}</p>

        <button className="back-button" onClick={() => navigate(-1)}>← Volver</button>
      </div>
    </div>
  );
};

export default MovieDetail;
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={imageUrl} alt={movie.title} className="movie-image" />
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-date">{movie.release_date}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
import { fetchMovieDetail } from '@/lib/connection_api';
import Image from 'next/image';
import styles from './MovieDetail.module.css';
import Link from 'next/link';

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

const MovieDetailPage = async ({ params: { id } }: MovieDetailPageProps) => {
  const movie = await fetchMovieDetail(id);

  if (!movie) {
    return <div>¡Película no encontrada!</div>;
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>⬅ Volver</Link>
      <div className={styles.movieDetails}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.releaseDate}>Fecha de estreno: {movie.release_date}</p>
          <p className={styles.overview}>{movie.overview}</p>
          <p className={styles.genres}>
            Géneros: {movie.genres?.map((g) => g.name).join(', ') || 'No disponibles'}
          </p>
          <p className={styles.rating}>⭐ {movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
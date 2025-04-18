import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MovieCard.module.css'; // Asegúrate de importar el archivo CSS

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={`/${movie.id}`} className={styles.card}>
    <div className={styles['movie-card']}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
        layout="responsive"
      />
      <div className={styles['movie-info']}>
        <h2 className={styles['movie-title']}>{movie.title}</h2>
        <p className={styles['movie-overview']}>
          {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
        </p>
      </div>
    </div>
    </Link>
  );
};

export default MovieCard;
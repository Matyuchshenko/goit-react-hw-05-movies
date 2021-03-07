import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import hitsApi from '../../../Services/hits-api';
import MovieCard from '../../MovieCard/movieCard';
import s from './homePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    hitsApi
      .getTrendingMovies()
      .then(data => {
        setMovies(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h2 className={s.title}>Trending today</h2>
      <ul className={s.cardList}>
        {movies.map(movie => (
          <li key={movie.id} className={s.cardItem}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
              className={s.link}
            >
              <MovieCard movie={movie} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
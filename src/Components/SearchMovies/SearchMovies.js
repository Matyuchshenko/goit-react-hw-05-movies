import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import hitsApi from '../../Services/hits-api';
import MovieCard from '../MovieCard/movieCard';
import s from './SearchMovies.module.css';


export default function SearchMovies({ searchMovies }) {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!searchMovies) {
      return;
    }
    hitsApi
      .getMovieQuery(searchMovies)
      .then(data => {
        setMovies(data.results);
        setTotalResults(data.total_results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [searchMovies]);

  return (
    <>
      {totalResults === 0 ? (
        <h2>No results were found for your request!</h2>
      ) : (
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
      )}
    </>
  );
}

SearchMovies.propTypes = {
  searchMovies: PropTypes.string.isRequired,
};
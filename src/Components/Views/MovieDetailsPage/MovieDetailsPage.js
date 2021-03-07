import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import {useParams, NavLink, useRouteMatch, Route, useLocation, useHistory} from 'react-router-dom';
import hitsApi from '../../../Services/hits-api';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../../Cast/Cast.js' /* webpackChunkName: "Casts"*/),
);

const Reviews = lazy(() =>
  import('../../Reviews/reviews.js' /* webpackChunkName: "Reviews"*/),
);

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const backLocation = useRef(location);

  const onGoBack = () => {
    history.push(backLocation?.current?.state?.from ?? '/');
  };

  useEffect(() => {
    hitsApi
      .getMovieDetails(movieId)
      .then(data => {
        setMovie(data);
    });
  }, [movieId]);

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={onGoBack} className={s.buttonBack}>
            Go back
          </button>
          <div className={s.filmDetails}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
              className={s.poster}
            />
            <div>
              <h2>{movie.original_title}</h2>
              <p className={s.text}>{movie.vote_average}</p>
              <h3>Overview</h3>
              <p className={s.text}>{movie.overview}</p>
              <h4>Genres</h4>
              <p className={s.text}>
                {movie.genres &&
                  movie.genres.map(genre => (
                    <span className={s.genre} key={genre.id}>
                      {genre.name}
                    </span>
                  ))}
              </p>
            </div>
          </div>
          <div className={s.addingInformation}>
            <h4>Additional Information</h4>
            <NavLink
              to={`${url}/Cast`}
              className={s.link}
              activeClassName={s.activeLink}
              exact
            >
              Cast
            </NavLink>

            <NavLink
              to={`${url}/Reviews`}
              className={s.link}
              activeClassName={s.activeLink}
              exact
            >
              Reviews
            </NavLink>
          </div>

          <Suspense fallback={<h2>Loading...</h2>}>
            <Route path={`${url}/cast`}>
              <Cast id={movieId} />
            </Route>
            <Route path={`${url}/reviews`}>
              <Reviews id={movieId} />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}
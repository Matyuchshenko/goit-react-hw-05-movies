import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import NoImage from '../images/NoImage.jpg';
import s from './Cast.module.css';
import hitsApi from '../../Services/hits-api';

export default function Cast({ id }) {
  const [actors, setActors] = useState(null);

  useEffect(() => {
    hitsApi.getActorsCast(id).then(data => {
        setActors(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  window.scrollTo({
    top: 500,
    behavior: 'smooth',
  });

  return (
    <ul className={s.castList}>
      {actors &&
        actors.map(({ id, profile_path, original_name, character }) => (
          <li key={id} className={s.actorCard}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                  : NoImage
              }
              alt={original_name}
            />
            <p className={s.actorName}>{original_name}</p>
            <p className={s.character}>{character}</p>
          </li>
        ))}
    </ul>
  );
}

Cast.propTypes = {
  id: PropTypes.string.isRequired,
};

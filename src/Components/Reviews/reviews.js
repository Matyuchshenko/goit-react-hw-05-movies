import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import s from './reviews.module.css';
import hitsApi from '../../Services/hits-api';

export default function Reviews({ id }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    hitsApi
      .getMovieReviews(id)
      .then(data => {
        setReviews(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (reviews && reviews.length === 0) {
    return <p>There are no reviews for this film yet!</p>;
  }
  return (
    <ul className={s.reviewsList}>
      {reviews &&
        reviews.map(({ id, author, content }) => (
          <li key={id} className={s.actorCard}>
            <p className={s.author}>Author:{author}</p>
            <p className={s.review}> {content}</p>
          </li>
        ))}
    </ul>
  );
}

Reviews.propTypes = {
  id: PropTypes.string,
};
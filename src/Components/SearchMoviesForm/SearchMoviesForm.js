import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import s from './SearchMoviesForm.module.css';

export default function SearchMoviesForm({ onSubmit }) {
  const [searchFilm, setSearchFilm] = useState('');

  const handleChange = e => {
    setSearchFilm(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchFilm);
    setSearchFilm('');
  };
  return (
    <form onSubmit={handleSubmit} className={s.searchForm}>
      <input
        onChange={handleChange}
        value={searchFilm}
        placeholder="Search movies"
        className={s.searchFormInput}
      />
      <button type="submit" className={s.searchFormButton}>
        <span className={s.searchFormButtonLabel}>
          <ImSearch />
        </span>
      </button>
    </form>
  );
}

SearchMoviesForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
import React from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onSubmit}>
        <button type="submit" className={css.btn + ' ' + css.search__btn}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          name="inputQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
 
  return (
    <button
      type="button"
      className={css.btn + ' ' + css.loadMore__btn}
      onClick={onClick}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func,
};

export default Button;

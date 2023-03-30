import { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

class Button extends Component {
  handleClick = () => {
    const { page } = this.props;
    const next = page + 1;
    this.props.onClick(next);
  };
  render() {
    return (
      <button type="button" className={css.btn + ' ' + css.loadMore__btn} onClick={this.handleClick}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Button;

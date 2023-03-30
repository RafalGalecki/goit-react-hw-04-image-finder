import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keyup', this.handleClose);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleClose);
  }
  handleClose = event => {
    if (event.code === 'Escape') {
      return this.props.hideModal();
    }
  };

  render() {
    const { hideModal, largeImg } = this.props;

    return (
      <div className={css.backdrop} onClick={hideModal}>
        <div className={css.modal}>
          <img src={largeImg} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default Modal;

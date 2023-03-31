import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ hideModal, largeImg }) => {
  useEffect(() => {
    window.addEventListener('keyup', handleClose);
    console.log('Mounting phase');
  }, []);

  useEffect(() => {
    console.log('Mounting phase');

    return () => {
      window.removeEventListener('keyup', handleClose);
      console.log('Unmounting phase');
    };
  }, []);

  const handleClose = event => {
    if (
      event.code === 'Escape' ||
      event.target.tagName.toLowerCase() !== 'img'
    ) {
      return hideModal();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal}>
        <img src={largeImg} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default Modal;

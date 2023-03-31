import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ hideModal, largeImg }) => {

  const handleClose = event => {
    if (
      event.code === 'Escape' ||
      event.target.tagName.toLowerCase() !== 'img'
    ) {
      return hideModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleClose);

    return () => {
      window.removeEventListener('keyup', handleClose);
      console.log('Unmounting phase');
    };
  }, [handleClose]);

  

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

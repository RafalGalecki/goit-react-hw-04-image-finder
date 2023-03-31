import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ hideModal, largeImg }) => {
  const handleClose = event => {
    if (event.target.tagName.toLowerCase() !== 'img') {
      return hideModal();
    }
  };

  useEffect(() => {
    const handleListener = event => {
      if (event.code === 'Escape') {
      }
      hideModal();
    };
    window.addEventListener('keyup', handleListener);

    return () => {
      window.removeEventListener('keyup', handleListener);
    };
  }, [hideModal]);

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

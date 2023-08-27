import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalContent, ModalBackdrop } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, children }) => {
  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    function closeModalESC(e) {
      if (e.code === 'Escape') {
        closeModal();
      }
    }

    window.addEventListener('keydown', closeModalESC);

    return () => window.removeEventListener('keydown', closeModalESC);
  }, [closeModal]);

  return createPortal(
    <ModalBackdrop onClick={handleClickBackdrop}>
      <ModalContent>{children}</ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import { Component } from 'react';
import { LargeImage, ModalContent, ModalOverlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  closeModalESC = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModalESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalESC);
  }

  render() {
    const { item, closeModal } = this.props;

    return createPortal(
      <ModalOverlay onClick={closeModal}>
        <ModalContent>
          <LargeImage src={item.largeImageURL} alt={item.tags} />
          {this.props.children}
        </ModalContent>
      </ModalOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

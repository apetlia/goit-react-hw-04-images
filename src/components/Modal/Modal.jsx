import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalContent, ModalBackdrop } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  closeModalESC = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
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
    return createPortal(
      <ModalBackdrop onClick={this.handleClickBackdrop}>
        <ModalContent>{this.props.children}</ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

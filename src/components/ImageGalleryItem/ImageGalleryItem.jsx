import PropTypes from 'prop-types';

import { Component } from 'react';
import { Card } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { item } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <Card onClick={this.toggleModal}>
          <img src={item.webformatURL} alt={item.tags} />
        </Card>
        {showModal && <Modal item={item} closeModal={this.toggleModal} />}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

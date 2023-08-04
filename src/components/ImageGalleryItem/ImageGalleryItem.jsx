import { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import { Card } from './ImageGalleryItem.styled';
import { Thumb } from './Thumb.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const {
      item: { webformatURL, tags, largeImageURL },
    } = this.props;

    const { showModal } = this.state;

    return (
      <>
        <Card onClick={this.toggleModal}>
          <img src={webformatURL} alt={tags} />
        </Card>
        {showModal && (
          <Modal closeModal={this.toggleModal}>
            <Thumb>
              <img src={largeImageURL} alt={tags} />
            </Thumb>
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

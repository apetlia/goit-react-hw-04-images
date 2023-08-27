import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import { Card } from './ImageGalleryItem.styled';
import { Thumb } from './Thumb.styled';

function ImageGalleryItem({ item }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const { webformatURL, tags, largeImageURL } = item;

  return (
    <>
      <Card onClick={toggleModal}>
        <img src={webformatURL} alt={tags} />
      </Card>
      {showModal && (
        <Modal closeModal={toggleModal}>
          <Thumb>
            <img src={largeImageURL} alt={tags} />
          </Thumb>
        </Modal>
      )}
    </>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

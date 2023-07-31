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
        <Card className="gallery-item" onClick={this.toggleModal}>
          <img src={item.webformatURL} alt={item.tags} />
        </Card>
        {showModal && <Modal item={item} closeModal={this.toggleModal} />}
      </>
    );
  }
}

export default ImageGalleryItem;

import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { List } from './ImageGallery.styled';

const ImageGallery = ({ items }) => {
  return (
    <List>
      {items.map(({ id, ...otherProps }) => {
        return <ImageGalleryItem key={id} item={otherProps} />;
      })}
    </List>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired
  ).isRequired,
};

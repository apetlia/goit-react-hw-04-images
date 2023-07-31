import styled from '@emotion/styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

export const ImageGallery = ({ items }) => {
  return (
    <List className="gallery">
      {items.map(({ id, ...otherProps }) => {
        return <ImageGalleryItem key={id} item={otherProps} />;
      })}
    </List>
  );
};

const List = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

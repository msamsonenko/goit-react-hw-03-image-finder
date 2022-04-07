import { ImageGalleryLi, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, preview }) => {
  return (
    <ImageGalleryLi>
      <GalleryImage src={preview} alt="some img" />
    </ImageGalleryLi>
  );
};

export default ImageGalleryItem;

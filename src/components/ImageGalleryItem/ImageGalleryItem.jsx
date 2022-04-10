import { ImageGalleryLi, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, preview, onImageClick, pictureTag }) => {
  return (
    <ImageGalleryLi>
      <GalleryImage
        src={preview}
        id={id}
        alt={pictureTag}
        onClick={e => onImageClick(e)}
      />
    </ImageGalleryLi>
  );
};

export default ImageGalleryItem;

import { ImageGalleryLi, GalleryImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

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
ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  preview: PropTypes.string,
  onImageClick: PropTypes.func,
  pictureTag: PropTypes.string,
};
export default ImageGalleryItem;

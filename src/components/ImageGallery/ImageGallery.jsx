import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default function ImageGallery({ pictures, onImageClick }) {
  return (
    <ImageGalleryList>
      {pictures.map(picture => {
        return (
          <ImageGalleryItem
            onImageClick={onImageClick}
            key={picture.id}
            id={picture.id}
            preview={picture.webformatURL}
            pictureTag={picture.tags}
          />
        );
      })}
    </ImageGalleryList>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.array,
  onImageClick: PropTypes.func,
};

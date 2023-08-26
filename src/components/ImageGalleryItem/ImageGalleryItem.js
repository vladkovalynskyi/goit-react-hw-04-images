import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ imageInfo, showLargeImage }) {
  const { webformatURL, tags, largeImageURL } = imageInfo;

  return (
    <li
      className={css.galleryItem}
      onClick={() => {
        showLargeImage(largeImageURL, tags);
      }}
    >
      <img className={css.galleryItemImage} src={webformatURL} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  imageInfo: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  showLargeImage: PropTypes.func.isRequired,
};

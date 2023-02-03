import PropTypes from 'prop-types';

import css from './image-gallery-item.module.css';

const ImageGalleryItem = ({ webImg, largeImg, openModal }) => {
  return (
    <li className={css.galleryItem}>
      <img
        onClick={() => openModal(largeImg)}
        className={css.galleryItemImage}
        src={webImg}
        alt=""
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  largeImg: PropTypes.string.isRequired,
  webImg: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

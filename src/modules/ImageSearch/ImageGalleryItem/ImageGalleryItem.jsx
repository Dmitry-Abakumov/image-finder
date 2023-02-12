import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/compponenets/Modal/Modal';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImage, tags, largeImage }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      setShowModal(false);
    }
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={openModal}
        className={css.ImageGalleryItemImage}
        src={smallImage}
        alt={tags}
      />
      {showModal && (
        <Modal onCloseModal={closeModal}>
          <img src={largeImage} alt={tags} />
        </Modal>
      )}
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', onCloseModal);

    return () => document.removeEventListener('keydown', onCloseModal);
  }, [onCloseModal]);

  return createPortal(
    <div onClick={onCloseModal} className={css.Overlay}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

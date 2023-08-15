import React from 'react';
import ReactDOM from 'react-dom';
import css from './Modal.module.css'; 
const Modal = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={imageUrl} alt=""  />
        <button className={css.closeButton} onClick={closeModal}>
          x
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

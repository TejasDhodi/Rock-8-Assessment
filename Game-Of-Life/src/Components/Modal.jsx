import React from 'react';
import '../Styles/Modal.css';

const Modal = ({ show, handleClose, handleCloseModal }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Instructions</h2>
        <p>Click on the grid to add your name and then click on "Start" to begin the game.</p>

        <div className="cursor-point">
          <div className="cursor" />
          <div className="grid-placeholder"></div>
        </div>
        
        <button onClick={handleCloseModal}>Got It</button>
      </div>
    </div>
  );
};

export default Modal;

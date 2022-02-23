import React from "react";
import "../../../../../assets/styles/css/sudoku/InformationModal.css";

import Button from "./../Button/Button.js";

const InformationModal = ({ closeModal }) => {
  return (
    <div className="InformationModal">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-body">
          <p>
            Welcome to the sudoku game, this game is developed as a Case Study
            of DM, it includes the sudoku generation and sudoku solver!
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformationModal;

import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ content, accept, cancel, children }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;

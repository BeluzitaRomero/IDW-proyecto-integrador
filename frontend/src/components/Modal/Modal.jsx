import React from "react";
import "./Modal.css";

const Modal = ({ accept, cancel, children }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        {children}

        {(cancel || accept) && (
          <div className="flex-center">
            {cancel !== undefined && (
              <button className="btn cancel-button" onClick={cancel}>
                Cancelar
              </button>
            )}
            {accept !== undefined && (
              <button className="btn accent-button" onClick={accept}>
                Aceptar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

import React from "react";
import { IImodal } from "../../types/modalTypes";
import ModalCSS from "./Modal.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
const Modal: React.FC<IImodal> = ({ children, isModalOpen, closeModal }) => {
  return (
    <div
      className={ModalCSS.container}
      style={{ display: isModalOpen ? "flex" : "none" }}
    >
      <div className={ModalCSS.modalChildren}>
        <button type="button" onClick={() => closeModal(false)}>
          <AiFillCloseCircle />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

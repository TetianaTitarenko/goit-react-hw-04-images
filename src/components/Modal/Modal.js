import { useEffect } from "react";
import { createPortal } from "react-dom"
import css from "components/Modal/Modal.module.css"

const modalRoot = document.querySelector('#modal-root')

export function Modal ({src, onClose}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if(e.code === 'Escape') {
      onClose()
    }
  }
  const handleBackdropClick = e => {
    if(e.currentTarget === e.target) {
      onClose()
    }
  }

  return createPortal(<div className={css.Overlay} onClick={handleBackdropClick}>
    <div className={css.Modal}>
    <img src={src} alt=""/>
    </div>
  </div>, 
  modalRoot,)
}
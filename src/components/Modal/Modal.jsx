import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.scss";
import { modalIsOpenSelector } from "redux/session";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import animation from "assets/animations/ModalAnimation.module.scss";
import backdropAnimation from "assets/animations/ModalBackdropAnimation.module.scss";

function Modal({ children, closeModal, modalClassName = "" }) {
  const [startModal, setStartModal] = useState(false);
  const isOpen = useSelector(modalIsOpenSelector);

  useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("keydown", onEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.classList.add(s.body);
    return () => {
      document.body.classList.remove(s.body);
    };
  }, []);

  function onEsc(e) {
    if (e.code === "Escape") closeModal();
  }
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={{ enter: 100, exit: 500 }}
      classNames={backdropAnimation}
      unmountOnExit={true}
      appear={true}
      onEntered={() => setStartModal(true)}
      onExit={() => setStartModal(false)}
    >
      <div className={s.backdrop} onClick={onBackdropClick}>
        <CSSTransition
          in={startModal}
          timeout={250}
          classNames={animation}
          unmountOnExit={true}
        >
          <div className={modalClassName}>{children}</div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  modalClassName: PropTypes.string,
};

export default Modal;

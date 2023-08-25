import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const ModalComponent = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
      <div className={classes.buttons}>
        <div
          onClick={props.okHandle}
          className={classes.btn + " " + classes.btnPrimary}
        >
          Ok
        </div>
        <div
          className={classes.btn + " " + classes.btnSecondary}
          onClick={props.cancelHandle}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

const Backdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.cancelHandle}>
      <ModalComponent
        okHandle={props.okHandle}
        cancelHandle={props.cancelHandle}
      >
        {props.children}
      </ModalComponent>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop okHandle={props.okHandle} cancelHandle={props.cancelHandle}>
          {props.children}
        </Backdrop>,
        document.querySelector(".backdrop")
      )}
    </>
  );
};

export default Modal;

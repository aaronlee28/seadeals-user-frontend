import React from 'react';
import './Modal.scss';

type ModalProps = {
  // modalType: string;
  // data: any;
  // accept: () => void;
  cancel: () => void;
  children: any;
};

const Modal = (props: ModalProps) => {
  const {
    cancel,
    children,
  } = props;

  return (
    <div
      className="modal_container"
      onClick={cancel}
      role="presentation"
    >
      <div
        className="modal_content"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        {
          children
        }
      </div>
    </div>
  );
};

export default Modal;

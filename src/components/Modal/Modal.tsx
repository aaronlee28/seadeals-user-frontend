import React from 'react';

type ModalProps = {
  modalType: string;
  data: any;
  accept: () => void;
  cancel: () => void;
};

const Modal = (props: ModalProps) => {
  const {
    modalType,
    data,
    accept,
    cancel,
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
          modalType === 'membership'
          && (
            <div
              onClick={accept}
              role="presentation"
            >
              SINI
              {data}
            </div>
          )
        }
        {/*  ADD HERE */}
      </div>
    </div>
  );
};

export default Modal;

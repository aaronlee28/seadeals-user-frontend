import React from 'react';
import './Modal.scss';
import Button from '../Button/Button';

type ModalRequiredProps = {
  // modalType: string;
  // data: any;
  // accept: () => void;
  cancel: () => void;
  children: any;
};

type ModalOptionalProps = {
  isHaveCloseButton?: boolean,
};

interface ModalProps
  extends ModalRequiredProps,
  ModalOptionalProps {}

const defaultProps: ModalOptionalProps = {
  isHaveCloseButton: false,
};

const Modal = (props: ModalProps) => {
  const {
    cancel,
    isHaveCloseButton,
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
          isHaveCloseButton
          && (
            <div className="close_button">
              <Button
                buttonType="secondary alt"
                text="X"
                handleClickedButton={cancel}
              />
            </div>
          )
        }
        {
          children
        }
      </div>
    </div>
  );
};

Modal.defaultProps = defaultProps;

export default Modal;

import React from 'react';

import './Button.scss';

type ButtonRequiredProps = {
  buttonType: string;
  handleClickedButton: () => void;
};

type ButtonOptionalProps = {
  text?: string;
  iconUrl?: any;
  iconName?: string;
};

interface ButtonProps
  extends ButtonRequiredProps,
  ButtonOptionalProps {}

const defaultProps: ButtonOptionalProps = {
  text: '',
  iconUrl: null,
  iconName: '',
};

const Button = (props: ButtonProps) => {
  const {
    buttonType,
    text,
    iconUrl,
    iconName,
    handleClickedButton,
  } = props;

  return (
    <button
      type="button"
      className={`button ${buttonType}`}
      onClick={handleClickedButton}
    >
      {
        text !== ''
        && (
          <p className="text">{text}</p>
        )
      }
      {
        iconUrl
        && (
          React.createElement(iconUrl, { className: iconName })
        )
      }
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;

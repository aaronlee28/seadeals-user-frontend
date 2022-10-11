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
  isDisabled?: boolean;
};

interface ButtonProps
  extends ButtonRequiredProps,
  ButtonOptionalProps {}

const defaultProps: ButtonOptionalProps = {
  text: '',
  iconUrl: null,
  iconName: '',
  isDisabled: false,
};

const Button = (props: ButtonProps) => {
  const {
    buttonType,
    text,
    iconUrl,
    iconName,
    isDisabled,
    handleClickedButton,
  } = props;

  return (
    <button
      type="button"
      className={`button ${buttonType} ${isDisabled ? 'disabled' : ''}`}
      onClick={handleClickedButton}
      disabled={isDisabled}
    >
      {
        iconUrl && !buttonType.includes('right')
        && (
          React.createElement(iconUrl, { className: iconName })
        )
      }
      {
        text !== ''
        && (
          <p className="text">{text}</p>
        )
      }
      {
        iconUrl && buttonType.includes('right')
        && (
          React.createElement(iconUrl, { className: iconName })
        )
      }
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;

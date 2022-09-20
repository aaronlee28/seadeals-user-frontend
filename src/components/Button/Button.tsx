import React from 'react';

import './Button.scss';

type ButtonProps = {
  buttonType: string;
  text: string;
  iconUrl: string;
  iconName: string;
  handleClickedButton: () => void;
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
        text
        && (
          <p className="text">{text}</p>
        )
      }
      {
        iconUrl
        && (
          <img
            className="icon"
            src={iconUrl}
            alt={iconName}
          />
        )
      }
    </button>
  );
};

export default Button;

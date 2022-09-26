import React, { FC } from 'react';

interface Props {
  children: JSX.Element
  text: string
}

const ClickToCopy:FC <Props> = ({ children, text }) => (
  <button
    type="button"
    className="px-0"
    onClick={() => navigator.clipboard.writeText(text)}
  >
    {children}
  </button>
);

export default ClickToCopy;

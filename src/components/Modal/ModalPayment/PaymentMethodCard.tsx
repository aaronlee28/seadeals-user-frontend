import React, { FC } from 'react';

const PaymentMethodCard:FC<any> = ({
  isActive, icon, title, desc, handleClick = null,
}) => (
  <div
    className={`d-flex align-items-center gap-4 border rounded p-3 shadow-sm hover-click w-100 ${isActive && 'border-main'}`}
    role="presentation"
    onClick={handleClick}
  >
    <img src={icon} alt={title} height="40px" />
    <div>
      <p className="fw-bold fs-6">{title}</p>
      <code className="text-dark fs-6">{desc}</code>
    </div>
  </div>
);

export default PaymentMethodCard;

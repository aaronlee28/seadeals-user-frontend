import React, { FC } from 'react';

const WalletAccountItem:FC<any> = ({ account }) => (
  <div className="p-3 border-bottom d-flex justify-content-between">
    <p className="mb-0 text-dark fw-bold fs-6">{account?.name}</p>
    <code className="mb-0 text-dark fs-6">{account?.account_number}</code>
  </div>
);

export default WalletAccountItem;

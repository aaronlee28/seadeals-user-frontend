import React, { FC } from 'react';

const WalletAccountItem:FC<any> = ({ account }) => (
  <div className="px-2 py-3 border-bottom d-flex justify-content-between">
    <p className="mb-0 text-dark fw-bold">{account?.name}</p>
    <code className="mb-0 text-dark">{account?.account_number}</code>
  </div>
);

export default WalletAccountItem;

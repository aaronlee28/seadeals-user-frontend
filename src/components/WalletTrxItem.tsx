import React, { FC } from 'react';

type WalletProps = {
  type: string
};

// TODO: Create TRX Type Parser
// Categorize Trx type

const WalletTrxItem: FC<WalletProps> = ({ type }) => (
  <div className="text-start px-4 py-3 border-top">
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <p className="mb-0">SeaDeals Payment</p>
        <div>
          <small>Belanja</small>
        </div>
        <div>
          <small className="text-secondary">20 Sep 2022, 00:28</small>
        </div>
      </div>
      <div>
        <p className={`mb-0 ${type === 'credit' ? 'text-success' : ''}`}>
          {type === 'credit' ? '+' : '-'}
          {' '}
          Rp
          <b>123.456</b>
        </p>
      </div>
    </div>
  </div>
);

export default WalletTrxItem;

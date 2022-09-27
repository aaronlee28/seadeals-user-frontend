import React, { FC } from 'react';
import WalletHistoryItem from './WalletHistoryItem';

const WalletHistoryRows:FC<any> = ({ trxs }) => (
  <>
    <div className="border-bottom mb-3">
      {trxs.map((trx:any) => (<WalletHistoryItem key={trx.id} trx={trx} />))}
    </div>

    <div className="text-center text-secondary">
      <small>Loading...</small>
    </div>
  </>
);

export default WalletHistoryRows;

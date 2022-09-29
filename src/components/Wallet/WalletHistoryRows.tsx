import React, { FC } from 'react';
import WalletHistoryItem from './WalletHistoryItem';

const WalletHistoryRows:FC<any> = ({ trxs, loading }) => (
  <>
    <div className="border-bottom mb-3">
      {trxs.map((trx:any) => (<WalletHistoryItem key={trx.id} trx={trx} />))}
    </div>

    {loading
      && (
      <div className="text-center text-secondary pb-2">
        <small>Loading...</small>
      </div>
      )}
  </>
);

export default WalletHistoryRows;

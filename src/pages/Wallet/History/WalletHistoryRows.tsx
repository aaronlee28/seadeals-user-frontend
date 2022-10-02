import React, { FC } from 'react';
import WalletHistoryItem from './WalletHistoryItem';

const WalletHistoryRows:FC<any> = ({ trxs, loading, innerRef }) => (
  <>
    {
      trxs.length > 0
        ? (
          <div className="border-bottom mb-3">
            {trxs.map((trx:any, idx:number) => {
              if (trxs.length === idx + 1) {
                return <WalletHistoryItem key={trx.id} trx={trx} innerRef={innerRef} />;
              }
              return <WalletHistoryItem key={trx.id} trx={trx} />;
            })}
          </div>
        )
        : (
          <div className="p-4 fs-5 text-center">
            <small className="text-secondary">No Transactions Yet!</small>
          </div>
        )
      }

    {loading
      && (
      <div className="text-center text-secondary pb-2">
        <small>Memuat...</small>
      </div>
      )}
  </>
);

export default WalletHistoryRows;

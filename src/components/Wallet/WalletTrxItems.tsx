import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import WalletTrxItem from './WalletTrxItem';

const WalletTrxItems:FC<any> = ({ transactions }) => (
  <div className="mx-auto my-4 rounded bg-light shadow-sm rounded">
    <div className="px-4 py-3">
      <div className="d-flex justify-content-between">
        <h5 className="mb-0 fw-bold">Riwayat Transaksi</h5>
        <small className="">Last 3 Transactions</small>
      </div>
    </div>
    <div className="text-center px-4 py-3 border-top normal-link">
      {transactions?.length === 0
        ? <small className="text-secondary">No Transactions Yet!</small>
        : (
          <div>
            {transactions.map((trx:any) => <WalletTrxItem key={trx.id} type="debit" />)}
            <Link to="/wallet/history">
              <small className="text-secondary">Transaksi Lainnya &nbsp; &#8250;</small>
            </Link>
          </div>
        )}
    </div>
  </div>
);

export default WalletTrxItems;

import React, { FC } from 'react';
import { formatPrice } from '../../utils/product';
import formatTitle from '../../utils/titleFormatter';
import formatDate from '../../utils/dateFormatter';

const WalletTrxItem: FC<any> = ({ trxItem }) => {
  const type = trxItem.type === 'topup' ? 'credit' : 'debit';
  return (
    <div className="text-start border-top px-0">
      <div className="d-flex justify-content-between align-items-center px-4 py-3">
        <div>
          <p className="mb-0">{formatTitle(trxItem?.payment_method)}</p>
          <div>
            <small>{trxItem?.type}</small>
          </div>
          <div>
            <small className="text-secondary">{formatDate(trxItem.created_at)}</small>
          </div>
        </div>
        <div>
          <p className={`mb-0 ${type === 'credit' ? 'text-success' : ''}`}>
            {type === 'credit' ? '+' : '-'}
            Rp
            <b>
              {' '}
              {formatPrice(trxItem.total)}
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletTrxItem;

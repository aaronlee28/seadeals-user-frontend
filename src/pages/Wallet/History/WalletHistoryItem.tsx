import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import formatTitle from '../../../utils/titleFormatter';
import formatDate from '../../../utils/dateFormatter';
import { formatPrice } from '../../../utils/product';

const WalletHistoryItem:FC<any> = ({ trx, innerRef }) => (
  <div ref={innerRef} className="border-top text-start py-3">
    <div className="d-flex justify-content-between">
      <div>
        <h6 className="mb-1">{formatTitle(trx?.payment_method)}</h6>
        <div>
          <small>
            {trx.description}
          </small>
        </div>
        <div>
          <small className="text-secondary">
            {formatDate(trx.created_at)}
          </small>
        </div>
      </div>
      <div className="d-flex flex-column text-end">
        <div>
          <span className={`px-1 ${trx.payment_type === 'CREDIT' ? 'text-success' : ''}`}>
            {trx.payment_type === 'CREDIT' ? '+' : '-'}
            Rp
            <b>
              {' '}
              {formatPrice(trx.amount)}
            </b>
          </span>
        </div>
        <div className="mt-auto normal-link">
          <Link to={`/wallet/history/${trx.id}`}>
            <small className="px-1">
              view &nbsp;
              <b>&#8250;</b>
            </small>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default WalletHistoryItem;
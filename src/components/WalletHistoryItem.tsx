import React from 'react';
import { Link } from 'react-router-dom';

const WalletHistoryItem = () => (
  <div className="border-top text-start py-3">
    <div className="d-flex justify-content-between">
      <div>
        <h6 className="mb-1">Payment</h6>
        <div>
          <small>
            To Jumpstart Coffee
          </small>
        </div>
        <div>
          <small className="text-secondary">
            20 Sep 2022, 00.28
          </small>
        </div>
      </div>
      <div className="d-flex flex-column text-end">
        <div>
          <span className="px-1">
            - Rp
            <b>5.000</b>
          </span>
        </div>
        <div className="mt-auto normal-link">
          <Link to="/wallet/history/123456">
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

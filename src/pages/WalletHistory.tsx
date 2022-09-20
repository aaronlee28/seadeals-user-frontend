import React from 'react';
import { Link } from 'react-router-dom';
import WalletHistoryRows from '../components/WalletHistoryRows';

const WalletHistory = () => (
  <div className="">
    <div className="mini-w-screen mx-auto">
      <div className="mx-auto my-4 rounded bg-light shadow-sm rounded py-3">
        <div>
          <div className="px-4 mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="normal-link">
                <Link to="/wallet">
                  <h3>&#8249;</h3>
                </Link>
              </div>
              <h4 className="mb-1">Wallet History</h4>
            </div>
          </div>
          <div className="px-4 pt-1">
            <div className="">
              <div className="text-start mb-4">
                <h6>Transactions</h6>
              </div>
              <WalletHistoryRows />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WalletHistory;

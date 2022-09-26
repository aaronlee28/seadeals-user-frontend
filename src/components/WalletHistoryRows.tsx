import React from 'react';
import WalletHistoryItem from './WalletHistoryItem';

const WalletHistoryRows = () => (
  <>
    <div className="border-bottom mb-3">
      <WalletHistoryItem />
      <WalletHistoryItem />
      <WalletHistoryItem />
    </div>

    <div className="text-center text-secondary">
      <small>Loading...</small>
    </div>
  </>
);

export default WalletHistoryRows;

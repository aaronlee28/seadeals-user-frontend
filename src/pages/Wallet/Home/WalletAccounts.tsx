import React, { FC } from 'react';
import WalletAccountItem from './WalletAccountItem';

const WalletAccounts:FC<any> = ({ accounts }) => (
  <div className="border rounded saved-slp-box">
    {accounts?.length > 0
      ? accounts.map((account:any) => <WalletAccountItem key={account.id} account={account} />)
      : (
        <div>
          <p className="text-center mb-0 fs-6 text-secondary py-3 mb-0">No Saved SeaLabsPay Account!</p>
        </div>
      )}
  </div>
);

export default WalletAccounts;

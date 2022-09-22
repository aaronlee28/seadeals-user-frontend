import React from 'react';
import WalletAccountItem from './WalletAccountItem';

const WalletAccounts = () => (
  <>
    <div className="border rounded">
      <div className="saved-slp-box">
        <WalletAccountItem />
        <WalletAccountItem />
      </div>
    </div>
    {/* <div> */}
    {/*  <p className="text-center mb-0 fs-6 text-secondary">No Saved SeaLabsPay Account!</p> */}
    {/* </div> */}
  </>
);

export default WalletAccounts;

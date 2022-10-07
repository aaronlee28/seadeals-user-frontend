import React, { useState } from 'react';
import InputPINField from '../PIN/InputPINField';
import Button from '../../../components/Button/Button';

const WalletIframe = () => {
  const [PIN, setPIN] = useState<string[]>(new Array(6).fill(''));

  return (
    <div className="text-center h-100 d-flex flex-column justify-content-between">
      <div className="text-center border-bottom py-2 px-2">
        <p className="fs-5 fw-bold">Bayar dengan Wallet</p>
      </div>
      <div className="set-pin-box py-3">
        <p className="mb-3">Masukkan 6 digit PIN Wallet Anda</p>
        <InputPINField PIN={PIN} setPIN={setPIN} />
        <a href="/wallet/settings"><p className="mt-1 mb-3">Lupa PIN?</p></a>
      </div>
      <div className="pb-4 w-50 mx-auto">
        <Button text="Bayar" buttonType="primary mx-auto w-75" handleClickedButton={() => console.log()} />
      </div>
    </div>
  );
};

export default WalletIframe;

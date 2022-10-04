import React from 'react';
import './WalletTopup.scss';
import { useSearchParams } from 'react-router-dom';
import formatTitle from '../../../utils/titleFormatter';
import successIcon from '../../../assets/svg/success.svg';
import { formatPrice } from '../../../utils/product';

const PostTopupSLP = () => {
  const [searchParam] = useSearchParams();

  const redirectToWallet = () => {
    // @ts-ignore
    window.top.location.href = '/wallet';
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="p-4 text-center d-flex justify-content-between flex-column">
        <div className="mb-5">
          <div className="mb-3">
            <img alt="success" src={successIcon} height={86} />
          </div>
          <p className="fs-2 fw-bold mb-3">{formatTitle(searchParam.get('message'))}</p>
          <p className="mb-4">Top Up Successfully Paid with SeaLabs Pay</p>
          <p className="fs-5 mb-2">Amount Paid</p>
          <p className="fs-4 fw-bold">
            Rp
            {formatPrice(parseInt(searchParam.get('amount') || '', 10))}
          </p>
        </div>
        <button
          type="button"
          className="p-2 rounded bg-main text-white fw-bold"
          onClick={redirectToWallet}
        >
          Back to Wallet
        </button>
      </div>
    </div>

  );
};

export default PostTopupSLP;

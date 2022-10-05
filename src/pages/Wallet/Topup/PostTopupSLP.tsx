import React, { useEffect, useState } from 'react';
import './WalletTopup.scss';
import { useSearchParams } from 'react-router-dom';
import formatTitle from '../../../utils/titleFormatter';
import successIcon from '../../../assets/svg/success.svg';
import cancelIcon from '../../../assets/svg/cancel.svg';
import failIcon from '../../../assets/svg/fail.svg';
import { formatPrice } from '../../../utils/product';

const PostTopupSLP = () => {
  const [searchParam] = useSearchParams();
  const [subMsg, setSubMsg] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const status = searchParam.get('status');
    switch (status) {
      case 'TXN_FAILED':
        setIcon(failIcon);
        setSubMsg('Top Up with SeaLabs Pay Failed');
        return;
      case 'TXN_PAID':
        setIcon(successIcon);
        setSubMsg('Top Up Successfully Paid with SeaLabs Pay');
        return;
      case 'TXN_CANCEL':
        setIcon(cancelIcon);
        setSubMsg('Top Up with SeaLabs Pay Cancelled');
        return;
      default:
        setSubMsg('');
    }
  }, []);

  const redirectToWallet = () => {
    // @ts-ignore
    window.top.location.href = '/wallet';
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="p-4 text-center d-flex justify-content-between flex-column">
        <div className="mb-5">
          <div className="mb-3">
            <img alt="success" src={icon} height={156} />
          </div>
          <p className="fs-2 fw-bold mb-3">{formatTitle(searchParam.get('message'))}</p>
          <p className="mb-4">{subMsg}</p>
          <p className="fs-5 mb-2">Amount</p>
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

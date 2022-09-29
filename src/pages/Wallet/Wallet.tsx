import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WalletAccounts from '../../components/Wallet/WalletAccounts';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { formatPrice } from '../../utils/product';
import isWalletPINSet from '../../utils/isWalletPINSet';
import WalletTrxItems from '../../components/Wallet/WalletTrxItems';
import './Wallet.scss';
import nopin from '../../assets/svg/nopin.svg';

const Wallet = () => {
  const axiosPrivate = useAxiosPrivate();
  const [walletInfo, setWalletInfo] = useState<any>(null);
  const [trxs, setTrxs] = useState([]);
  const [hasPin, setHasPin] = useState(false);
  const [SLPAccounts, setSLPAccounts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getWalletInfo = async () => {
      try {
        const response = await axiosPrivate.get('user-wallet', {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setWalletInfo(data);
          setTrxs(data.transactions);
          setHasPin(isWalletPINSet(data.status));
        }
      } catch (err) {
        console.error(err);
      }
    };
    getWalletInfo();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getWalletInfo = async () => {
      try {
        const response = await axiosPrivate.get('user/wallet/transactions?limit=3', {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          console.log(data);
          setTrxs(data.transactions);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getWalletInfo();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSLPAccounts = async () => {
      try {
        const response = await axiosPrivate.get('user/sea-labs-pay', {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setSLPAccounts(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getSLPAccounts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="">
      <div className="mini-w-screen mx-auto">
        <div className="mx-auto my-4 rounded bg-light shadow-sm rounded py-5">
          <div>
            <div className="px-4 mb-4">
              <div className="d-flex justify-content-between">
                <div className="text-start">
                  <h3 className="fw-bold fs-4">SeaDeals Wallet</h3>
                  <p className="text-secondary mb-2 fs-5">Welcome back, John Doe</p>
                </div>
                <div className="normal-link">
                  {hasPin
                    ? (
                      <Link to="/wallet/settings">
                        <small className="border p-2 rounded border-1 fs-6">Change PIN</small>
                      </Link>
                    )
                    : (
                      <Link to="/wallet/settings">
                        <small className="p-2 rounded border-1 fw-bolder text-main border border-2 border-main fs-6">
                          Set Up PIN
                        </small>
                      </Link>
                    )}
                </div>
              </div>
            </div>
            <div className="px-4 mb-4">
              <div className="p-3 rounded wallet-bg text-white text-start">
                <div className="d-flex justify-content-between">
                  <div>
                    <small className="text-backdrop">Balance</small>
                    <div className="pt-3 fw-bold">
                      <span className="fs-6">Rp</span>
                      <span className="fs-2 ms-2">{formatPrice(walletInfo?.balance ? walletInfo.balance : 0)}</span>
                    </div>
                  </div>
                  <div className="normal-link">
                    <Link to={`${hasPin ? '/wallet/topup' : '/wallet/settings'}`}>
                      <div className={`border border-2 rounded p-2 px-3 ${!hasPin && 'bg-gray-trans'}`}>
                        <span className="mb-0 fw-bold fs-6">+ &nbsp; Top Up</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pt-1">
              <div className="">
                <div className="text-start">
                  <h6 className="mb-2">SeaLabsPay Accounts</h6>
                  <WalletAccounts accounts={SLPAccounts} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isWalletPINSet(walletInfo?.status)
          ? <WalletTrxItems transactions={trxs} />
          : (
            <div className="mx-auto my-4 rounded bg-light shadow-sm rounded py-5 border border-2">
              <img alt="PIN not set" src={nopin} height="64px" />
              <p className="text-center mb-0 fs-6 my-2">You have not set your wallet PIN!</p>
              <Link to="/settings"><small className="fw-bold fs-5 text-main">Set PIN</small></Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default Wallet;

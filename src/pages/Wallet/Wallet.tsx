import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import WalletAccounts from './Home/WalletAccounts';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import isWalletPINSet from '../../utils/isWalletPINSet';
import WalletTrxItems from './WalletTrxItems';
import './Wallet.scss';
import nopin from '../../assets/svg/nopin.svg';
import AccountInfo from './Home/AccountInfo';

const Wallet = () => {
  const axiosPrivate = useAxiosPrivate();
  const [walletInfo, setWalletInfo] = useState<any>(null);
  const [hasPin, setHasPin] = useState(false);
  const [SLPAccounts, setSLPAccounts] = useState([]);
  const [mainSLP, setMainSLP] = useState<any>({});

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
          setHasPin(isWalletPINSet(data.status));
        }
      } catch (err) {
        toast.error('Failed to Fetch User Wallet Info');
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
        let { data } = response.data;
        data = data.sort((x:any) => (x.is_main ? -1 : 0));
        if (isMounted) {
          setSLPAccounts(data);
          setMainSLP(data[0]);
        }
      } catch (err) {
        toast.error('Failed to Fetch Connected SeaLabsPay Accounts');
      }
    };
    getSLPAccounts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="mini-w-screen mx-auto">
      <div className="mx-auto my-4 rounded bg-light shadow-sm rounded py-5">
        <div className="px-4 mb-4 d-flex justify-content-between">
          <div className="text-start">
            <p className="fw-bold fs-2">SeaDeals Wallet</p>
            <p className="text-secondary mb-2 fs-6">
              Selamat datang kembali, Name Here
            </p>
          </div>
          <div className="normal-link">
            <Link to="/wallet/settings">
              <small className={`border p-2 rounded fs-6 ${hasPin ? 'border-1' : 'border-2 fw-bolder text-main border-main'}`}>
                {hasPin ? 'Ubah PIN' : 'Atur PIN'}
              </small>
            </Link>
          </div>
        </div>
        <div className="px-4 mb-4">
          <AccountInfo balance={walletInfo?.balance || 0} hasPin={hasPin} mainSLPNum={mainSLP?.account_number || ''} />
        </div>
        <div className="px-4 pt-1 text-start">
          <h6 className="mb-2">Akun SeaLabsPay</h6>
          <WalletAccounts accounts={SLPAccounts} />
        </div>
      </div>
      {isWalletPINSet(walletInfo?.status)
        ? <WalletTrxItems />
        : (
          <div className="text-center mx-auto my-4 py-5 border border-2 rounded bg-light shadow-sm">
            <img alt="PIN not set" src={nopin} height="64px" />
            <p className="mb-0 fs-6 mt-1 mb-4">Amankan Wallet dengan mengatur PIN!</p>
            <div className="normal-link">
              <Link to="/settings">
                <small className="fw-bold fs-6 px-3 py-2 border bg-main text-backdrop rounded shadow-sm">Atur PIN</small>
              </Link>
            </div>
          </div>
        )}
    </div>
  );
};

export default Wallet;

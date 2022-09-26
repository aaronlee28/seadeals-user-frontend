import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WalletAccounts from '../../components/Wallet/WalletAccounts';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { formatPrice } from '../../utils/product';
import isWalletPINSet from '../../utils/isWalletPINSet';
import useAuth from '../../hooks/useAuth';
import WalletTrxItems from '../../components/Wallet/WalletTrxItems';

const Wallet = () => {
  const axiosPrivate = useAxiosPrivate();
  const [walletInfo, setWalletInfo] = useState<any>(null);
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    console.log(auth);

    const getWalletInfo = async () => {
      try {
        const response = await axiosPrivate.get('user-wallet', {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setWalletInfo(data);
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

  return (
    <div className="">
      <div className="mini-w-screen mx-auto">
        <div className="mx-auto my-4 rounded bg-light shadow-sm rounded py-5">
          <div>
            <div className="px-4 mb-4">
              <div className="d-flex justify-content-between">
                <div className="text-start">
                  <h3 className="fw-bold">SeaDeals Wallet</h3>
                  <p className="text-secondary mb-2">Welcome back, John Doe</p>
                </div>
                <div className="normal-link">
                  <Link to="/wallet/settings">
                    <small className="border p-2 rounded border-1">Change PIN</small>
                  </Link>
                </div>
                {/* <div className="normal-link"> */}
                {/*  <Link to="/"> */}
                {/*    <small className="p-2 rounded border-1 bg-warning"> */}
                {/*      Set Up PIN */}
                {/*    </small> */}
                {/*  </Link> */}
                {/* </div> */}
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
                    <Link to={`${isWalletPINSet(walletInfo?.status) ? '/wallet/topup' : '/wallet/settings'}`}>
                      <div className="border border-2 rounded p-2 px-3">
                        <span className="mb-0 fw-bold">+ &nbsp; Top Up</span>
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
                  <WalletAccounts />
                </div>
              </div>
            </div>
          </div>
        </div>
        <WalletTrxItems transactions={[]} />
      </div>
    </div>
  );
};

export default Wallet;

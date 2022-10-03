import React, { useEffect, useState } from 'react';
import './WalletTopup.scss';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import isWalletPINSet from '../../../utils/isWalletPINSet';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import WalletHeader from '../WalletHeader';

const WalletTopup = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [SLPAccounts, setSLPAccounts] = useState([]);
  const [, setSelected] = useState(null);

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
          if (!isWalletPINSet(data.status)) {
            toast.error('Anda harus mengatur PIN untuk melakukan transaksi.');
            navigate('/wallet/settings');
          }
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

  const handleChange = (e:any) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };

  return (
    <div className="mini-w-screen mx-auto">
      <div className="mx-auto my-4 rounded bg-light shadow-sm rounded py-5">
        <WalletHeader backToUrl="/wallet" text="Top Up" />
        <div className="px-4 mb-4 text-start">
          <p className="fw-bold fs-2">Top Up</p>
          <form>
            {
              SLPAccounts.length > 0
                ? SLPAccounts.map((acc:any) => (
                  <div key={acc.id}>
                    <input
                      type="radio"
                      name="slp"
                      id={acc.id}
                      value={acc.account_number}
                      onClick={(e) => handleChange(e)}
                    />
                    <label htmlFor={acc.id}>{acc.account_number}</label>
                  </div>
                ))
                : <p>No SLP Accounts!</p>
            }
            <button type="submit" className="btn border border-dark">Topup</button>
          </form>

          <div className="d-flex justify-content-center py-3">
            <iframe
              src="https://slp.air-sipp.com/user/signin"
              title="SeaLabs Pay"
              className="slp-window"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTopup;

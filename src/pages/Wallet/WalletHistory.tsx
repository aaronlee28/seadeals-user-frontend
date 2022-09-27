import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WalletHistoryRows from '../../components/Wallet/WalletHistoryRows';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const WalletHistory = () => {
  const [trxs, setTrxs] = useState([]);
  const axiosPrivate = useAxiosPrivate();

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

  return (
    <div className="">
      <div className="mini-w-screen mx-auto">
        <div className="mx-auto my-4 rounded bg-light shadow-sm rounded py-3">
          <div>
            <div className="px-4 mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="normal-link mb-2">
                  <Link to="/wallet">
                    <h3>&#8249;</h3>
                  </Link>
                </div>
                <h4 className="mb-1">Wallet History</h4>
              </div>
            </div>
            <div className="px-4 pt-1">
              <div className="">
                <div className="text-start mb-4">
                  <h6>Transactions</h6>
                </div>
                <WalletHistoryRows trxs={trxs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletHistory;

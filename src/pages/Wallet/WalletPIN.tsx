import React, { useEffect, useState } from 'react';
import './Wallet.scss';
import InputPINField from './PIN/InputPINField';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import isWalletPINSet from '../../utils/isWalletPINSet';
import WalletPINButton from './PIN/WalletPINButton';
import PINHeader from './PIN/PINHeader';

const WalletPIN = () => {
  const [PIN, setPIN] = useState<string[]>(new Array(6).fill(''));
  const [hasPin, setHasPin] = useState(false);
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

  return (
    <div className="mini-w-screen mx-auto">
      <div className="mini-w-content my-4 rounded bg-light shadow-sm rounded py-3">
        <PINHeader />
        <div className="px-4 py-3 w-content">
          <div className="text-center mb-4">
            <h5 className="mb-3 px-1">Wallet PIN</h5>
            <p className="text-secondary mb-2">
              {hasPin
                ? 'Select a reset PIN method'
                : 'Enter a new 6 digit PIN to secure your wallet.'}
            </p>
            {(!hasPin)
            && (
            <div className="pin-box py-3">
              <InputPINField PIN={PIN} setPIN={setPIN} />
            </div>
            )}
          </div>
        </div>
        <div className="pb-3">
          {hasPin
            ? (
              <>
                <div className="mb-3">
                  <WalletPINButton title="Change PIN with Password" />
                </div>
                <WalletPINButton title="Change PIN with Email" />
              </>
            )
            : (
              <WalletPINButton
                title="Set PIN"
                handleClick={() => console.log('asd')}
                widthType="auto"
              />
            )}
        </div>
      </div>
    </div>
  );
};
export default WalletPIN;

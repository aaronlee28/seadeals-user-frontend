import React, { FC, useState } from 'react';
import WalletPINButton from './WalletPINButton';
import CHANGE_PIN, { HINT } from '../../../constants/changePINActions';
import mailIcon from '../../../assets/svg/icon_mail_2.svg';
import pwIcon from '../../../assets/svg/icon_pw.svg';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const AuthValidation:FC<any> = ({ setAuthPass }) => {
  const axiosPrivate = useAxiosPrivate();
  const [method, setMethod] = useState('');
  const [hint, setHint] = useState('');
  const [token, setToken] = useState('');
  // const [emailRequested, setEmailRequested] = useState(false);
  // const [emailKey, setEmailKey] = useState('');

  const handleSelectMethod = (option:any) => {
    switch (option) {
      case CHANGE_PIN.WITH_PW:
        setMethod(CHANGE_PIN.WITH_PW);
        setHint(HINT.WITH_PW);
        return;
      case CHANGE_PIN.WITH_EMAIL:
        setMethod(CHANGE_PIN.WITH_EMAIL);
        setHint(HINT.WITH_EMAIL);
        return;
      default:
        setMethod('');
    }
  };

  const validateEmailToken = (emailToken:any) => {
    console.log(emailToken);
    // get key from email by requesting to API
    // if received 200 ok, get response.key, save to usestate
    // send to
    // setAuthPass(true);
  };

  const validatePassword = async (password:any) => {
    // set loading
    try {
      const response = await axiosPrivate.post('step-up-password', JSON.stringify({ password }));
      if (response.status === 200) {
        setAuthPass(true);
      }
    } catch (e) {
      console.log(e);
      // set toast if error passw
    }
  };

  const handleSubmitToken = () => {
    switch (method) {
      case CHANGE_PIN.WITH_PW:
        validatePassword(token);
        return;
      case CHANGE_PIN.WITH_EMAIL:
        validateEmailToken(token);
        return;
      default:
        setMethod('');
    }
  };

  return (
    <>
      <div className="px-4 py-3 w-content">
        <div className="text-center mb-5">
          <h5 className="mb-2 px-1">Wallet PIN</h5>
          {method
            ? (
              <div>
                <p className="text-secondary mb-2 fs-6">{hint}</p>
                <input
                  className="form-control p-2 w-50 mx-auto"
                  placeholder=""
                  type={method === CHANGE_PIN.WITH_PW ? 'password' : 'text'}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
            )
            : <p className="text-secondary mb-2 fs-6">Pilih opsi atur ulang PIN wallet</p>}
          <div className="py-3">
            {method
              ? (
                <button
                  type="button"
                  className="btn w-50 border bg-secondary text-backdrop fw-bold"
                  onClick={handleSubmitToken}
                >
                  Verifikasi
                </button>
              )
              : (
                <>
                  <div className="mb-3">
                    <WalletPINButton
                      title="Change PIN with Password"
                      icon={pwIcon}
                      handleClick={() => handleSelectMethod(CHANGE_PIN.WITH_PW)}
                    />
                  </div>
                  <WalletPINButton
                    title="Change PIN with Email"
                    icon={mailIcon}
                    handleClick={() => handleSelectMethod(CHANGE_PIN.WITH_EMAIL)}
                  />
                </>
              )}
          </div>
        </div>
      </div>
      {method
      && (
      <div className="pb-3 text-center">
        <button
          type="button"
          className="btn border rounded px-4"
          onClick={() => {
            setMethod('');
            setToken('');
          }}
        >
          Ubah Metode
        </button>
      </div>
      )}
    </>
  );
};

export default AuthValidation;

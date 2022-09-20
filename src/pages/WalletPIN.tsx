import React from 'react';
import { Link } from 'react-router-dom';
import lock from '../assets/lock.svg';
import InputPINField from '../components/InputPINField';

const WalletPIN = () => (
  <div className="">
    <div className="mini-w-screen mx-auto">
      <div className="mx-auto my-4 rounded bg-light shadow-sm rounded py-3">
        <div>
          <div className="px-4 mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="normal-link">
                <Link to="/wallet">
                  <h3>&#8249;</h3>
                </Link>
              </div>
              <h4 className="mb-1">Settings</h4>
            </div>
          </div>
          <div className="px-4 py-5">
            <div className="">
              <div className="text-center mb-4">
                <div>
                  <h5 className="mb-3 px-1">Wallet PIN</h5>
                  <p className="text-secondary">Enter a new 6 digit PIN for your wallet.</p>
                </div>
                <div className="pin-box py-3">
                  <InputPINField />
                </div>
                <div>
                  <button type="button" className="btn border rounded w-25">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <img alt="PIN" src={lock} />
                      <span>Enter PIN</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default WalletPIN;

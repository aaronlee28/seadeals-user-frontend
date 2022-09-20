import React from 'react';
import { Link } from 'react-router-dom';
import WalletTrxItem from '../components/WalletTrxItem';

const Wallet = () => (
  <div className="">
    <div className="mini-w-screen mx-auto">
      <div className="mx-auto my-4 rounded bg-light shadow-sm rounded py-5">
        <div>
          <div className="px-4 mb-4">
            <div className="d-flex justify-content-between">
              <div className="text-start">
                <h3>SeaDeals Wallet</h3>
                <p className="text-secondary mb-2">Welcome back, John Doe</p>
              </div>
              <div className="normal-link">
                <Link to="/">
                  <small className="border p-2 rounded border-1">Change PIN</small>
                </Link>
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
                    <span className="fs-2 ms-2">123.456.789.101</span>
                  </div>
                </div>
                <div className="normal-link">
                  <Link to="/">
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
                <div className="border rounded">
                  <div className="saved-slp-box">
                    <div className="p-2 border-bottom">
                      <code className="mb-0 text-dark">1234 5678 9101</code>
                    </div>
                    <div className="p-2 border-bottom">
                      <code className="mb-0 text-dark">1234 5678 9101</code>
                    </div>
                    <div className="p-2 border-bottom">
                      <code className="mb-0 text-dark">1234 5678 9101</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto my-4 rounded bg-light shadow-sm rounded">
        <div className="px-4 py-3">
          <div className="d-flex justify-content-between">
            <h5 className="mb-0">Riwayat Transaksi</h5>
            <small className="">Last 3 Transactions</small>
          </div>
        </div>
        <WalletTrxItem type="debit" />
        <WalletTrxItem type="credit" />
        <WalletTrxItem type="debit" />
        <div className="text-center px-4 py-3 border-top normal-link">
          <Link to="/">
            <small className="text-secondary">Transaksi Lainnya &nbsp; &#8250;</small>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Wallet;

import React from 'react';
import { Link } from 'react-router-dom';
import WalletTrxDetailsRows from './WalletTrxDetailsRows';

const WalletTrxDetails = () => (
  <div className="">
    <div className="mini-w-screen mx-auto">
      <div className="mx-auto my-4 rounded bg-white shadow-sm rounded py-3">
        <div className="px-4">
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="normal-link mb-2">
                <Link to="/wallet/history">
                  <h3>&#8249;</h3>
                </Link>
              </div>
              <h4 className="mb-1">Transaction Details</h4>
            </div>
          </div>
          <div className="border-bottom-dashed">
            <div className="pt-3 pb-4">
              <p className="mb-3 fs-1 fw-bold">Rp123.456</p>
              <p className="mb-1 fs-5">Sent to John </p>
              <p className="mb-0 fs-6">1234 4567 8901</p>
            </div>
          </div>
          <div className="border-bottom-dashed text-start">
            <div className="py-3">
              <div className="pb-3">
                <p className="mb-0 fs-5 fw-bold">Transaction ID: 10101010</p>
              </div>
              <WalletTrxDetailsRows column="From" value="Charlie Doug" />
              <WalletTrxDetailsRows column="From ID" value="0012332100" />
              <WalletTrxDetailsRows column="Payment Method" value="SeaLabs Pay" />
              <WalletTrxDetailsRows column="Status" value="Completed" />
              <WalletTrxDetailsRows column="Date" value="18 Aug 2022" />
            </div>
          </div>
          <div className="text-start">
            <div className="pt-3">
              <WalletTrxDetailsRows column="Total" value="Rp123.456" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WalletTrxDetails;

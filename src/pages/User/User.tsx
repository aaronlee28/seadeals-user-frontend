import React, { useState } from 'react';
import './User.scss';
import Button from '../../components/Button/Button';

const User = () => {
  const [focus, setFocus] = useState('profile');
  // const [alamat, setAlamat] = useState('');

  const handleProfile = () => {
    setFocus('profile');
  };

  const handleAddress = () => {
    setFocus('address');
  };

  const handleAccount = () => {
    setFocus('payment-account');
  };

  const handleAddAddress = () => {
    setFocus('profile');
  };

  return (
    <div className="user_container">
      <div className="whole_container row">
        <div className="side-bar_container col-4 col-md-2">
          <p className="mb-2" onClick={handleProfile}>Profil</p>
          <p className="mb-2" onClick={handleAddress}>Alamat</p>
          <p onClick={handleAccount}>Akun Pembayaran</p>
        </div>
        <div className="profile_container col-8 col-md-8">
          {
              focus === 'profile'
                ? (
                  <div className="address_container row p-2 border-bottom">
                    <div className="col-6 col-md-4 col-lg-3">
                      Profil
                    </div>
                  </div>
                )
                : ''
          }
          {
            focus === 'address'
              ? (
                <div className="address_container row p-2 border-bottom">
                  <div className="col-6 col-md-4 col-lg-3">
                    Alamat Saya
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <Button buttonType="primary" text="Tambah alamat" handleClickedButton={handleAddAddress} />
                  </div>
                </div>
              )
              : ''
          }
          {
              focus === 'payment-account'
                ? (
                  <div className="address_container row p-2 border-bottom">
                    <div className="col-6 col-md-4 col-lg-3">
                      Akun Pembayaran
                    </div>
                  </div>
                )
                : ''
          }
        </div>
      </div>
    </div>
  );
};

export default User;

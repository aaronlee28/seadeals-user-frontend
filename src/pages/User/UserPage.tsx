import React, { useState } from 'react';
import './User.scss';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [focus, setFocus] = useState('profile');
  const navigate = useNavigate();

  const handleProfile = () => {
    setFocus('profile');
  };

  const handleAccount = () => {
    setFocus('payment-account');
  };

  const goToOrderHistory = () => {
    setFocus('order-history');
    navigate('/user/order-history');
  };

  return (
    <div className="user_container">
      <div className="whole_container row">
        <div className="side-bar_container col-4 col-md-2">
          <p className="mb-2" onClick={handleProfile}>Profil</p>
          <div className="mb-2">
            <a className="mb-2" href="/user/addresses"><p role="presentation" className="user_side-bar_clickable">Alamat</p></a>
          </div>
          <p onClick={handleAccount}>Akun Sea Labs Pay</p>
          <p onClick={goToOrderHistory}>Pesanan Saya</p>
        </div>
        <div className="main-side_container col-8 col-md-8">
          {
              focus === 'profile'
                && (
                  <div className="address_container row">
                    <div className="col-6 col-md-4 col-lg-3">
                      Profil
                    </div>
                  </div>
                )
          }
          {
              focus === 'payment-account'
                && (
                  <div className="address_container row">
                    <div className="col-6 col-md-4 col-lg-3">
                      Akun Sea Labs Pay
                    </div>
                  </div>
                )
          }
        </div>
      </div>
    </div>
  );
};

export default User;

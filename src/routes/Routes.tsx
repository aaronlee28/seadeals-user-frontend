import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROLES from '../constants/roles';
import Layout from '../layouts/Layout';
import Login from '../pages/Login';
import Home from '../pages/Home/Home';
import RequireAuth from '../RequireAuth';
import SellerHome from '../pages/Seller/SellerHome';
import Logged from '../pages/Logged';
import SellerLayout from '../layouts/SellerLayout';
import UserLayout from '../layouts/UserLayout';
import SellerRegister from '../pages/Seller/SellerRegister';
import PersistLogin from '../components/PersistLogin';
import SellerPage from '../pages/Seller/SellerPage';
import Wallet from '../pages/Wallet/Wallet';
import WalletPIN from '../pages/WalletPIN';
import WalletHistory from '../pages/WalletHistory';
import WalletTrxDetails from '../pages/WalletTrxDetails';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>

      <Route element={<UserLayout />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/user" element={<Logged />} />

            <Route path="/wallet">
              <Route path="" element={<Wallet />} />
              <Route path="settings" element={<WalletPIN />} />
              <Route path="history" element={<WalletHistory />} />
              <Route path="history/:id" element={<WalletTrxDetails />} />
            </Route>
          </Route>

          <Route path="/toko/">
            <Route path=":slug/" element={<SellerPage />} />
          </Route>
        </Route>

      </Route>

      <Route element={<PersistLogin />}>
        <Route path="/seller/" element={<SellerLayout />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Seller]} />}>
            <Route path="" element={<SellerHome />} />
          </Route>
          <Route path="register" element={<SellerRegister />} />
        </Route>
      </Route>

    </Route>
  </Routes>
);

export default AppRoutes;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROLES from '../constants/roles';
import Layout from '../layouts/Layout';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import RequireAuth from '../RequireAuth';
import SellerHome from '../pages/Seller/SellerHome';
import Profile from '../pages/Profile/Profile';
import SellerLayout from '../layouts/SellerLayout';
import UserLayout from '../layouts/UserLayout';
import SellerRegister from '../pages/Seller/SellerRegister';
import PersistLogin from '../components/PersistLogin';
import SellerPage from '../pages/Seller/SellerPage';
import ProductPage from '../pages/Product/ProductPage';
import Search from '../pages/Search/Search';
import Register from '../pages/Register/Register';
import Cart from '../pages/Cart/Cart';
import Wallet from '../pages/Wallet/Wallet';
import WalletPIN from '../pages/Wallet/WalletPIN';
import WalletHistory from '../pages/Wallet/WalletHistory';
import WalletTrxDetails from '../pages/Wallet/WalletTrxDetails';
import CategoryPage from '../pages/Category/CategoryPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>

      <Route element={<UserLayout />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="search" element={<Search />} />
        <Route path="category" element={<CategoryPage />} />
        <Route path="cart" element={<Cart />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/profile" element={<Profile />} />

            <Route path="/wallet">
              <Route path="" element={<Wallet />} />
              <Route path="settings" element={<WalletPIN />} />
              <Route path="history" element={<WalletHistory />} />
              <Route path="history/:id" element={<WalletTrxDetails />} />
            </Route>
          </Route>

          <Route path="/toko/">
            <Route path=":sellerID/" element={<SellerPage />} />
          </Route>

          <Route path="/produk/">
            <Route path=":slug/" element={<ProductPage />} />
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

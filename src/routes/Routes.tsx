import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Login from '../pages/Login';
import Home from '../pages/Home';
import RequireAuth from '../RequireAuth';
import SellerHome from '../pages/Seller/SellerHome';
import ROLES from '../constants/roles';
import Logged from '../pages/Logged';
import SellerLayout from '../layouts/SellerLayout';
import UserLayout from '../layouts/UserLayout';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>

      <Route element={<UserLayout />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/user" element={<Logged />} />
        </Route>

      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Seller]} />}>
        <Route path="/seller" element={<SellerLayout />}>
          <Route path="" element={<SellerHome />} />
        </Route>
      </Route>

    </Route>
  </Routes>
);

export default AppRoutes;

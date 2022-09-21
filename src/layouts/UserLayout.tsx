import React from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout = () => (
  <div>
    <h1>User</h1>
    <Outlet />
  </div>
);

export default UserLayout;

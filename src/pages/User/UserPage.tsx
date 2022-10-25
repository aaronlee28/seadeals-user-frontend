import React from 'react';
import './UserPage.scss';
import UserSidebar from './UserSidebar/UserSidebar';
import { Outlet } from 'react-router-dom';

const UserPage = () => {
  return (
    <div className="user-page_container">
      <div className="user-page_content">
        <UserSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;

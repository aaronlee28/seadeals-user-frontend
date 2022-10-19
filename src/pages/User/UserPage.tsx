import React from 'react';
import './UserPage.scss';
import { useLocation } from 'react-router-dom';
import UserSidebar from './UserSidebar/UserSidebar';
import Address from './Address';
import OrderHistory from './OrderHistory/OrderHistory';

const UserPage = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="user-page_container">
      <div className="user-page_content">
        <UserSidebar />
        {
          location.pathname === '/user/addresses'
          && (
            <Address />
          )
        }
        {
          location.pathname === '/user/order-history'
          && (
            <OrderHistory />
          )
        }
      </div>
    </div>
  );
};

export default UserPage;

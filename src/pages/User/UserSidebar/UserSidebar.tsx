import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { USER_SIDEBAR } from '../../../constants/user';

import './UserSidebar.scss';
import useAuth from '../../../hooks/useAuth';

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarItems = USER_SIDEBAR;
  const { auth } = useAuth();

  const avatar = auth.user.avatar_url;
  const { name } = auth.user;

  const goToLink = (link: string) => {
    navigate(link);
  };

  return (
    <div className="user-sidebar_container">
      <div className="user-sidebar_content">
        <div className="header">
          <div className="col-auto px-0">
            <img
              className="image"
              src={avatar}
              alt={name}
            />
          </div>
          <p className="name">{ name }</p>
        </div>
        {
          sidebarItems.map(
            (item: any) => (
              <div
                key={item.name}
                className={`item ${
                  item.link === location.pathname
                    ? 'active'
                    : ''
                }`}
                onClick={() => goToLink(item.link)}
                role="presentation"
              >
                <p
                  className="name"
                >
                  { item.name }
                </p>
              </div>
            ),
          )
        }
      </div>
    </div>
  );
};

export default UserSidebar;

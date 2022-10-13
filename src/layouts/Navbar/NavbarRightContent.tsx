import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';
import { ReactComponent as IconHeart } from '../../assets/svg/icon_heart.svg';
import Users from '../../api/users';
import { ReactComponent as IconChevron } from '../../assets/svg/icon_chevron_right.svg';

const NavbarRightContent = () => {
  const [user, setUser] = useState({
    avatar_url: '',
    username: '',

  });

  const { auth } = useAuth();
  const navigate = useNavigate();

  const goToRegisterPage = () => {
    navigate('/register');
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  const getUser = async () => {
    await Users.GetUserProfile()
      .then((resp) => {
        setUser(resp.data.data);
      })
      .catch((err) => err);
  };

  const openDropdown = () => {
    console.log('OPEN DROPDOWN');
  };

  console.log(auth);

  useEffect(() => {
    if (auth.user) {
      getUser().then();
    }
  }, [auth.user]);

  return (
    <div className="right_content">
      {
        !auth.user
        && (
          <div className="buttons">
            <Button
              buttonType="primary"
              text="Daftar"
              handleClickedButton={goToRegisterPage}
            />
            <Button
              buttonType="primary"
              text="Masuk"
              handleClickedButton={goToLoginPage}
            />
          </div>
        )
      }
      {
        auth.user
        && (
          <div className="buttons">
            <Button
              buttonType="plain"
              iconUrl={IconHeart}
              iconName="favorite"
              handleClickedButton={goToLoginPage}
            />
            <div className="profile">
              <img
                className="image"
                src={user.avatar_url}
                alt={user.username}
              />
              <Button
                buttonType="plain"
                text={user.username}
                iconUrl={IconChevron}
                iconName="chevron"
                handleClickedButton={openDropdown}
              />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default NavbarRightContent;

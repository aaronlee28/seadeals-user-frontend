import React from 'react';

import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';
import { ReactComponent as IconHeart } from '../../assets/svg/icon_heart.svg';
import { ReactComponent as IconChevron } from '../../assets/svg/icon_chevron_right.svg';

const NavbarRightContent = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  console.log(auth);

  const goToRegisterPage = () => {
    navigate('/register');
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  const openDropdown = () => {
    console.log('OPEN DROPDOWN');
    navigate('/user/addresses');
  };

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
          <div className="buttons auth">
            <Button
              buttonType="plain"
              iconUrl={IconHeart}
              iconName="favorite"
              handleClickedButton={goToLoginPage}
            />
            <div className="profile">
              <div className="image_content">
                <img
                  className="image"
                  src="https://firebasestorage.googleapis.com/v0/b/bucket-seadeals.appspot.com/o/avatars%2Fuser%2FA%2FAhn_Jae-Hyeon-p02.jpg?alt=media&token=70a5de1d-6f62-4563-90a6-ffea4017b843"
                  alt={auth.user.username}
                />
              </div>
              <Button
                buttonType="plain right"
                text={auth.user.username}
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

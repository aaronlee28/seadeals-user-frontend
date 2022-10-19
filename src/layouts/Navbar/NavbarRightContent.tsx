import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';
import { ReactComponent as IconHeart } from '../../assets/svg/icon_heart.svg';
import { ReactComponent as IconChevron } from '../../assets/svg/icon_chevron_right.svg';
import { setAvatarURL } from '../../features/navbarProfile/navbarProfileSlice';
import useFavoriteCount from '../../hooks/useFavoriteCount';

const NavbarRightContent = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const navbarProfileSlice = useSelector((state:any) => state.navbarProfile);
  const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/bucket-seadeals.appspot.com/o/avatars%2Fuser%2Fanonym.jpeg?alt=media&token=66dbb36a-2ac1-4b1f-ad67-b2834eefdcef';

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

  // DATA FAVORITE COUNT EXAMPLE USAGE, IT MEANS THAT THIS FAVORITE CHANGE EVERY TIME AUTH CHANGE
  const { loadingFavorite, favoriteCount } = useFavoriteCount(auth);
  useEffect(() => {
    console.log('IT IS NOW', (loadingFavorite ? 'LOADING' : 'DONE LOADING'));
    console.log('AND FAVORITE COUNT IS', favoriteCount);
  }, [favoriteCount]);

  useEffect(() => {
    if (auth?.user?.avatar_url) {
      dispatch(setAvatarURL(auth.user.avatar_url));
    }
  }, [auth?.user?.avatar_url]);

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
            {/* FAVORITE COUNT AND ITS LOADING IS USING useFavoriteCount HOOKS */}
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
                  src={navbarProfileSlice.avatarURL || defaultPic}
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

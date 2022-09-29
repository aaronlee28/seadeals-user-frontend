import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

const Profile = () => {
  const logout = useLogout();
  return (
    <>
      <button type="button" onClick={() => logout()}>logout</button>
      <Link to="/seller">to seller</Link>
    </>
  );
};

export default Profile;

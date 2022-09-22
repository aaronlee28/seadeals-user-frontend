import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Logged = () => {
  const logout = useLogout();
  return (
    <>
      <h1>Logged in User</h1>
      <button type="button" onClick={() => logout()}>logout</button>
      <Link to="/seller">to seller</Link>
    </>
  );
};

export default Logged;

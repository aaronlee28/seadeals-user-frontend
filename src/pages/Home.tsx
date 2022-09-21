import React from 'react';
import { Link } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';

const Home = () => {
  const refresh = useRefreshToken();

  return (
    <div>
      <h1>Hello</h1>
      <Link to="/user">User</Link>
      <button type="button" onClick={() => refresh()}>refresh</button>
    </div>
  );
};

export default Home;

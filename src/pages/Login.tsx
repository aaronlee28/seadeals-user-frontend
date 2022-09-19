import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { setAuth } = useAuth();

  const loginAsUser = () => {
    setAuth({ username: 'john', email: 'johndoe@mail.com', roles: 'user' });
  };

  const loginAsSeller = () => {
    setAuth({ username: 'john', email: 'seller@mail.com', roles: 'user seller' });
  };

  return (
    <main>
      <h1>Login dulu</h1>
      <button onClick={loginAsUser} type="button">Login As User</button>
      <button onClick={loginAsSeller} type="button">Login As Seller</button>
      <div>
        <Link to="/seller">SELLER</Link>
      </div>
      <div>
        <Link to="/user">USER</Link>
      </div>
    </main>
  );
};

export default Login;

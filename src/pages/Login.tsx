import React from 'react';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { setAuth } = useAuth();

  const loginAsUser = () => {
    setAuth({ token: 'random-token' });
  };

  return (
    <main>
      <button onClick={loginAsUser} type="button">Login</button>
    </main>
  );
};

export default Login;

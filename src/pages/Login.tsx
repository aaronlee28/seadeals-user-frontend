import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const LOGIN_URL = '/sign-in';

const Login = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          withCredentials: true,
        },
      );
      const decode:any = jwt_decode(response.data.data.id_token);
      const accessToken = response?.data?.data.id_token;
      const { user, scope } = decode;

      setAuth({ user, roles: scope.split(' '), accessToken });
      setEmail('');
      setPassword('');

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h1>Login dulu</h1>
      <div className="p-2 border rounded">
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
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

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import logo_xs from '../../assets/images/logo_xs.png';
import logo from '../../assets/images/logo.png';
import './Login.scss';

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
      localStorage.setItem('access_token', accessToken);

      setEmail('');
      setPassword('');

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCallbackResponse = async (response: any) => {
    console.log('response google: ', response);
    try {
      const res = await axios.post(
        '/google/sign-in',
        JSON.stringify({ token_id: response.credential }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      console.log('localhost response: ', res);
      const decode:any = jwt_decode(res.data.data.id_token);
      const accessToken = res?.data?.data.id_token;
      const { user, scope } = decode;

      setAuth({ user, roles: scope.split(' '), accessToken });
      localStorage.setItem('access_token', accessToken);

      if (from === '/register' || from === '/login') {
        navigate('/', { replace: true });
      }

      navigate(from, { replace: true });
    } catch (err) {
      navigate('/register', { replace: true });
    }
  };

  useEffect(() => {
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: '751840690856-m92j6st0agj7bgbuv3ok4t5j6sr7e8cm.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large', width: '400' },
    );
  }, []);

  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(!revealed);
  };

  return (
    <div className="login__container">
      <div className="login__cards__container mx-5">
        <div className="register__cards row">
          <div className="logo-m d-block d-md-none col-12 col-md-6 py-2">
            <img alt="" className="img-fluid" src={logo_xs} />
          </div>
          <div className="logo center d-none d-md-block col-12 col-md-6 p-5">
            <img alt="" className="img-fluid" src={logo} />
          </div>
          <div className="center col-12 col-md-6 mx-auto my-3 px-2 d-none d-lg-block">
            <div>
              <h1 className="header my-4">
                <b>
                  Masuk
                </b>
              </h1>
              <div className="justify-content-center row">
                <form className="col-md-10">
                  <input
                    className="form-control mb-4"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="new-password"
                    required
                  />
                  <div className="input-group mb-4">
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type={(revealed) ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Kata sandi"
                      autoComplete="new-password"
                      required
                    />
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
                    <div className="input-group-append" role="button" onClick={handleReveal}>
                      <span className="input-group-text">
                        { !revealed ? <BsEyeSlash /> : <BsEye /> }
                      </span>
                    </div>
                  </div>
                  <div className="center">
                    <button className="login-button" type="button" onClick={handleSubmit}><b>Masuk</b></button>
                  </div>
                  <div className="hr-sect my-4"><b>ATAU</b></div>
                  <div className="d-flex justify-content-center">
                    <div className="mb-4" id="signInDiv" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <p id="daftar-text">
                      Belum punya akun SeaDeals?
                      {' '}
                      <a href="/register" id="daftar-link"><b>Daftar</b></a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import './Register.scss';
import React, { useEffect, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from '../../api/axios';
import logo from '../../assets/images/logo.png';
import logo_xs from '../../assets/images/logo_xs.png';
import useAuth from '../../hooks/useAuth';

const Register = () => {
  const [revealed, setRevealed] = useState(false);
  const [confirmPasswordVis, setConfirmPasswordVis] = useState(false);

  const handleReveal = () => {
    setRevealed(!revealed);
  };

  const handleCPVis = () => {
    setConfirmPasswordVis(!confirmPasswordVis);
  };

  const uRL = '/register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('male');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [passwordCorrect, setPasswordCorrect] = useState(true);

  useEffect(() => {
    if (password !== confirmPassword && confirmPassword !== '') {
      setPasswordCorrect(false);
      return;
    }
    setPasswordCorrect(true);
  }, [password, confirmPassword]);

  const [passwordValidity, setPasswordValidity] = useState(true);
  useEffect(() => {
    if (password.includes(userName) && userName !== '') {
      setPasswordValidity(false);
      return;
    }
    setPasswordValidity(true);
  }, [userName]);

  const [userNameValidity, setUserNameValidity] = useState(true);
  useEffect(() => {
    if (userName.includes(' ')) {
      setUserNameValidity(false);
      return;
    }
    setUserNameValidity(true);
  }, [userName]);

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        uRL,
        JSON.stringify({
          email,
          password,
          username: userName,
          full_name: fullName,
          gender,
          phone: `+62${phone}`,
          birth_date: birthDate,
        }),
        {
          withCredentials: true,
        },
      );
      console.log(response);
      const decode:any = jwt_decode(response.data.data.data.id_token);
      const accessToken = response?.data?.data.data.id_token;
      const { user, scope } = decode;

      setAuth({ user, roles: scope.split(' '), accessToken });
      localStorage.setItem('access_token', accessToken);

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUserName('');
      setFullName('');
      setGender('');
      setPhone('');
      setBirthDate('');

      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const [status, setStatus] = useState('');

  useEffect(() => {
    const token:any = localStorage.getItem('access_token');
    console.log(token);
    if (token !== null) {
      const dateNow = new Date();
      // @ts-ignore
      console.log(jwt_decode(token).exp * 1000);
      console.log(dateNow.getTime());
      // @ts-ignore
      if (jwt_decode(token).exp * 1000 < dateNow.getTime()) {
        setStatus('expired');
        return;
      }
      setStatus('signed');
      return;
    }
    setStatus('unsigned');
  }, []);

  useEffect(() => {
    if (status === 'signed') {
      if (from === '/login' || from === '/register' || from === '/') {
        navigate('/', { replace: true });
      }
    }
  }, [status]);

  return (
    <div className="register_container">
      <div className="register_cards_container mx-5">
        <div className="register_cards row">
          <div className="logo-m d-block d-md-none col-12 col-md-6 py-2">
            <img alt="" className="img-fluid" src={logo_xs} />
          </div>
          <div className="logo d-none d-md-block col-12 col-md-6">
            <a href="/src/pages">
              <img alt="" className="register-logo-l img-fluid" src={logo} />
            </a>
          </div>
          <div className="col-12 col-md-6 mx-auto my-3 p-2 d-none d-lg-block">
            <div>
              <h1 className="header mb-2">
                <b>
                  Daftar
                </b>
              </h1>
              <div className="justify-content-center row">
                <form className="col-md-10">
                  <input
                    className="form-control mb-2"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="new-password"
                    required
                  />
                  <div className="input-group mb-2">
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type={(revealed) ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className={passwordValidity ? 'form-control' : 'form-control is-invalid'}
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
                    {
                      passwordValidity ? '' : (
                        <div id="invalid-password" className="invalid-feedback">
                          Password should not include username!
                        </div>
                      )
                    }
                  </div>
                  <div className="input-group mb-2">
                    <input
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      type={(confirmPasswordVis) ? 'text' : 'password'}
                      name="confirm-password"
                      id="confirm-password"
                      className={passwordCorrect ? 'form-control' : 'form-control is-invalid'}
                      placeholder="Ulang kata sandi"
                      autoComplete="new-password"
                      required
                    />
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
                    <div className="input-group-append" role="button" onClick={handleCPVis}>
                      <span className="input-group-text">
                        { !confirmPasswordVis ? <BsEyeSlash /> : <BsEye /> }
                      </span>
                    </div>
                    {
                      passwordCorrect ? '' : (
                        <div id="invalid-password" className="invalid-feedback">
                          Passwords are not the same!
                        </div>
                      )
                    }
                  </div>
                  <div className="input-group mb-2">
                    <input
                      className={userNameValidity ? 'form-control' : 'form-control is-invalid'}
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                      type="text"
                      id="username"
                      placeholder="Username"
                      autoComplete="new-password"
                      required
                    />
                    {
                      userNameValidity ? '' : (
                        <div id="invalid-username" className="invalid-feedback">
                          Whitespaces aren&apos;t allowed in usernames!
                        </div>
                      )
                    }
                  </div>
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="form-control mb-2"
                    type="text"
                    id="fullName"
                    placeholder="Nama lengkap"
                    autoComplete="new-password"
                    required
                  />
                  <select
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    className="form-select mb-2"
                    aria-label="Jenis kelamin"
                  >
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">+62</span>
                    </div>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      type="tel"
                      className="form-control"
                      id="validationCustomTelephone"
                      placeholder="Nomor ponsel"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </div>
                  <label className="birth-date my-0 p-0 mb-2">Tanggal lahir: </label>
                  <input
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                    className="form-control mb-2"
                    type="date"
                    id="birthDate"
                    required
                  />
                  <div className="mb-4">
                    <button className="register-button" type="button" onClick={handleSubmit}><b>Daftar</b></button>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <p id="daftar-text">
                      Sudah punya akun SeaDeals?
                      {' '}
                      <a href="/login" id="daftar-link"><b>Masuk</b></a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mx-md-auto px-2 pb-2 pt-3 d-block d-lg-none">
            <div className="mb-3">
              <h3 className="register-form-header-m mb-2">
                <b>
                  Daftar
                </b>
              </h3>
              <div className="justify-content-center">
                <form className="col-12">
                  <input
                    className="form-control mb-2"
                    value={email}
                    onChange={(event: { target: { value: React.SetStateAction<string>; };
                    }) => setEmail(event.target.value)}
                    type="email"
                    id="email-m"
                    placeholder="Email"
                    autoComplete="new-password"
                    required
                  />
                  <div className="input-group mb-2">
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type={(revealed) ? 'text' : 'password'}
                      name="password-m"
                      id="password-m"
                      className={passwordValidity ? 'form-control' : 'form-control is-invalid'}
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
                    {
                      passwordValidity ? '' : (
                        <div id="invalid-password" className="invalid-feedback">
                          Password should not include username!
                        </div>
                      )
                    }
                  </div>
                  <div className="input-group mb-2">
                    <input
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      type={(confirmPasswordVis) ? 'text' : 'password'}
                      name="confirm-password-m"
                      id="confirm-password-m"
                      className={passwordCorrect ? 'form-control' : 'form-control is-invalid'}
                      placeholder="Ulang kata sandi"
                      autoComplete="new-password"
                      required
                    />
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
                    <div className="input-group-append" role="button" onClick={handleCPVis}>
                      <span className="input-group-text">
                        { !confirmPasswordVis ? <BsEyeSlash /> : <BsEye /> }
                      </span>
                    </div>
                    {
                      passwordCorrect ? '' : (
                        <div id="invalid-password" className="invalid-feedback">
                          Passwords are not the same!
                        </div>
                      )
                    }
                  </div>
                  <div className="input-group mb-2">
                    <input
                      className={userNameValidity ? 'form-control mb-2' : 'form-control is-invalid mb-2'}
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                      type="text"
                      id="username-m"
                      placeholder="Username"
                      autoComplete="new-password"
                      required
                    />
                    {
                      userNameValidity ? '' : (
                        <div id="invalid-username" className="invalid-feedback">
                          Whitespaces aren&apos;t allowed in usernames!
                        </div>
                      )
                    }
                  </div>
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="form-control mb-2"
                    type="text"
                    id="fullName-m"
                    placeholder="Nama lengkap"
                    autoComplete="new-password"
                    required
                  />
                  <select
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    className="form-select mb-2"
                    aria-label="Jenis kelamin"
                  >
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">+62</span>
                    </div>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      type="tel"
                      className="form-control"
                      id="validationCustomTelephone-m"
                      placeholder="Nomor ponsel"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </div>
                  <label className="birth-date my-0 p-0 mb-2">Tanggal lahir: </label>
                  <input
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                    className="form-control mb-2"
                    type="date"
                    id="birthDate-m"
                    required
                  />
                  <div>
                    <button className="register-button" type="button" onClick={handleSubmit}><b>Daftar</b></button>
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

export default Register;

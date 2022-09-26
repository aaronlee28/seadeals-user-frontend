import '../styles/register.scss';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import logo from '../assets/images/logo.png';
import logo_xs from '../assets/images/logo_xs.png';

const Register = () => {
  const clientId = '615670006213-4v02ia4vft53lh5gru72ct2thkbk01mo.apps.googleusercontent.com';

  const onSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    let result;
    let token;
    if ('profileObj' in res) { result = res.profileObj; }
    if ('tokenId' in res) { token = res.tokenId; }
    console.log(result);
    console.log(token);
  };

  const onFailure = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log('SIGN UP FAILED! res: ', res);
  };

  const [revealed, setRevealed] = useState(false);
  const [confirmPasswordVis, setConfirmPasswordVis] = useState(false);

  const handleReveal = () => {
    setRevealed(!revealed);
  };

  const handleCPVis = () => {
    setConfirmPasswordVis(!confirmPasswordVis);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');

  return (
    <div className="register-body">
      <div className="register-card-body center mx-5">
        <div className="cards-body row">
          <div className="logo d-block d-md-none col-12 col-md-6 py-2">
            <img alt="" className="img-fluid" src={logo_xs} />
          </div>
          <div className="logo d-none d-md-block col-12 col-md-6 my-auto">
            <img alt="" className="img-fluid" src={logo} />
          </div>
          <div className="vertical-line d-none d-md-block" />
          <hr className="horizontal-line d-block d-md-none" />
          <div className="form center col-12 col-md-5 ml-md-5 mt-3 p-2 d-none d-lg-block">
            <div>
              <h1 className="header">
                <b>
                  Daftar
                </b>
              </h1>
              <div className="justify-content-center">
                <form className="col-12">
                  <input className="form-control mb-2" type="text" id="email" placeholder="Email" autoComplete="new-password" required />
                  <div className="input-group mb-2">
                    <input
                      type={(revealed) ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Kata sandi"
                      autoComplete="new-password"
                      data-toggle="password"
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
                  <div className="input-group mb-2">
                    <input
                      type={(confirmPasswordVis) ? 'text' : 'password'}
                      name="password"
                      id="confirm-password"
                      className="form-control"
                      placeholder="Ulang kata sandi"
                      autoComplete="new-password"
                      data-toggle="password"
                      required
                    />
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
                    <div className="input-group-append" role="button" onClick={handleCPVis}>
                      <span className="input-group-text">
                        { !confirmPasswordVis ? <BsEyeSlash /> : <BsEye /> }
                      </span>
                    </div>
                  </div>
                  <input className="form-control mb-2" type="text" id="username" placeholder="Username" autoComplete="new-password" required />
                  <input className="form-control mb-2" type="text" id="fullName" placeholder="Nama lengkap" autoComplete="new-password" required />
                  <select className="form-select mb-2" aria-label="Jenis kelamin">
                    <option value="M">Laki-laki</option>
                    <option value="F">Perempuan</option>
                  </select>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">+62</span>
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      id="validationCustomTelephone"
                      placeholder="Nomor ponsel"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </div>
                  <label className="birth-date my-0 p-0 mb-2">Tanggal lahir: </label>
                  <input className="form-control mb-2" type="date" id="birthDate" required />
                  <div className="center">
                    <button className="button" type="submit"><b>Daftar</b></button>
                  </div>
                  <div className="hr-sect"><b>ATAU</b></div>
                  <div>
                    <GoogleLogin
                      className="google-button"
                      clientId={clientId}
                      buttonText="Daftar dengan Google"
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy="single_host_origin"
                      isSignedIn
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="form-m center col-12 col-md-5 mx-md-auto p-2 d-block d-lg-none">
            <div className="mb-3">
              <h3 className="header-m">
                <b>
                  Daftar
                </b>
              </h3>
              <div className="justify-content-center">
                <form className="col-12">
                  <input className="form-control mb-2" type="text" id="email" placeholder="Email" autoComplete="new-password" required />
                  <input className="form-control mb-2" type="password" name="password" id="password" data-toggle="password" placeholder="Kata sandi" autoComplete="new-password" required />
                  <input className="form-control mb-2" type="password" placeholder="Ulang kata sandi" autoComplete="new-password" required />
                  <input className="form-control mb-2" type="text" id="username" placeholder="Username" autoComplete="new-password" required />
                  <input className="form-control mb-2" type="text" id="fullName" placeholder="Nama lengkap" autoComplete="new-password" required />
                  <select className="form-select mb-2" aria-label="Jenis kelamin">
                    <option value="M">Laki-laki</option>
                    <option value="F">Perempuan</option>
                  </select>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">+62</span>
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      id="validationCustomTelephone"
                      placeholder="Nomor ponsel"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </div>
                  <label className="birth-date my-0 p-0 mb-2">Tanggal lahir: </label>
                  <input className="form-control mb-2" type="date" id="birthDate" required />
                  <div className="center">
                    <button className="button" type="submit"><b>Daftar</b></button>
                  </div>
                  <div className="hr-sect"><b>ATAU</b></div>
                  <div>
                    <GoogleLogin
                      className="google-button"
                      clientId={clientId}
                      buttonText="Daftar dengan Google"
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy="single_host_origin"
                      isSignedIn
                    />
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

import '../styles/Register.scss';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import React from 'react';
import logo from '../assets/images/logo.png';

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

  return (
    <div className="register-body">
      <div className="register-card-body center mx-auto my-auto">
        <div className="cards-body row">
          <div className="logo d-sm-none d-md-block col-12 col-md-6 my-auto">
            <img alt="" className="img-fluid" src={logo} />
          </div>
          <div className="form center col-6 p-2">
            <div>
              <h1 className="header">
                <b>
                  Daftar
                </b>
              </h1>
              <form>
                <input className="form-control" type="text" id="email" placeholder="Email" />
                <input className="form-control" type="password" id="password" placeholder="Kata Sandi" />
                <input className="form-control" type="password" placeholder="Ulang Kata Sandi" />
                <input className="form-control" type="text" id="username" placeholder="Username" />
                <input className="form-control" type="text" id="fullName" placeholder="Nama lengkap" />
                <input className="form-control" type="text" id="gender" placeholder="Jenis kelamin" />
                <input className="form-control" type="tel" id="phone" placeholder="Nomor ponsel" />
                <label className="birth-date my-0 p-0">Tanggal lahir: </label>
                <input className="form-control" type="date" id="birthDate" />
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
  );
};

export default Register;

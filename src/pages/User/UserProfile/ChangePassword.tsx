import React, { FC, useState } from 'react';
import FormTextInput from '../../../components/Form/FormInput/FormTextInput';

const ChangePassword:FC<any> = () => {
  const [password, setPassword] = useState({
    new_password: '',
    repeat_new_password: '',
  });

  const handleChange = (e:any) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-review">
      <h3 className="title">Ganti Password</h3>
      <div className="">
        <FormTextInput
          value={password.new_password}
          label="Password Baru"
          name="new_password"
          handleInput={handleChange}
          handleButton={() => {}}
        />
      </div>
      <div className="" />
    </div>
  );
};

export default ChangePassword;

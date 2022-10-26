import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Users from '../../../api/users';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import './UserProfile.scss';
import InputUserProfile from './InputUserProfile';
import Button from '../../../components/Button/Button';

const UserProfile:FC<any> = () => {
  const axiosPrivate = useAxiosPrivate();
  const [profile, setProfile] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e:any) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const body = {
      ...profile,
    };
    await Users.UpdateProfile(axiosPrivate, body)
      .then(() => {
        toast.success('Profil berhasil diperbaharui');
      })
      .catch((err: any) => {
        toast.error(err.response?.data?.message);
      });
  };

  const findProfile = async () => {
    await Users.GetProfiles(axiosPrivate)
      .then((resp: any) => {
        const { data } = resp.data;
        setProfile(data);
      })
      .catch((err: any) => toast.error(err.response?.data?.message));
  };

  useEffect(() => {
    findProfile().then();
  }, []);

  return (
    <div className="profile__container">
      <form onSubmit={(e) => {
        e.preventDefault();
        setIsEdit(false);
        handleSubmit().then();
      }}
      >
        <div className="d-flex mx-auto">
          <img className="profile__image" src={profile.avatar_url} alt={profile.full_name} />
        </div>
        <div><InputUserProfile name="username" data={profile.username} handleChange={handleChange} isChangeable={isEdit} /></div>
        <div><InputUserProfile name="full_name" data={profile.full_name} handleChange={handleChange} isChangeable={isEdit} /></div>
        <div><InputUserProfile name="email" data={profile.email} handleChange={handleChange} isChangeable={isEdit} typeElement="email" /></div>
        <div>
          <p className="caption-input">gender</p>
          <select name="gender" className="form-control" onChange={handleChange} value={profile.gender} disabled={!isEdit}>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div><InputUserProfile name="birth_date" data={profile.birth_date} handleChange={handleChange} isChangeable={isEdit} typeElement="date" /></div>
        <div className="d-flex justify-content-end mt-4">
          {!isEdit && <Button buttonType="secondary alt" handleClickedButton={() => setIsEdit(true)} text="Edit" /> }
          {isEdit && <Button buttonType="secondary" handleClickedButton={() => {}} isSubmit text="Simpan" />}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;

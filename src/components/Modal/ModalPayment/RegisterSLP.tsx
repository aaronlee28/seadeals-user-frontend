import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../Button/Button';
import useAuth from '../../../hooks/useAuth';

interface Props {
  selectSLP: (SLPAccount:any)=>void,
}

const RegisterSLP:FC<Props> = ({ selectSLP }) => {
  const { auth } = useAuth();
  const [accName, setAccName] = useState<string>('');
  const [accNumber, setAccNumber] = useState<string>('');
  const [hasNewAcc, setHasNewAcc] = useState<boolean>(false);

  const setNewAccount = () => {
    if (hasNewAcc) { setHasNewAcc(false); selectSLP(''); return; }

    if (accNumber.length !== 16) {
      toast.error('Nomor Akun harus memiliki panjang 16 digit!');
      return;
    }

    const newSLP = {
      user_id: auth?.user?.user_id,
      account_number: accNumber,
      name: accName,
    };

    setHasNewAcc(true);
    selectSLP(newSLP);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') { setAccNumber(''); return; }

    const valInt = parseInt(e.target.value, 10);
    if (Number.isNaN(valInt)) return;

    setAccNumber(`${valInt}`);
  };

  return (
    <div>
      <div className="w-50 fs-4 mx-auto">
        <input
          disabled={hasNewAcc}
          className="form-control mb-2"
          placeholder="Nama Akun Baru"
          value={accName}
          onChange={(e) => setAccName(e.target.value)}
        />
        <input
          disabled={hasNewAcc}
          className="form-control"
          placeholder="Nomor Akun"
          value={accNumber}
          maxLength={16}
          onChange={handleChangeInput}
        />
        <Button
          text={`${hasNewAcc ? 'Edit' : 'Gunakan'}`}
          buttonType={`primary w-100 mt-3 ${hasNewAcc && 'alt'}`}
          handleClickedButton={() => setNewAccount()}
        />
      </div>
    </div>
  );
};

export default RegisterSLP;

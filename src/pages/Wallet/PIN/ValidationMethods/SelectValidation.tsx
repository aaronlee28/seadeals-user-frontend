import React, { FC } from 'react';
import mailIcon from '../../../../assets/svg/icon_mail_2.svg';
import pwIcon from '../../../../assets/svg/icon_pw.svg';
import CHANGE_PIN from '../../../../constants/changePINActions';
import WalletPINButton from '../WalletPINButton';

const SelectValidation:FC<any> = ({ setMethod }) => (
  <>
    <p>Pilih opsi atur ulang PIN wallet</p>
    <div className="py-3">
      <WalletPINButton
        title="Change PIN with Password"
        icon={pwIcon}
        handleClick={() => setMethod(CHANGE_PIN.WITH_PW)}
      />
    </div>
    <div>
      <WalletPINButton
        title="Change PIN with Email"
        icon={mailIcon}
        handleClick={() => setMethod(CHANGE_PIN.WITH_EMAIL)}
      />
    </div>
  </>
);

export default SelectValidation;

import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import InputPINField from '../../PIN/InputPINField';
import Button from '../../../../components/Button/Button';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { generateCheckoutPayload } from '../../../../utils/CartCheckoutHelper';
import PAYMENT_TYPE, { WALLET_BLOCKED } from '../../../../constants/payment';

const PINDefault = new Array(6).fill('');

interface WalletIframeProps {
  orderItems: any[],
  address: any
  closeModal: ()=>void,
}

const WalletIframe:FC<WalletIframeProps> = ({ orderItems, address, closeModal }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [PIN, setPIN] = useState<string[]>(PINDefault);
  const [isPINComplete, setIsPINComplete] = useState(false);

  useEffect(() => {
    if (PIN.join('').length === 6) {
      setIsPINComplete(true);
      return;
    }

    if (isPINComplete) { setIsPINComplete(false); }
  }, [PIN]);

  const payWithWallet = async () => {
    const pinValue = PIN.join('');
    if (pinValue.length < 6) {
      toast.error('PIN is incomplete!');
      return;
    }

    try {
      const response = await axiosPrivate.post(
        'user/validator/wallet-pin',
        JSON.stringify({ pin: pinValue }),
      );

      const { data } = response.data;

      const payload = generateCheckoutPayload(
        orderItems,
        PAYMENT_TYPE.WALLET,
        '',
        '',
        parseInt(address.city_id, 10),
      );
      console.log(payload);

      const config = {
        headers: { Authorization: `Bearer ${data.id_token}` },
      };
      toast.loading('Requesting Payment');
      const paymentRes = await axiosPrivate.post(
        'checkout-cart',
        JSON.stringify(payload),
        config,
      );
      const { status } = paymentRes.data.data;
      toast.dismiss();
      toast.success('Transaction Paid Successfully!');
      closeModal();

      navigate(`/transactions/${status.transaction_id}`);
    } catch (err:any) {
      const { message } = err.response.data;
      toast.dismiss();
      toast.error(message);
      if (message === WALLET_BLOCKED) {
        closeModal();
      }
      setPIN(PINDefault);
    }
  };

  return (
    <div className="text-center h-100 d-flex flex-column justify-content-between">
      <div className="text-center border-bottom py-2 px-2">
        <p className="fs-5 fw-bold">Bayar dengan Wallet</p>
      </div>
      <div className="set-pin-box py-3">
        <p className="mb-3">Masukkan 6 digit PIN Wallet Anda</p>
        <InputPINField PIN={PIN} setPIN={setPIN} />
        <a href="/wallet/settings"><p className="mt-1 mb-3">Lupa PIN?</p></a>
      </div>
      <div className="pb-4 w-50 mx-auto">
        <Button
          text="Bayar"
          buttonType={`${isPINComplete ? 'primary' : 'disabled'} mx-auto w-75`}
          handleClickedButton={() => payWithWallet()}
        />
      </div>
    </div>
  );
};

export default WalletIframe;

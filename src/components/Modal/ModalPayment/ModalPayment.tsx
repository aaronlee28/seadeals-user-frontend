import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../Modal';
import PaymentMethodCard from './PaymentMethodCard';
import slpIcon from '../../../assets/svg/slp.svg';
import seadealsIcon from '../../../assets/png/seadeals.png';
import PAYMENT_TYPE from '../../../constants/payment';
import SLPIframeFull from '../../../pages/Wallet/Iframe/SLPIframeFull';
import WalletIframe from '../../../pages/Wallet/Iframe/WalletIframe';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
// import isWalletPINSet from '../../../utils/isWalletPINSet';
// import WalletIframe from '../../../pages/Wallet/Iframe/WalletIframe';

type ModalPaymentProps = {
  handleCloseModal: () => void;
};

const ModalPayment = (props: ModalPaymentProps) => {
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getWalletInfo = async () => {
      try {
        const response = await axiosPrivate.get('user/wallet/status', {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          console.log(data);
        }
      } catch (err) {
        toast.error('Failed to Fetch User Wallet Info');
      }
    };
    getWalletInfo();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const {
    handleCloseModal,
  } = props;

  const [selectedMethod, setSelectedMethod] = useState('');

  const renderPaymentMethod = () => {
    switch (selectedMethod) {
      case PAYMENT_TYPE.SLP:
        return <SLPIframeFull />;
      case PAYMENT_TYPE.WALLET:
        return <WalletIframe />;
      default:
        return (
          <div className="h-100 d-flex align-items-center">
            <p className="mx-auto fs-5 text-secondary">Select a Payment Method</p>
          </div>
        );
    }
  };

  const children = () => (
    <div className="w-100 p-4">
      <div className="d-flex justify-content-between p-3 px-4 border-bottom-dashed">
        <p className="fw-bold fs-5">Total Pembayaran</p>
        <p className="text-accent fw-bold fs-5">Rp21.000</p>
      </div>
      <p className="p-3 px-4">Pilih Metode Pembayaran</p>
      <div className="p-3 pt-0 px-4 d-flex gap-3 align-items-center">
        <PaymentMethodCard
          isActive={selectedMethod === PAYMENT_TYPE.WALLET}
          icon={seadealsIcon}
          title="SeaDeals Wallet"
          desc="Rp 123.456.789"
          handleClick={() => setSelectedMethod(PAYMENT_TYPE.WALLET)}
        />
        <PaymentMethodCard
          isActive={selectedMethod === PAYMENT_TYPE.SLP}
          icon={slpIcon}
          title="SeaLabs Pay"
          desc="1234 5678 9810 1112"
          handleClick={() => setSelectedMethod(PAYMENT_TYPE.SLP)}
        />
      </div>
      <div className="px-4">
        <div className="border rounded payment_iframe_window">
          {renderPaymentMethod()}
        </div>
      </div>
    </div>
  );

  return (
    <Modal cancel={handleCloseModal}>
      {children()}
    </Modal>
  );
};

export default ModalPayment;

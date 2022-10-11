import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../Button/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import SelectSLP from './SelectSLP';
import RegisterSLP from './RegisterSLP';
import { generateCheckoutPayload } from '../../../utils/CartCheckoutHelper';
import PAYMENT_TYPE from '../../../constants/payment';
import SLPIframeFull from '../../../pages/Wallet/Iframe/checkout/SLPIframeFull';

interface PayWithSLPProps {
  orderItems: any[],
  address: any,
  closeModal: ()=>void,
}

const PayWithSLP:FC<PayWithSLPProps> = ({ orderItems, address, closeModal }) => {
  const axiosPrivate = useAxiosPrivate();
  const [selectedSLP, setSelectedSLP] = useState<any>(null);
  const [SLPAccounts, setSLPAccounts] = useState<any[]>([]);
  const [isSelecting, setIsSelecting] = useState(true);
  const [paymentLink, setPaymentLink] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSLPAccounts = async () => {
      try {
        const response = await axiosPrivate.get(
          'user/sea-labs-pay',
          {
            signal: controller.signal,
          },
        );
        let { data } = response.data;
        data = data.sort((x:any) => (x.is_main ? -1 : 0));
        // check juga kalo empty
        if (isMounted) {
          setSelectedSLP(data[0]);
          setSLPAccounts(data);
        }
      } catch (err) {
        toast.error('failed to fetch SLP Accounts');
      }
    };
    getSLPAccounts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const selectSLP = (id:number) => {
    const newSelected = SLPAccounts.find((account) => account.id === id);
    const newList = [newSelected, ...SLPAccounts.filter((account) => account.id !== id)];
    setSelectedSLP(newSelected);
    setSLPAccounts(newList);
  };

  const handleContinue = async () => {
    if (!selectedSLP) return;

    try {
      if (!selectedSLP.id) {
        toast.loading('Registering Account');
        await axiosPrivate.post('user/sea-labs-pay/register', JSON.stringify(selectedSLP));
        toast.dismiss();
        toast.success('Account Registered!');
      }

      const payload = generateCheckoutPayload(
        orderItems,
        PAYMENT_TYPE.SLP,
        '',
        selectedSLP.account_number,
        parseInt(address.city_id, 10),
      );
      console.log(payload);

      toast.loading('Requesting Payment');
      const checkoutRes = await axiosPrivate.post(
        'order/pay/sea-labs-pay',
        JSON.stringify(payload),
      );
      toast.dismiss();

      const { data } = checkoutRes.data;
      setPaymentLink(data.redirect_url);
    } catch (err:any) {
      toast.dismiss();
      const { message } = err.response.data;
      toast.error(message);
    }
  };

  const handleOption = () => {
    setIsSelecting((prevState) => !prevState);
    setSelectedSLP(null);
  };

  return (
    paymentLink ? <SLPIframeFull url={paymentLink} closeModal={closeModal} />
      : (
        <div className="p-2 d-flex flex-column justify-content-between h-100">
          <div>
            <div className="d-flex justify-content-end mb-3">
              <Button
                buttonType="plain p-2 border"
                text={`${isSelecting ? 'Register New Account' : 'Select an Account'}`}
                handleClickedButton={handleOption}
              />
            </div>
            {isSelecting
              ? (
                <>
                  <p className="fs-5 text-center mb-3">Select SeaLabs Pay Account</p>
                  <SelectSLP
                    selectedID={selectedSLP?.id || 0}
                    SLPAccounts={SLPAccounts}
                    selectSLP={selectSLP}
                  />
                </>
              )
              : (
                <>
                  <p className="fs-5 text-center mb-3">Register SeaLabs Pay Account</p>
                  <RegisterSLP selectSLP={setSelectedSLP} />
                </>
              )}
          </div>
          <div className="py-2">
            <Button buttonType={`${selectedSLP ? 'primary' : 'disabled'} mx-auto`} handleClickedButton={() => handleContinue()} text="Bayar dengan SeaLabs Pay" />
          </div>
        </div>
      )
  );
};

export default PayWithSLP;

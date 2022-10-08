import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../Button/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import SelectSLP from './SelectSLP';
import RegisterSLP from './RegisterSLP';

const PayWithSLP = () => {
  const axiosPrivate = useAxiosPrivate();
  const [selectedSLP, setSelectedSLP] = useState<any>(null);
  const [SLPAccounts, setSLPAccounts] = useState<any[]>([]);
  const [isSelecting, setIsSelecting] = useState(true);

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

  const handleContinue = () => {
    if (!selectedSLP) return;
    console.log('asd');
  };

  const handleOption = () => {
    setIsSelecting((prevState) => !prevState);
    setSelectedSLP(null);
  };

  return (
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
  );
};

export default PayWithSLP;

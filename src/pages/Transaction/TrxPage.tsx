import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const TrxPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [trxDetails, setTrxDetails] = useState({});
  const { trxID } = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTrxDetail = async () => {
      try {
        const response = await axiosPrivate.get(`transactions/${trxID}`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setTrxDetails(data);
        }
      } catch (err) {
        toast.error('Failed to Fetch User Wallet Info');
      }
    };
    getTrxDetail();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <p>{JSON.stringify(trxDetails)}</p>
    </div>
  );
};

export default TrxPage;

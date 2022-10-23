import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import ReceiptDocument, { Receipt } from '../../../components/PDF/Receipt/ReceiptDocument';
import useAxiosPrivateWithoutNavigate from '../../../hooks/useAxiosPrivateWithoutNavigate';
import toast from 'react-hot-toast';

const UserOrder = () => {
  const { id } = useParams();

  const [data, setData] = useState<Receipt>({
    buyer: { address: '', bought_date: '', name: '' },
    courier: { name: '', service: '' },
    order_detail: {
      delivery_price: 0,
      order_items: [],
      shop_voucher: { amount: 0, name: '', total_reduce: 0, type: '' },
      total: 0,
      total_order: 0,
      total_quantity: 0,
    },
    payment_method: '',
    seller_name: '',
    transaction: {
      global_discount: [{ amount: 0, name: '', seller_name: '', total_reduced: 0, type: '' }],
      order_payments: [],
      total: 0,
      total_transaction: 0,
    },
  });
  const [receiptLoading, setReceiptLoading] = useState<boolean>(true);

  const axiosPrivate = useAxiosPrivateWithoutNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getReceipt = async () => {
      try {
        const response = await axiosPrivate.get(`user/orders/receipt/${id}`, {
          signal: controller.signal,
        });
        const result = response.data;
        if (isMounted) {
          setReceiptLoading(false);
          setData(result.data);
        }
      } catch (err) {
        toast.error('Gagal Memuat Receipt Order');
      }
    };
    getReceipt().then();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (receiptLoading) return <div>Loading...</div>;

  return (
    <div className="d-flex my-4 col-8">
      <PDFDownloadLink document={<ReceiptDocument data={data}/> } fileName="receipt.pdf">
          {({ loading }) =>
            (loading || receiptLoading) ? 'Loading...' : 'Donwload'
          }
      </PDFDownloadLink>
    </div>
  );
};

export default UserOrder;

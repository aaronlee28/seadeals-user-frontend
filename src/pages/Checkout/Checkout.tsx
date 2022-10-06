import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { calculateSubtotal, groupBySeller } from '../../utils/CartCheckoutHelper';
import CardCheckout from '../../components/Cards/CardCheckout/CardCheckout';
import CheckoutAddress from './CheckoutAddress';
import CheckoutVoucher from './CheckoutVoucher';
import './Checkout.scss';
import CheckoutSummary from './CheckoutSummary';

const Checkout = () => {
  const axiosPrivate = useAxiosPrivate();
  const [sellerProducts, setSellerProducts] = useState([]);
  const [selectedAddr, setSelectedAddr] = useState<any>({});
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCartItems = async () => {
      try {
        const response = await axiosPrivate.get(
          '/user/cart',
          {
            signal: controller.signal,
          },
        );
        const { data } = response.data;
        if (isMounted) {
          setSellerProducts((groupBySeller(data.cart_items)));
          setSubtotal(calculateSubtotal(data.cart_items));
        }
      } catch (err) {
        toast.error('failed to fetch checkout data');
      }
    };
    getCartItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="w-75 mx-auto">
      <div className="px-4 mx-auto mt-3">
        <CheckoutAddress selectedAddr={selectedAddr} setSelectedAddr={setSelectedAddr} />
        {sellerProducts.map((sellerProduct:any) => (
          <CardCheckout key={sellerProduct.storeID} data={sellerProduct} />
        ))}
        <CheckoutVoucher />
        <CheckoutSummary subtotal={subtotal} deliveryTotal={0} />
      </div>
    </div>
  );
};

export default Checkout;

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import groupBySeller from '../../utils/groupBySeller';
import CardCheckout from '../../components/Cards/CardCheckout/CardCheckout';

const Checkout = () => {
  const axiosPrivate = useAxiosPrivate();
  const [sellerProducts, setSellerProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTopProducts = async () => {
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
        }
      } catch (err) {
        toast.error('failed to fetch checkout data');
      }
    };
    getTopProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="w-75 mx-auto">
      <div className="px-4 mx-auto mt-3">
        <div className="p-2 bg-white mb-3">
          {/* <p className="fs-5">Alamat Pengiriman</p> */}
        </div>
        {sellerProducts.map((sellerProduct:any) => (
          <CardCheckout key={sellerProduct.storeID} data={sellerProduct} />
        ))}

      </div>
    </div>
  );
};

export default Checkout;

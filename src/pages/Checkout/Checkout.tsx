import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {
  calculateSubtotal,
  groupBySeller, orderIsIncomplete,
  parseCartItemsToPayload,
  setCourierOptionToStore,
} from '../../utils/CartCheckoutHelper';
import CardCheckout from '../../components/Cards/CardCheckout/CardCheckout';
import CheckoutAddress from './CheckoutAddress';
import CheckoutVoucher from './CheckoutVoucher';
import './Checkout.scss';
import CheckoutSummary from './CheckoutSummary';
import ModalPayment from '../../components/Modal/ModalPayment/ModalPayment';

const Checkout = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { checkedIDs } = useSelector((store:any) => store.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sellerProducts, setSellerProducts] = useState([]);
  const [cartPerStore, setCartPerStore] = useState<any[]>([]);
  const [selectedAddr, setSelectedAddr] = useState<any>({});

  const [subtotal, setSubtotal] = useState(0);
  const [deliveryTotal] = useState(0);

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

        if (data.cart_items.length === 0) {
          toast.error('Anda belum memasukkan barang di keranjang!');
          navigate('/cart');
          return;
        }

        if (isMounted) {
          const cartItems = data.cart_items.filter((item:any) => checkedIDs.includes(item.id));
          const groupedBySeller = groupBySeller(cartItems);

          if (cartItems.length === 0) {
            toast.error('Anda belum memilih barang!');
            navigate('/cart');
            return;
          }

          setSellerProducts(groupedBySeller);
          setCartPerStore(parseCartItemsToPayload(groupedBySeller));
          setSubtotal(calculateSubtotal(cartItems));
        }
      } catch (err:any) {
        toast.error('Gagal memuat data pesanan');
      }
    };
    getCartItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const hasSelectedAddr = () => !!selectedAddr.id;

  const handleClickOrder = () => {
    if (!hasSelectedAddr()) {
      toast.error('Anda perlu menyimpan Alamat Kirim');
      return;
    }
    if (orderIsIncomplete(cartPerStore)) {
      toast.error('Anda perlu memilih Jasa Kurir');
      return;
    }
    if (sellerProducts.length === 0) return;

    setIsModalOpen(true);
  };

  const updateOrderDelivery = (courierID:number, sellerID:number) => {
    const newCartPerStore = setCourierOptionToStore(courierID, sellerID, cartPerStore);
    setCartPerStore(newCartPerStore);
  };

  useEffect(() => {
    console.log(cartPerStore);
  }, [cartPerStore]);

  return (
    <>
      {isModalOpen
          && (
          <ModalPayment
              // masukin vouchers juga
            isOpen={isModalOpen}
            orderItems={cartPerStore}
            handleCloseModal={() => setIsModalOpen(false)}
            total={subtotal + deliveryTotal}
            address={selectedAddr}
          />
          )}
      <div className="w-75 mx-auto">
        <div className="px-4 mx-auto mt-3">
          <CheckoutAddress selectedAddr={selectedAddr} setSelectedAddr={setSelectedAddr} />
          {sellerProducts.map((sellerProduct:any) => (
            <CardCheckout
              key={sellerProduct.storeID}
              data={sellerProduct}
              updateDelivery={updateOrderDelivery}
            />
          ))}
          <CheckoutVoucher />
          <CheckoutSummary
            subtotal={subtotal}
            deliveryTotal={deliveryTotal}
            handleClick={() => handleClickOrder()}
            hasAddress={hasSelectedAddr()}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;

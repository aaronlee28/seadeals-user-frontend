import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { formatPriceWithCurrency } from '../../../utils/product';
import CardOrderHistoryItem from './CardOrderHistoryItem';

import './CardOrderHistory.scss';
import Button from '../../Button/Button';
import Orders from '../../../api/orders';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ModalReview from '../../Modal/ModalReview/ModalReview';
import Carts from '../../../api/carts';
import { checkCartBuyNow } from '../../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

type CardOrderHistoryProps = {
  data: {
    orderId: number,
    storeName: string,
    status: string,
    reviewed: boolean,
    updatedAt: string,
    totalPricePromotion: number,
    totalPriceBase: number,
    storeItems: any[],
  },
  handleReview: () => void,
};

const CardOrderHistory = (props: CardOrderHistoryProps) => {
  const dispatch = useDispatch();
  const {
    data,
  } = props;
  const {
    orderId,
    storeName,
    status,
    reviewed,
    updatedAt,
    totalPricePromotion,
    totalPriceBase,
    storeItems,
  } = data;

  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const finishOrder = async () => {
    const val = {
      order_id: orderId,
    };
    await Orders.PostFinishOrder(axiosPrivate, val)
      .then(() => {
        setRefresh(!refresh);
        toast.success('Berhasil menerima barang');
      })
      .catch(() => {
        toast.error('Gagal menerima barang');
      });
  };

  const moveToDone = () => {
    finishOrder().then();
  };

  const moveToComplaint = () => {
    console.log('Complaint');
  };

  const addToCart = async () => {
    for (let i = 0; i < storeItems.length; i += 1) {
      const val = {
        product_variant_detail_id: storeItems[i].variantId,
        quantity: 1,
      };
      await Carts.PostCartItem(axiosPrivate, val)
        .then((res:any) => {
          toast.success('Barang berhasil dimasukkan ke keranjang');
          const cartID = res?.data?.data?.id;
          if (cartID) dispatch(checkCartBuyNow(res.data.data.id));
          navigate('/cart');
        })
        .catch(() => {
          toast.error('Barang gagal dimasukkan ke keranjang');
        });
    }
  };

  const goToCart = () => {
    addToCart().then();
  };

  const openModalReview = () => {
    setIsModalReviewOpen(true);
  };

  const closeModalReview = () => {
    setRefresh(!refresh);
    setTimeout(() => {
      setIsModalReviewOpen(false);
    }, 500);
  };

  return (
    <div className="card-order-history_container">
      <div className="card-order-history_content">
        <div className="top_content">
          <p className="name">{ storeName }</p>
          <div className="status_content">
            <p className="status">{ status }</p>
            <p className="update">{ updatedAt }</p>
          </div>
        </div>
        <div className="center_content">
          {
            storeItems?.map(
              (item: any) => (
                <CardOrderHistoryItem
                  key={`${item.id}-${item.name}`}
                  data={item}
                />
              ),
            )
          }
        </div>
        <div className="bottom_content">
          <div className="delivery">
            {
              status === 'Menunggu Pembayaran'
              && (
                <p className="text">Silahkan bayar terlebih dahulu</p>
              )
            }
            {
              status === 'Dikemas'
              && (
                <p className="text">Sedang dikemas oleh penjual</p>
              )
            }
            {
              status === 'Dikirim'
              && (
                <p className="text">Sedang dalam pengiriman</p>
              )
            }
            {
              status === 'Diterima'
              && (
                <div className="buttons">
                  <Button
                    buttonType="secondary"
                    text="Terima"
                    handleClickedButton={moveToDone}
                  />
                  <Button
                    buttonType="secondary alt"
                    text="Komplain"
                    handleClickedButton={moveToComplaint}
                  />
                </div>
              )
            }
            {
              status === 'Dikomplain'
              && (
                <p className="text">Menunggu persetujuan penjual</p>
              )
            }
            {
              status === 'Dibatalkan'
              && (
                <p className="text">Barang telah dibatalkan</p>
              )
            }
            {
              status === 'Selesai'
              && (
                <div className="buttons">
                  {
                    !reviewed
                    && (
                      <Button
                        buttonType="secondary"
                        text="Review"
                        handleClickedButton={openModalReview}
                      />
                    )
                  }
                  <Button
                    buttonType="secondary alt"
                    text="Beli Lagi"
                    handleClickedButton={goToCart}
                  />
                </div>
              )
            }
          </div>
          <div className="price">
            {
              totalPriceBase !== totalPricePromotion
              && (
                <p className="base">{ formatPriceWithCurrency(totalPriceBase) }</p>
              )
            }
            <p className="total-price">{ formatPriceWithCurrency(totalPricePromotion) }</p>
          </div>
        </div>
      </div>
      {
        isModalReviewOpen
        && (
          <ModalReview
            data={data}
            title="APA"
            formType="INI"
            isOpen={isModalReviewOpen}
            handleInput={() => console.log('Input')}
            handleDelete={() => console.log('Input')}
            handleCloseModal={closeModalReview}
          />
        )
      }
    </div>
  );
};

export default CardOrderHistory;
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { formatPriceWithCurrency } from '../../../utils/product';
import CardOrderHistoryItem from './CardOrderHistoryItem';

import './CardOrderHistory.scss';
import Button from '../../Button/Button';
import Orders from '../../../api/orders';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ModalReview from '../../Modal/ModalReview/ModalReview';

type CardOrderHistoryProps = {
  data: {
    orderId: number,
    storeId: number,
    storeName: string,
    status: string,
    updatedAt: string,
    totalPricePromotion: number,
    totalPriceBase: number,
    storeItems: any[],
  },
  handleReview: () => void,
};

const CardOrderHistory = (props: CardOrderHistoryProps) => {
  const {
    data,
    // handleReview,
  } = props;
  const {
    orderId,
    // storeId,
    storeName,
    status,
    updatedAt,
    totalPricePromotion,
    totalPriceBase,
    storeItems,
  } = data;

  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const axiosPrivate = useAxiosPrivate();

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
    console.log('Done');
    finishOrder().then();
  };

  const moveToComplaint = () => {
    console.log('Complaint');
  };

  // const goToReview = () => {
  //   console.log('Review');
  //   handleReview();
  // };

  const addToCart = () => {
    console.log('Add To Cart');
  };

  const openModalReview = () => {
    setIsModalReviewOpen(true);
  };

  const closeModalReview = () => {
    setTimeout(() => {
      setIsModalReviewOpen(false);
    }, 500);
  };

  console.log(status);

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
          <div className="price">
            {
              totalPriceBase !== totalPricePromotion
              && (
                <p className="base">{ formatPriceWithCurrency(totalPriceBase) }</p>
              )
            }
            <p className="total-price">{ formatPriceWithCurrency(totalPricePromotion) }</p>
          </div>
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
                  <Button
                    buttonType="secondary"
                    text="Review"
                    handleClickedButton={openModalReview}
                  />
                  <Button
                    buttonType="secondary alt"
                    text="Beli Lagi"
                    handleClickedButton={addToCart}
                  />
                </div>
              )
            }
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

import React, { useState } from 'react';
import './CardCheckout.scss';
import { Link } from 'react-router-dom';
import CardCheckoutItem from './CardCheckoutItem';
import Button from '../../Button/Button';
import SelectVoucher from '../../../pages/Checkout/Modal/SelectVoucher';
import SelectCourier from '../../../pages/Checkout/Modal/SelectCourier';
import formatTitle from '../../../utils/titleFormatter';

type CardCheckoutProps = {
  data: {
    storeID: number;
    storeName: string;
    storeItems: any[];
  },
  updateDelivery: (courierID:number, sellerID:number) => void,
};

const CardCheckout = (props: CardCheckoutProps) => {
  const {
    data, updateDelivery,
  } = props;

  const {
    storeID,
    storeName,
    storeItems,
  } = data;

  const [showVoucher, setShowVoucher] = useState(false);
  const [showCouriers, setShowCouriers] = useState(false);

  const [, setVoucher] = useState('');
  const [courier, setCourier] = useState<any>(null);

  const handleChangeCourier = (courierData:any) => {
    setCourier(courierData);
    updateDelivery(courierData.id, storeID);
  };

  return (
    <div className="card_cart_container mb-3">
      {showVoucher && (
      <SelectVoucher
        show={showVoucher}
        setShow={setShowVoucher}
        setVoucher={setVoucher}
      />
      )}
      {showCouriers && (
      <SelectCourier
        sellerID={storeID}
        show={showCouriers}
        setShow={setShowCouriers}
        selectedID={courier?.id || 0}
        setCourier={handleChangeCourier}
      />
      )}
      <div className="card_cart_content">
        <div className="header">
          <div className="header_name">
            <div className="normal-link">
              <Link to={`/toko/${storeID}`}>
                <p className="name">{ storeName }</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="items_content">
          {storeItems.map(
            (item) => (
              <CardCheckoutItem
                key={`${item.id}-${item.name}`}
                data={item}
              />
            ),
          )}
        </div>
        <div className="store_options items_content border-top-dashed d-flex justify-content-between align-items-center">
          <p>Opsi Pengiriman:</p>
          <div className="row w-75 align-items-center">
            <p className="fw-bold col-6 text-center">{courier ? formatTitle(courier.name) : 'Belum Ada Kurir'}</p>
            <div className="col-2 d-flex justify-content-center">
              <Button text="Ubah" buttonType="plain w-auto p-2 text-secondary-blue" handleClickedButton={() => setShowCouriers(true)} />
            </div>
            <p className="col-4 text-end">Rp 0</p>
          </div>
        </div>
        <div className="store_options items_content border-top-dashed d-flex justify-content-between align-items-center">
          <p>Voucher Toko:</p>
          <div className="row w-75 align-items-center">
            <div className="fw-bold col-6 text-center d-flex gap-2">
              <input className="border p-1 w-75" />
              <Button buttonType="primary p-2" handleClickedButton={() => {}} text="Gunakan" />
            </div>
            <div className="col-2 d-flex justify-content-center">
              <Button text="Pilih" buttonType="plain w-auto p-2 text-secondary-blue" handleClickedButton={() => setShowVoucher(true)} />
            </div>
            <p className="ms-auto col-3 text-end">Rp 0</p>
          </div>
        </div>
        <div className="store_options items_content border-top-dashed d-flex justify-content-end gap-5">
          <p>Total Pesanan:</p>
          <div className="">
            <p className="fw-bold">Rp 123.456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCheckout;

import React, { FC } from 'react';
import Button from '../../components/Button/Button';
import { formatPrice } from '../../utils/product';

interface Props {
  subtotal: number,
  deliveryTotal: number,
  handleClick: ()=>void
  hasAddress: boolean
}

const CheckoutSummary:FC<Props> = ({
  subtotal = 0, deliveryTotal = 0, handleClick, hasAddress,
}) => (
  <div className="bg-white shadow-sm mb-3">
    <div className="p-4 border-bottom-dashed border-top text-secondary">
      <div className="row justify-content-end py-1">
        <p className="col-3">Subtotal untuk Produk</p>
        <p className="col-2 text-end">
          Rp
          {formatPrice(subtotal)}
        </p>
      </div>
      <div className="row justify-content-end py-1">
        <p className="col-3">Total Ongkos Kirim:</p>
        <p className="col-2 text-end">
          Rp
          {formatPrice(deliveryTotal)}
        </p>
      </div>
      <div className="row justify-content-end py-1">
        <p className="col-3">Total Pembayaran:</p>
        <p className="col-2 text-end">
          Rp
          {formatPrice(subtotal + deliveryTotal)}
        </p>
      </div>
    </div>
    <div className="p-4 d-flex justify-content-end bg-light">
      <Button
        buttonType={`secondary ${!hasAddress && 'disabled'}`}
        text="Buat Pesanan"
        handleClickedButton={handleClick}
      />
    </div>
  </div>
);

export default CheckoutSummary;

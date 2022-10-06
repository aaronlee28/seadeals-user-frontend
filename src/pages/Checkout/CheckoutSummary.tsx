import React, { FC } from 'react';
import Button from '../../components/Button/Button';
import { formatPrice } from '../../utils/product';

const CheckoutSummary:FC<any> = ({ subtotal = 0, deliveryTotal = 0 }) => (
  <div className="bg-white shadow-sm mb-3">
    <div className="p-4 border-bottom-dashed border-top text-secondary">
      <div className="row justify-content-end py-1">
        <p className="col-3">Subtotal untuk Produk</p>
        <p className="col-2 text-end">{formatPrice(subtotal)}</p>
      </div>
      <div className="row justify-content-end py-1">
        <p className="col-3">Total Ongkos Kirim:</p>
        <p className="col-2 text-end">{formatPrice(deliveryTotal)}</p>
      </div>
      <div className="row justify-content-end py-1">
        <p className="col-3">Total Pembayaran:</p>
        <p className="col-2 text-end">{formatPrice(subtotal + deliveryTotal)}</p>
      </div>
    </div>
    <div className="p-4 d-flex justify-content-end bg-light">
      <Button buttonType="secondary" text="Buat Pesanan" handleClickedButton={() => console.log()} />
    </div>
  </div>
);

export default CheckoutSummary;

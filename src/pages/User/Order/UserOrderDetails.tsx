import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import shopIcon from '../../../assets/svg/shop.svg';
import UserOrderItems from './UserOrderItems';
import UserOrderSummary from './UserOrderSummary';
import { Receipt } from '../../../constants/orderItem';
import UserOrderReceiptDownload from './UserOrderReceiptDownload';

interface Props {
  order: any,
  receipt: Receipt
}

const UserOrderDetails:FC<Props> = ({ order, receipt }) => (
  <div className="py-3 w-100 p-4 bg-white shadow-sm">
    <div className="normal-link border-bottom py-2">
      <Link to={`/toko/${order?.seller_id}`}>
        <div className="d-flex gap-2">
          <img src={shopIcon} alt="Nama Toko" height="20px" />
          <span className="fw-bold">{order?.seller?.name}</span>
        </div>
      </Link>
    </div>
    <div>
      <UserOrderItems orderItems={order?.order_items || []} />
    </div>
    <UserOrderSummary order={order} />
    <UserOrderReceiptDownload data={receipt} />
  </div>
);

export default UserOrderDetails;

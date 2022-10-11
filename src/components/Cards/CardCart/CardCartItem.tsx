import React from 'react';
import { ReactComponent as IconCheck } from '../../../assets/svg/icon_check.svg';
import { ReactComponent as IconDelete } from '../../../assets/svg/icon_delete.svg';
import { formatPriceWithCurrency } from '../../../utils/product';
import Form from '../../Form/Form';

type CardCartItemProps = {
  data: {
    id: number;
    name: string;
    imgUrl: string;
    price: number;
    amount: number;
    isChecked: boolean;
  };
  storeId: number;
  handleChecked: (storeId: number, id: number) => void;
  handleDelete: (storeId: number, id: number) => void;
  handleAmount: (storeId: number, id: number, amount: number) => void;
};

const CardCartItem = (props: CardCartItemProps) => {
  const {
    data,
    storeId,
    handleChecked,
    handleDelete,
    handleAmount,
  } = props;

  const {
    id,
    name,
    imgUrl,
    price,
    amount,
    isChecked,
  } = data;

  const amountItems = [
    {
      inputType: 'number',
      name: 'amount',
      label: 'Jumlah',
    },
  ];

  const handleInput = (event: any) => {
    handleAmount(storeId, id, event.target.value);
  };

  return (
    <div className="card_cart_item_container">
      <div className="card_cart_item_content">
        <div
          className={`checkbox ${isChecked ? 'checked' : ''}`}
          onClick={() => handleChecked(storeId, id)}
          role="presentation"
        >
          {
            React.createElement(IconCheck, { className: 'icon_checked' })
          }
        </div>
        <div className="first_content">
          <img
            className="image"
            src={imgUrl}
            alt={name}
          />
          <div className="description">
            <p className="name">{name}</p>
          </div>
        </div>
        <div className="second_content">
          <p className="title">Harga Satuan:</p>
          <p className="price">{ formatPriceWithCurrency(price) }</p>
        </div>
        <div className="third_content">
          <p className="title">Jumlah:</p>
          <div className="amount">
            <Form
              formType="amount-item-cart"
              items={amountItems}
              values={{ amount }}
              handleInput={handleInput}
            />
          </div>
        </div>
        <div className="fourth_content">
          <p className="title">Total Harga:</p>
          <p className="total_price">{ formatPriceWithCurrency(price * amount) }</p>
        </div>
        <div
          className="fifth_content"
          onClick={() => handleDelete(storeId, id)}
          role="presentation"
        >
          {
            React.createElement(IconDelete, { className: 'icon_delete' })
          }
        </div>
      </div>
    </div>
  );
};

export default CardCartItem;

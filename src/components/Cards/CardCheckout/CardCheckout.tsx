import React from 'react';
import './CardCheckout.scss';
import { Link } from 'react-router-dom';
import CardCheckoutItem from './CardCheckoutItem';

type CardCheckoutProps = {
  data: {
    storeID: number;
    storeName: string;
    storeItems: any[];
  };
};

const CardCheckout = (props: CardCheckoutProps) => {
  const {
    data,
  } = props;

  const {
    storeID,
    storeName,
    storeItems,
  } = data;

  return (
    <div className="card_cart_container mb-3">
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
          {
            storeItems.map(
              (item) => (
                <CardCheckoutItem
                  key={`${item.id}-${item.name}`}
                  data={item}
                />
              ),
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CardCheckout;

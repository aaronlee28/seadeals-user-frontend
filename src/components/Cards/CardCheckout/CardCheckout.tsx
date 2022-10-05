import React from 'react';
import './CardCheckout.scss';
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
            {/* <p className="name">{ storeName }</p> */}
            <p className="name">{ `toko dengan id: ${storeID} (storename gaada di dtonya) ${storeName}` }</p>
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

import React from 'react';
import Promotion from '../../Promotion/Promotion';
import { formatPrice, formatPriceWithCurrency } from '../../../utils/product';
import './CardOrderHistory.scss';

type CardOrderHistoryItemProps = {
  data: {
    id: number,
    imgUrl: string,
    name: string,
    slug: string,
    priceBase: number,
    pricePromotion: number,
    promotion: number,
    variant: string,
    quantity: number,
  },
};

const CardOrderHistoryItem = (props: CardOrderHistoryItemProps) => {
  const { data } = props;
  const {
    // id,
    imgUrl,
    name,
    // slug,
    priceBase,
    pricePromotion,
    promotion,
    variant,
    quantity,
  } = data;

  return (
    <div className="card-order-history-item_container">
      <div className="card-order-history-item_content">
        <div className="left_content">
          <img
            className="image"
            src={imgUrl}
            alt={name}
          />
          <div className="name_content">
            {
              promotion
              && (
                <Promotion
                  promotionType="orange"
                  text={`${formatPrice(promotion)} OFF`}
                />
              )
            }
            <p className="name">{ name }</p>
            {
              variant !== ''
              && (
                <p className="variant">
                  { variant }
                </p>
              )
            }
            <p className="quantity">
              x
              { quantity }
            </p>
          </div>
        </div>
        <div className="right_content">
          <div className="price">
            {
              priceBase !== pricePromotion
              && (
                <p className="base">{ formatPriceWithCurrency(priceBase * quantity) }</p>
              )
            }
            <p className="total-price">{ formatPriceWithCurrency(pricePromotion * quantity) }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOrderHistoryItem;

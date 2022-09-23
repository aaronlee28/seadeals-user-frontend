import React from 'react';

import { formatSoldCount, formatPrice } from '../../../utils/product';

import './CardProductList.scss';

type CardProductListProps = {
  data: {
    media_url: string;
    product_name: string;
    slug: string;
    price: string;
    rating: number;
    bought: number;
    min_price: number;
    max_price: number;
  }
};

const CardProductList = (props: CardProductListProps) => {
  const { data } = props;
  const name = data.product_name;
  const mediaUrl = data.media_url;
  const minPrice = data.min_price;
  const maxPrice = data.max_price;
  const {
    slug,
    rating,
    bought,
  } = data;

  return (
    <div className="card_product_list_container">
      <div className="card_product_list_content">
        <img
          className="image"
          src={mediaUrl}
          alt={slug}
        />
        <div className="name_content">
          <p className="name">{ name }</p>
        </div>
        <div className="center_content">...</div>
        <div className="price_container">
          <div className="price_content">
            <p className="currency">Rp</p>
            <p className="price">{ formatPrice(minPrice) }</p>
          </div>
          {
            minPrice !== maxPrice
            && (
              <div className="price_content">
                <p className="connector">&nbsp;-&nbsp;</p>
                <p className="currency">Rp</p>
                <p className="price">{ formatPrice(maxPrice) }</p>
              </div>
            )
          }
        </div>
        <div className="bottom_content">
          <div className="rating">{ rating }</div>
          <p className="sold_count">{ formatSoldCount(bought) }</p>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;

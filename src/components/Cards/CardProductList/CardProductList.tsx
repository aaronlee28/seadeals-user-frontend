import React from 'react';

import formatSoldCount from '../../../utils/product';

type CardProductListProps = {
  data: {
    imgUrl: string;
    name: string;
    price: string;
    rating: number;
    soldCount: number;
  }
};

const CardProductList = (props: CardProductListProps) => {
  const { data } = props;
  const {
    imgUrl,
    name,
    price,
    rating,
    soldCount,
  } = data;

  return (
    <div className="card_product_list_container">
      <div className="card_product_list_content">
        <img
          className="image"
          src={imgUrl}
          alt={name}
        />
        <p className="name">{ name }</p>
        <div className="center_content">...</div>
        <div className="price_content">
          <p className="currency">Rp</p>
          <p className="price">{ price }</p>
        </div>
        <div className="bottom_content">
          <div className="rating">{ rating }</div>
          <p className="sold_count">{ formatSoldCount(soldCount) }</p>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;

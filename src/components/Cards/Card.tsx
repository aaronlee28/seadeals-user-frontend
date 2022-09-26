import React from 'react';

import CardCategory from './CardCategory/CardCategory';
import CardProductList from './CardProductList/CardProductList';

type CardProps = {
  data: any;
  cardType: string;
};

const Card = (props: CardProps) => {
  const {
    data,
    cardType,
  } = props;

  return (
    <div>
      {
        cardType === 'category'
        && (
          <CardCategory data={data} />
        )
      }
      {
        cardType === 'product-list'
        && (
          <CardProductList data={data} />
        )
      }
    </div>
  );
};

export default Card;

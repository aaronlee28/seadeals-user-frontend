import React from 'react';

import { ReactComponent as IconHeart } from '../../../assets/svg/icon_heart.svg';

import './ProductFavorite.scss';
import { formatFavorite } from '../../../utils/product';

type ProductFavoriteProps = {
  isFavorite: any;
  favorite: number,
  handleClicked: () => void;
};

const ProductFavorite = (props: ProductFavoriteProps) => {
  const {
    isFavorite,
    favorite,
    handleClicked,
  } = props;

  return (
    <div className="product_favorite_container">
      <div
        className="product_favorite_content"
        onClick={handleClicked}
        role="presentation"
      >
        {
          React.createElement(IconHeart, {
            className: `icon_heart ${isFavorite ? 'fav' : 'not-fav'}`,
          })
        }
        <p className="text">
          Favorit (
          { formatFavorite(favorite) }
          )
        </p>
      </div>
    </div>
  );
};

export default ProductFavorite;

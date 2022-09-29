import React from 'react';
import { ReactComponent as IconCheck } from '../../../assets/svg/icon_check.svg';

import './CardCart.scss';

type CardCartAllProps = {
  isAllProductsChecked: boolean;
  handleCheckedAllProducts: () => void;
};

const CardCartAll = (props: CardCartAllProps) => {
  const {
    isAllProductsChecked,
    handleCheckedAllProducts,
  } = props;

  return (
    <div className="card_cart_container">
      <div className="card_cart_content">
        <div className="header">
          <div
            className={`checkbox ${isAllProductsChecked ? 'checked' : ''}`}
            onClick={() => handleCheckedAllProducts()}
            role="presentation"
          >
            {
              React.createElement(IconCheck, { className: 'icon_checked' })
            }
          </div>
          <div className="header_name">
            <p className="name">Semua Produk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCartAll;

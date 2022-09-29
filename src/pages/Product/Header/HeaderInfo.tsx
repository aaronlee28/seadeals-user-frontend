import React, { FC } from 'react';
import titleFormatter from '../../../utils/titleFormatter';

const HeaderInfo:FC<any> = ({ product }) => (
  <>
    <div>
      <h2 className="fw-bold">{titleFormatter(product?.name)}</h2>
      <small className="text-secondary fs-6">{product?.product_detail?.sku}</small>
    </div>
    <div className="product__header__price py-3">
      <h2 className="fw-bold text-main">Rp123.456,00</h2>
    </div>
  </>
);

export default HeaderInfo;

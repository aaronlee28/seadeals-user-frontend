import React, { FC } from 'react';
import ProductMedia from './Media/ProductMedia';
import ProductShare from './Share/ProductShare';
import HeaderInfo from './Header/HeaderInfo';

const ProductHeader:FC<any> = ({ product }) => (
  <div className="bg-white p-3 rounded shadow-sm mb-3">
    <div className="row">
      <div className="col-12 col-lg-5 mb-4">
        <ProductMedia />
      </div>
      <div className="col-12 col-lg-7">
        <HeaderInfo product={product} />
      </div>
    </div>
    <ProductShare url={window.location.href} />
  </div>
);

export default ProductHeader;

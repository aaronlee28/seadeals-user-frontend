import React, { FC } from 'react';
import ProductMedia from './Media/ProductMedia';
import ProductShare from './Share/ProductShare';
import HeaderInfo from './Header/HeaderInfo';

const ProductHeader:FC<any> = ({ product }) => (
  <div className="product_header_container">
    <div className="product_header_content">
      <div className="left_content">
        <ProductMedia photos={product?.product.product_photos} />
        <ProductShare url={window.location.href} />
      </div>
      <div className="right_content">
        <HeaderInfo data={product} />
      </div>
    </div>
  </div>
);

export default ProductHeader;

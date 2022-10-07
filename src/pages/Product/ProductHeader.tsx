import React, { useEffect, useState } from 'react';
import ProductMedia from './Media/ProductMedia';
import ProductShare from './Share/ProductShare';
import HeaderInfo from './Header/HeaderInfo';

type ProductHeaderProps = {
  product: any,
};

const ProductHeader = (props: ProductHeaderProps) => {
  const {
    product,
  } = props;

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setPhotos(product.product.product_photos);
  }, [product]);

  return (
    <div className="product_header_container">
      <div className="product_header_content">
        <div className="left_content">
          <ProductMedia photos={photos} />
          <ProductShare url={window.location.href} />
        </div>
        <div className="right_content">
          <HeaderInfo data={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;

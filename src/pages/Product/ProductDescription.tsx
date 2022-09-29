import React, { FC } from 'react';
import ProductDescriptionItem from './Description/ProductDescriptionItem';

const ProductDescription:FC<any> = ({ description }) => (
  <div className="fs-6 bg-white shadow-sm p-3 rounded">
    <p className="p-3 bg-light fw-bold mb-0 fs-5">Description</p>
    <div className="p-3 py-4">
      <p className="mb-3">{description?.description}</p>
    </div>
    <p className="p-3 bg-light fw-bold mb-0 fs-5">Ukuran</p>
    <div className="p-3 py-4">
      <ProductDescriptionItem column="Tinggi" value={description?.height} />
      <ProductDescriptionItem column="Panjang" value={description?.length} />
      <ProductDescriptionItem column="Lebar" value={description?.width} />
    </div>
  </div>
);

export default ProductDescription;

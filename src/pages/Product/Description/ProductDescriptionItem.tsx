import React, { FC } from 'react';

const ProductDescriptionItem:FC<any> = ({ column, value }) => (
  <div className="row fs-6">
    <p className="col-2 text-secondary mb-3">{column}</p>
    <p className="col-9">{value}</p>
  </div>
);

export default ProductDescriptionItem;

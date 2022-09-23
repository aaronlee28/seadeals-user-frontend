import React, { FC } from 'react';
import Card from '../Cards/Card';

const ProductListCenter:FC<any> = ({ products }) => (
  <div className="container px-1">
    <div className="d-flex justify-content-start gap-4">
      {products.map((product: any) => {
        const prod = {
          imgUrl: product.product.picture_url,
          name: product.product.name,
          price: product.product.price,
          rating: Math.floor(product.product.rating),
          soldCount: product.product.totalSold,
        };
        return <div key={product.product.id} className="col-auto mb-3"><Card data={prod} cardType="product-list" /></div>;
      })}
    </div>
  </div>
);

export default ProductListCenter;

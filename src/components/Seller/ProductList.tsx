import React, { FC } from 'react';
import Card from '../Cards/Card';

interface ProductListProps {
  products: any
}

const ProductList: FC<ProductListProps> = ({ products }) => (
  <div className="container px-1">
    <div className="row py-3">
      {products.map((product: any) => {
        const prod = {
          imgUrl: product.product.media_url,
          name: product.product.name,
          price: product.product.price,
          rating: Math.floor(product.product.rating),
          soldCount: product.product.total_sold,
        };
        return <div key={product.product.id} className="col-auto px-2 mb-3"><Card data={prod} cardType="product-list" /></div>;
      })}
    </div>
  </div>
);

export default ProductList;

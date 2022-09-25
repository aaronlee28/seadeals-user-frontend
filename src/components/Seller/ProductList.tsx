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
          media_url: product.product.media_url,
          product_name: product.product.name,
          slug: product.product.slug,
          price: product.product.price,
          rating: Math.floor(product.product.rating),
          bought: product.product.total_sold,
          min_price: product.min_price,
          max_price: product.max_price,
        };
        return <div key={product.product.id} className="col-auto px-2 mb-3"><Card data={prod} cardType="product-list" /></div>;
      })}
    </div>
  </div>
);

export default ProductList;

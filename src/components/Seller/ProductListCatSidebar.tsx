import React from 'react';
import ProductListCatSelect from './ProductListCatSelect';

const ProductListCatSidebar = () => (
  <div className="col-md-2 col-12 px-0">
    <div className="bg-white p-4 shadow-sm rounder mb-3 text-start">
      <h5 className="fw-bold mb-3">Kategori</h5>
      <ProductListCatSelect active title="Semua Produk" />
      <ProductListCatSelect title="Keperluan Packing" />
    </div>
  </div>
);

export default ProductListCatSidebar;

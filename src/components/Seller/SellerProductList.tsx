import React, { FC } from 'react';
import ProductListSortBar from './ProductListSortBar';
import ProductListCatSelect from './ProductListCatSelect';
import Pagination from '../Pagination/Pagination';
import MiniPagination from '../Pagination/MiniPagination';

const SellerProductList: FC<any> = ({
  order, option,
}) => (
  <div className="container">
    <div className="row">
      <div className="col-md-2 col-12 bg-white p-4 shadow-sm rounder mb-3">
        <div className="text-start">
          <h5 className="fw-bold mb-3">Kategori</h5>
          <ProductListCatSelect active title="Semua Produk" />
          <ProductListCatSelect title="Keperluan Packing" />
        </div>
      </div>
      <div className="col-md-10 col-12 px-sm-0 ps-md-3">
        <div className="d-flex justify-content-between bg-white p-4 py-3 rounder shadow-sm">
          <ProductListSortBar
            activeOrder={order.sortOrder}
            setOrder={order.setSortOrder}
            activeOpt={option.sortOption}
            setOpt={option.setSortOption}
          />
          <div className="d-flex mb-0 align-items-center">
            <MiniPagination />
          </div>
        </div>
      </div>
    </div>
    <Pagination numbers={5} />
  </div>
);

export default SellerProductList;

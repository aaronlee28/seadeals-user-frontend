import React, { FC } from 'react';
import Pagination from '../Pagination/Pagination';
import MiniPagination from '../Pagination/MiniPagination';
import ProductListCatSidebar from './ProductListCatSidebar';
import ProductList from './ProductList';
import ProductListSortBar from './ProductListSortBar';

const SellerProductList: FC<any> = ({
  order, option, products, setParam, activeTab,
}) => (
  <div className="container">
    <div className="row">
      <ProductListCatSidebar />
      <div className="col-md-10 col-12 px-sm-0 ps-md-3">
        <div className="d-flex justify-content-between bg-white p-4 py-3 rounder shadow-sm">
          <ProductListSortBar
            setOption={option.setSortOption}
            setOrder={order.setSortOrder}
            setParam={setParam}
            activeTab={activeTab}
          />
          {/* <ProductListSortBarV3 */}
          {/*  activeOrder={order.sortOrder} */}
          {/*  setOrder={order.setSortOrder} */}
          {/*  activeOpt={option.sortOption} */}
          {/*  setOpt={option.setSortOption} */}
          {/* /> */}
          <div className="d-flex mb-0 align-items-center">
            <MiniPagination />
          </div>
        </div>
        <ProductList products={products} />
      </div>
    </div>
    <Pagination numbers={5} />
  </div>
);

export default SellerProductList;

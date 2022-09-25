import React, { FC } from 'react';
import Pagination from '../Pagination/Pagination';
import MiniPagination from '../Pagination/MiniPagination';
import ProductListCatSidebar from './ProductListCatSidebar';
import ProductList from './ProductList';
import ProductListSortBar from './ProductListSortBar';

const SellerProductList: FC<any> = ({
  order, option, products, setParam, sortSelect, innerRef,
  page, setPage, totalPage, categories, categoryState, minPriceState, maxPriceState,
}) => (
  <div className="container" ref={innerRef}>
    <div className="row">
      <ProductListCatSidebar
        categories={categories}
        categoryState={categoryState}
        setParam={setParam}
        minPriceState={minPriceState}
        maxPriceState={maxPriceState}
      />
      <div className="col-md-10 col-12 px-sm-0 ps-md-3">
        <div className="d-flex justify-content-between bg-white p-4 py-3 rounder shadow-sm">
          <ProductListSortBar
            setOption={option.setSortOption}
            setOrder={order.setSortOrder}
            setParam={setParam}
            sortSelect={sortSelect}
          />
          <div className="d-flex mb-0 align-items-center">
            <MiniPagination page={page === '' ? 1 : page} setPage={setPage} totalPage={totalPage} />
          </div>
        </div>
        <ProductList products={products} />
        <Pagination page={page === '' ? 1 : page} totalPage={totalPage} setPage={setPage} innerRef={innerRef} />
      </div>
    </div>
  </div>
);

export default SellerProductList;

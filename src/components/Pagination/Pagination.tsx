import React, { FC } from 'react';
import PaginationItem from './PaginationItem';
import './Pagination.css';

interface PaginationProps {
  totalPage: number
  page: number
  setPage: any
}

const Pagination: FC<PaginationProps> = ({ totalPage, page, setPage }) => (
  <div className="pt-3">
    <div className="d-flex gap-2 justify-content-center">
      <PaginationItem pageNumber="&#171;" setPage={() => setPage(1)} />
      {Array(totalPage).fill(0).map((el, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <PaginationItem active={page === i + 1} key={i} pageNumber={`${i + 1}`} setPage={() => setPage(i + 1)} />
      ))}
      <PaginationItem pageNumber="&#187;" setPage={() => setPage(totalPage)} />
    </div>
  </div>

);

export default Pagination;

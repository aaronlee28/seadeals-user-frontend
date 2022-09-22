import React, { FC } from 'react';
import PaginationItem from './PaginationItem';
import './Pagination.css';

interface PaginationProps {
  numbers: number
}

const Pagination: FC<PaginationProps> = ({ numbers }) => (
  <div className="">
    <div className="d-flex gap-2">
      {Array(numbers).fill(0).map((el, i) => <PaginationItem pageNumber={`${i + 1}`} />)}
    </div>
  </div>

);

export default Pagination;

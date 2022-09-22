import React, { FC } from 'react';

interface PaginationItemProp {
  pageNumber: string,
}

const PaginationItem: FC<PaginationItemProp> = ({ pageNumber }) => (
  <button type="button" className="p-1 px-2 fs-5 pagination__item border">
    {pageNumber}
  </button>
);

export default PaginationItem;

import React, { FC } from 'react';

interface CategorySelect {
  active?:boolean
  title:string
}

const ProductListCatSelect:FC<CategorySelect> = ({ active, title }) => (
  <button
    type="button"
    className={`p-2 ${active ? 'bg-backdrop fw-bold' : ''} mb-1 w-100 text-start`}
  >
    {title}
  </button>
);
ProductListCatSelect.defaultProps = { active: false };

export default ProductListCatSelect;

import React, { FC } from 'react';

const MainMedia:FC<any> = ({ imgUrl }) => (
  <div className="border rounded w-100 p-2 product__media__main">
    <img src={imgUrl} alt="product" />
  </div>
);

export default MainMedia;

import React, { FC } from 'react';

const MainMedia:FC<any> = ({ img }) => (
  <div className="border rounded product__media__main">
    <img
      src={img.photo_url}
      alt={img.name}
    />
  </div>
);

export default MainMedia;

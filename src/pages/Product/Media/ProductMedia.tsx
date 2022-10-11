import React, { FC, useEffect, useState } from 'react';
import MainMedia from './MainMedia';

import './ProductMedia.scss';

const ProductMedia:FC<any> = ({ photos }) => {
  const [mainImage, setMainImage] = useState({
    id: 0,
    photo_url: '',
    name: '',
  });

  useEffect(() => {
    if (photos.length > 0) {
      setMainImage(photos[0]);
    }
  }, [photos]);

  return (
    <div className="product__media">
      <MainMedia img={mainImage} />
      <div className="d-flex product__media__carousel gap-3">
        {
          photos.length > 0
          && photos.map(
            (photo:any) => (
              <div
                key={photo.id}
                className={`carousel__thumb ${
                  mainImage.id === photo.id
                    ? 'active'
                    : ''
                }`}
                onMouseOver={() => setMainImage(photo)}
                onFocus={() => setMainImage(photo)}
                role="presentation"
              >
                <img src={photo?.photo_url} alt="product" />
              </div>
            ),
          )
        }
      </div>
    </div>
  );
};
export default ProductMedia;

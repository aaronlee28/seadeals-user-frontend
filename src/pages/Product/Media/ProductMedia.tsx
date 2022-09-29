import React, { FC } from 'react';
import MainMedia from './MainMedia';

// const [mainImage] = useState('');
const ProductMedia:FC<any> = ({ photos }) => {
  console.log(photos);
  return (
    <div className="product__media">
      <MainMedia imgUrl="https://loremflickr.com/472/472" />
      <div className="d-flex product__media__carousel gap-3">
        {
          photos?.map((photo:any) => (
            <div key={photo.id} className="carousel__thumb">
              <img src={photo?.photo_url} alt="product" />
            </div>
          ))
        }
      </div>
    </div>
  );
};
export default ProductMedia;

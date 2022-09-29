import React, { FC } from 'react';
import MainMedia from './MainMedia';

// const [mainImage] = useState('');
const ProductMedia:FC<any> = () => (
  <div className="product__media">
    <MainMedia imgUrl="https://loremflickr.com/472/472" />
    <div className="d-flex product__media__carousel">
      <div className="col-2 carousel__thumb">
        <img src="https://loremflickr.com/320/320" alt="product" />
      </div>
      <div className="col-2 carousel__thumb">
        <img src="https://loremflickr.com/320/320" alt="product" />
      </div>
      <div className="col-2 carousel__thumb">
        <img src="https://loremflickr.com/320/320" alt="product" />
      </div>
      <div className="col-2 carousel__thumb">
        <img src="https://loremflickr.com/320/320" alt="product" />
      </div>
      <div className="col-2 carousel__thumb">
        <img src="https://loremflickr.com/320/320" alt="product" />
      </div>
      <div className="col-2 carousel__thumb">
        <img src="https://loremflickr.com/320/320" alt="product" />
      </div>
      <div className="col-2 carousel__thumb">
        <img src="https://loremflickr.com/320/320" alt="product" />
      </div>
    </div>
  </div>
);
export default ProductMedia;

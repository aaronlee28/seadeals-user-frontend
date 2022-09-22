import React from 'react';
import location_icon from '../../assets/svg/icon_location.svg';
import share_icon from '../../assets/svg/icon_share.svg';
import SellerInfo from './SellerInfo';
import joined_icon from '../../assets/svg/icon_joined.svg';
import rating_icon from '../../assets/svg/icon_rating.svg';
import products_icon from '../../assets/svg/icon_product.svg';
import followers_icon from '../../assets/svg/icon_followers.svg';

const SellerHeader = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-4 col-12">
        <div className="row gap-1 text-start p-2 justify-content-center">
          <div className="col-auto d-flex justify-content-start px-0">
            <div className="seller-avatar">
              <img alt="shop name" className="img-fluid rounded-circle" src="https://loremflickr.com/320/320" />
            </div>
          </div>
          <div className="col-auto">
            <div className="mb-2 text-xl-start text-center">
              <p className="fw-bold fs-5">Shop Name</p>
              <img alt="" src={location_icon} />
              <small>Kota Tangerang Selatan</small>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn border px-4 py-0">
                <small className="fw-bold">Follow</small>
              </button>
              <button type="button" className="btn border px-3 py-0 d-flex justify-content-center align-items-center gap-1">
                <img alt="" src={share_icon} />
                <small className="fw-bold">Share</small>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8 col-12">
        <div className="p-2 row justify-content-center">
          <SellerInfo icon={joined_icon} info="Join:" desc="Sep 2022" />
          <SellerInfo icon={rating_icon} info="Rating:" desc="4.8" />
          <SellerInfo icon={products_icon} info="Produk:" desc="78" />
          <SellerInfo icon={followers_icon} info="Followers:" desc="52" />
        </div>
      </div>
    </div>
  </div>
);

export default SellerHeader;

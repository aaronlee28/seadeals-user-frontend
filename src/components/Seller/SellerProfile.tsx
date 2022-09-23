import React, { FC } from 'react';
import location_icon from '../../assets/svg/icon_location.svg';
import share_icon from '../../assets/svg/icon_share.svg';

const SellerProfile: FC<any> = ({ profile }) => (
  <div className="row gap-1 text-start p-2 justify-content-center">
    <div className="col-auto d-flex justify-content-start px-0">
      <div className="seller-avatar">
        <img alt="shop name" className="img-fluid rounded-circle" src={profile.imgUrl} />
      </div>
    </div>
    <div className="col-auto">
      <div className="mb-2 text-xl-start text-center">
        <p className="fw-bold fs-5">{profile.name}</p>
        <img alt="" src={location_icon} />
        <small>{profile.city}</small>
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
);

export default SellerProfile;

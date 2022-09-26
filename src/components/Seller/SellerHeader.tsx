import React, { FC } from 'react';
import SellerInfoItem from './SellerInfoItem';
import joined_icon from '../../assets/svg/icon_joined.svg';
import rating_icon from '../../assets/svg/icon_rating.svg';
import products_icon from '../../assets/svg/icon_product.svg';
import followers_icon from '../../assets/svg/icon_followers.svg';
import SellerProfile from './SellerProfile';
import SellerProfileLazy from './SellerProfileLazy';

interface SellerInfo {
  loading: boolean
  sellerInfo: SellerHeaderProps
}

type SellerHeaderProps = {
  name: string
  imgUrl: string,
  followers: string
  joinDate: string
  rating: string
  reviewer: string
  city: string,
};

const SellerHeader: FC<SellerInfo> = ({ loading, sellerInfo }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-4 col-12">
        {
          loading
            ? <SellerProfileLazy />
            : <SellerProfile profile={sellerInfo} />
        }
      </div>
      <div className="col-md-8 col-12">
        <div className="p-2 row justify-content-center">
          <SellerInfoItem icon={joined_icon} info="Join:" desc={sellerInfo.joinDate} />
          <SellerInfoItem icon={rating_icon} info="Rating:" desc={`${sellerInfo.rating} (${sellerInfo.reviewer} Penilaian)`} />
          <SellerInfoItem icon={products_icon} info="Produk:" desc="78" />
          <SellerInfoItem icon={followers_icon} info="Followers:" desc={sellerInfo.followers} />
        </div>
      </div>
    </div>
  </div>
);

export default SellerHeader;

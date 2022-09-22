import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SellerPage.css';
import axios from '../../api/axios';
import SellerHeader from '../../components/Seller/SellerHeader';

const SellerPage = () => {
  const [sellerInfo, setSellerInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { slug } = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSellerInfo = async () => {
      try {
        const response = await axios.get(`sellers?slug=${slug}`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          const info = {
            name: data.name,
            imgUrl: data.profile_url,
            followers: data.followers,
            joinDate: data.join_date,
            rating: data.rating,
            reviewer: data.total_reviewer,
            city: data.address.city,
          };
          setSellerInfo(info);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getSellerInfo();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="p-2 py-5">
      <SellerHeader loading={loading} sellerInfo={sellerInfo} />
    </div>
  );
};

export default SellerPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SellerPage.css';
import axios from '../../api/axios';
import SellerHeader from '../../components/Seller/SellerHeader';
import SellerProductList from '../../components/Seller/SellerProductList';
// import { validateSortOption, validateSortOrder } from '../../utils/sortValidator';

const SellerPage = () => {
  const { slug } = useParams();
  const [sellerInfo, setSellerInfo] = useState<any>({});
  const [loadingSellerInfo, setLoadingSellerInfo] = useState<boolean>(true);

  const [sortOption, setSortOption] = useState('price');
  const [sortOrder, setSortOrder] = useState('desc');

  // const [sellerProducts, setSellerProducts] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSellerInfo = async () => {
      try {
        const response = await axios.get(`sellers?slug=${slug}`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        // todo: save seller ID to fetch products
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
          setLoadingSellerInfo(false);
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

  useEffect(() => {
    // let isMounted = true;
    const controller = new AbortController();

    const getSellerProducts = async () => {
      // try {
      //   const sellerID = 1;
      //   const option = validateSortOption(sortOption);
      //   const order = validateSortOrder(sortOrder);
      //   const response = await axios.get(
      //   `sellers/${sellerID}/products?sort=${order}&sortBy=${option}`,
      //   {
      //     signal: controller.signal,
      //   });
      //   const { data } = response.data;
      //   if (isMounted) {
      //     console.log(data);
      //   }
      // } catch (err) {
      //   console.error(err);
      // }
    };
    getSellerProducts();

    return () => {
      // isMounted = false;
      controller.abort();
    };
  }, [sortOrder, sortOption]);

  return (
    <div className="p-2 py-5 bg-backdrop">
      <SellerHeader loading={loadingSellerInfo} sellerInfo={sellerInfo} />
      <SellerProductList
        option={{ sortOption, setSortOption }}
        order={{ sortOrder, setSortOrder }}
      />
    </div>
  );
};

export default SellerPage;

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './SellerPage.css';
import axios from '../../api/axios';
import SellerHeader from '../../components/Seller/SellerHeader';
import SellerProductList from '../../components/Seller/SellerProductList';
import { validateSortOption, validateSortOrder } from '../../utils/sortValidator';
import { getActiveTabName } from '../../utils/urlParamValidator';
import SellerTopProductList from '../../components/Seller/SellerTopProductList';

const SellerPage = () => {
  const allProductRef = useRef<null | HTMLDivElement>(null);
  const { slug } = useParams();
  const [searchParam, setSearchParam] = useSearchParams();
  const [sellerInfo, setSellerInfo] = useState<any>({});
  const [loadingSellerInfo, setLoadingSellerInfo] = useState<boolean>(true);

  const [sortOption, setSortOption] = useState(searchParam.get('orderBy') || '');
  const [sortOrder, setSortOrder] = useState(searchParam.get('sort') || '');
  const [activeTab, setActiveTab] = useState(getActiveTabName(sortOption, sortOrder));
  // const [filterCat, setFilterCat] = useState('');
  const [pageNum, setPageNum] = useState(1);

  const [sellerTopProducts, setSellerTopProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);

  useEffect(() => { // validate url params on render
    // const category = searchParam.get('categoryID');
    // const pageNumber =
    setActiveTab(getActiveTabName(sortOption, sortOrder));
  });

  useEffect(() => { // get seller info
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

  useEffect(() => { // get top 6 seller products
    let isMounted = true;
    const controller = new AbortController();

    const getTopProducts = async () => {
      try {
        const sellerID = 1;
        const response = await axios.get(
          `/products?sellerID=${sellerID}&limit=6&sort=&sortBy=`,
          {
            signal: controller.signal,
          },
        );
        const { data } = response.data;
        if (isMounted) {
          setSellerTopProducts(data.products);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getTopProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => { // get sort-able filter-able products
    let isMounted = true;
    const controller = new AbortController();

    const getSellerProducts = async () => {
      try {
        const sellerID = 1;
        const option = validateSortOption(sortOption);
        const order = validateSortOrder(sortOrder);
        const response = await axios.get(
          `/products?sellerID=${sellerID}&limit=20&sort=${order}&sortBy=${option}&categoryID=&page=${pageNum}`,
          {
            signal: controller.signal,
          },
        );
        const { data } = response.data;
        if (isMounted) {
          setSellerProducts(data.products);
          setPageNum(1);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getSellerProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [sortOrder, sortOption]);

  return (
    <div className="p-2 py-5 bg-backdrop">
      <SellerHeader loading={loadingSellerInfo} sellerInfo={sellerInfo} />
      <SellerTopProductList products={sellerTopProducts} clickToScroll={() => { allProductRef.current?.scrollIntoView({ behavior: 'smooth' }); }} />
      <SellerProductList
        option={{ sortOption, setSortOption }}
        order={{ sortOrder, setSortOrder }}
        products={sellerProducts}
        setParam={setSearchParam}
        activeTab={activeTab}
        innerRef={allProductRef}
      />
    </div>
  );
};

export default SellerPage;

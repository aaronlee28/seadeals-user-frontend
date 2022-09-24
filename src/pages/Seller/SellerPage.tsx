import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import { validateSortOption, validateSortOrder } from '../../utils/sortValidator';
import { getActiveTabName, validatePageNumber } from '../../utils/urlParamValidator';
import SellerProductList from '../../components/Seller/SellerProductList';
import SellerHeader from '../../components/Seller/SellerHeader';
import SellerTopProductList from '../../components/Seller/SellerTopProductList';
import './SellerPage.css';

const SellerPage = () => {
  const allProductRef = useRef<null | HTMLDivElement>(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();

  // fetched data
  const [sellerInfo, setSellerInfo] = useState<any>({});
  const [loadingSellerInfo, setLoadingSellerInfo] = useState<boolean>(true);
  const [sellerTopProducts, setSellerTopProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);

  // sort & filter
  const [sortOption, setSortOption] = useState(searchParam.get('orderBy') || '');
  const [sortOrder, setSortOrder] = useState(searchParam.get('sort') || '');
  const [selectedSorting, setSelectedSorting] = useState(getActiveTabName(sortOption, sortOrder));
  const [pageNum, setPageNum] = useState(validatePageNumber(searchParam.get('page')));
  const [totalPage, setTotalPage] = useState(1);

  // const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => { // validate url params on render
    // const category = searchParam.get('categoryID');
    // setSelectedSorting(getActiveTabName(sortOption, sortOrder));
  });

  useEffect(() => { // get seller info
    let isMounted = true;
    const controller = new AbortController();

    const getSellerInfo = async () => {
      try {
        const sellerID = slug?.split('.')[1];
        if (!sellerID || Number.isNaN(parseInt(sellerID, 10))) navigate('/404');

        const response = await axios.get(`sellers/${sellerID}`, {
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
        const sellerID = slug?.split('.')[1];
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
        const sellerID = slug?.split('.')[1];
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
          setTotalPage(data.total_page);
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
  }, [sortOrder, sortOption, pageNum, selectedSorting]);

  const changePage = (num:number) => {
    searchParam.set('page', `${num}`);
    setSearchParam(searchParam);
    setPageNum(num);
  };

  return (
    <div className="p-2 py-5 bg-backdrop">
      <SellerHeader loading={loadingSellerInfo} sellerInfo={sellerInfo} />
      <SellerTopProductList products={sellerTopProducts} clickToScroll={() => { allProductRef.current?.scrollIntoView({ behavior: 'smooth' }); }} />
      <SellerProductList
        option={{ sortOption, setSortOption }}
        order={{ sortOrder, setSortOrder }}
        sortSelect={{ selectedSorting, setSelectedSorting }}
        setParam={{ searchParam, setSearchParam }}
        page={pageNum}
        setPage={changePage}
        totalPage={totalPage}
        innerRef={allProductRef}
        products={sellerProducts}
      />
    </div>
  );
};

export default SellerPage;

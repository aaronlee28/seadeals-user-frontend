import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import './ProductPage.scss';
import ProductDescription from './ProductDescription';
import ProductHeader from './ProductHeader';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [, setLoadingProduct] = useState(true);

  // const [variantsLv1, setVariantsLv1] = useState([]);
  // const [variantsLv2, setVariantsLv2] = useState([]);
  // const [selectedVar1, setSelectedVar1] = useState(null);
  // const [selectedVar2, setSelectedVar2] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProductData = async () => {
      try {
        const response = await axios.get(`products/detail/${slug}`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          console.log(data);
          setProduct(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProduct(false);
      }
    };
    getProductData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="container py-5">
      <ProductHeader product={product} />
      <ProductDescription description={product?.product_detail} />
    </div>
  );
};

export default ProductPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.scss';
import ProductDescription from './ProductDescription';
import ProductHeader from './ProductHeader';
import Products from '../../api/products';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [, setLoadingProduct] = useState(true);

  // const [variantsLv1, setVariantsLv1] = useState([]);
  // const [variantsLv2, setVariantsLv2] = useState([]);
  // const [selectedVar1, setSelectedVar1] = useState(null);
  // const [selectedVar2, setSelectedVar2] = useState(null);

  // const [params, setParams] = useSearchParams();

  const getID = () => {
    console.log(slug);
    const splitSlug = slug?.split('.');
    return splitSlug ? splitSlug[splitSlug.length - 1] : '';
  };

  const getProduct = async () => {
    console.log(parseInt(getID(), 10));

    await Products.GetProductByID(parseInt(getID(), 10))
      .then((resp) => {
        setProduct(resp.data.data);
        console.log('ini', resp.data.data);
      })
      .catch((err) => err)
      .finally(() => {
        setLoadingProduct(false);
      });
  };

  useEffect(() => {
    getProduct().then();
  }, []);

  return (
    <div className="product_page_container">
      {
        product
        && (
          <div className="product_page_content">
            <ProductHeader product={product} />
            <ProductDescription description={product?.product_detail} />
          </div>
        )
      }
    </div>
  );
};

export default ProductPage;

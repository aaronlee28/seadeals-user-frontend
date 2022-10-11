import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.scss';
import ProductDetail from './ProductDetail';
import ProductHeader from './ProductHeader';
import Products from '../../api/products';
import PRODUCT_SPECIFICATION from '../../constants/product';
import useAuth from '../../hooks/useAuth';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>({});
  const [productDetail, setProductDetail] = useState<any>({
    description: '',
    specification: [],
  });
  const [productSeller, setProductSeller] = useState<any>({});
  const [, setLoadingProduct] = useState(true);
  const { auth } = useAuth();

  console.log(auth);

  const getID = () => {
    const splitSlug = slug?.split('.');
    return splitSlug ? splitSlug[splitSlug.length - 1] : '';
  };

  const setSpecificationItems = (prod: any, seller: any) => {
    const spec = [...PRODUCT_SPECIFICATION];

    spec[0].value = prod.product.category.name;
    spec[1].value = prod.product.product_detail.condition_status;
    spec[2].value = prod.product.product_detail.length;
    spec[3].value = prod.product.product_detail.width;
    spec[4].value = prod.product.product_detail.height;
    spec[5].value = prod.product.product_detail.weight;
    spec[6].value = prod.total_stock;
    spec[7].value = seller.address.city;

    return spec;
  };

  const getProduct = async () => {
    await Products.GetProductByID(parseInt(getID(), 10))
      .then((resp) => {
        const newProduct = resp.data.data.product_detail;
        const prodSeller = resp.data.data.seller;
        setProduct(newProduct);
        setProductSeller(prodSeller);
        const getDesc = newProduct.product.product_detail.description;
        const getSpec = setSpecificationItems(newProduct, prodSeller);
        setProductDetail({
          description: getDesc,
          specification: getSpec,
        });
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
        Object.keys(product).length > 0
        && (
          <div className="product_page_content">
            <ProductHeader product={product} />
            <ProductDetail
              description={productDetail.description}
              specification={productDetail.specification}
            />
          </div>
        )
      }
    </div>
  );
};

export default ProductPage;

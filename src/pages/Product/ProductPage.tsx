import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.scss';
import ProductDetail from './ProductDetail';
import ProductHeader from './ProductHeader';
import Products from '../../api/products';
import PRODUCT_SPECIFICATION from '../../constants/product';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>({});
  const [productDetail, setProductDetail] = useState<any>({
    description: '',
    specification: [],
  });
  const [, setLoadingProduct] = useState(true);

  // const [variantsLv1, setVariantsLv1] = useState([]);
  // const [variantsLv2, setVariantsLv2] = useState([]);
  // const [selectedVar1, setSelectedVar1] = useState(null);
  // const [selectedVar2, setSelectedVar2] = useState(null);

  // const [params, setParams] = useSearchParams();

  const getID = () => {
    const splitSlug = slug?.split('.');
    return splitSlug ? splitSlug[splitSlug.length - 1] : '';
  };

  const setSpecificationItems = (prod: any) => {
    const spec = [...PRODUCT_SPECIFICATION];

    spec[0].value = prod.product.category.name;
    spec[1].value = prod.product.product_detail.condition_status;
    spec[2].value = prod.product.product_detail.length;
    spec[3].value = prod.product.product_detail.width;
    spec[4].value = prod.product.product_detail.height;
    spec[5].value = prod.product.product_detail.weight;
    spec[6].value = prod.total_stock;
    spec[7].value = 'DARIMANA YA';

    // prod.product.seller.address

    return spec;
  };

  const getProduct = async () => {
    await Products.GetProductByID(parseInt(getID(), 10))
      .then((resp) => {
        const newProduct = resp.data.data.product_detail;
        setProduct(newProduct);
        const getDesc = newProduct.product.product_detail.description;
        const getSpec = setSpecificationItems(newProduct);
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

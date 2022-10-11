import React, { useEffect, useState } from 'react';

import Products from '../../../api/products';
import Card from '../../../components/Cards/Card';
// import Button from '../../../components/Button/Button';

type SimilarProductProps = {
  productId: number
};

const SimilarProduct = (props: SimilarProductProps) => {
  const {
    productId,
  } = props;

  const [similarProduct, setSimilarProduct] = useState([]);

  const getSimilarProducts = async () => {
    await Products.GetSimilarProducts(productId)
      .then((resp) => {
        setSimilarProduct(resp.data.data.products);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getSimilarProducts().then();
  }, []);

  return (
    <div className="similar_product_container">
      <div className="similar_product_content">
        <div className="header">
          <h3 className="title">PRODUK SERUPA</h3>
        </div>
        <div className="items">
          {
            similarProduct?.map(
              (item: any) => (
                <Card
                  key={`${item.product.id}-${item.product.name}`}
                  data={item}
                  cardType="product-list"
                />
              ),
            )
          }
        </div>
        {/* <Button */}
        {/*  buttonType="primary alt show_all" */}
        {/*  text="Lihat Semua" */}
        {/*  handleClickedButton={goToRecommendationPage} */}
        {/* /> */}
      </div>
    </div>
  );
};

export default SimilarProduct;

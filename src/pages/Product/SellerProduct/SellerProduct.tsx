import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Products from '../../../api/products';
import Card from '../../../components/Cards/Card';
import Button from '../../../components/Button/Button';
import { ReactComponent as IconChevronRight } from '../../../assets/svg/icon_chevron_right.svg';

type SellerProductProps = {
  sellerId: number,
  productId: number,
};

const SellerProduct = (props: SellerProductProps) => {
  const {
    sellerId,
    productId,
  } = props;

  const [sellerProduct, setSellerProduct] = useState([]);

  const navigate = useNavigate();

  const getSellerProduct = async () => {
    const filter = `?limit=12&sellerID=${sellerId}`;
    await Products.GetAllProducts(filter)
      .then((resp) => {
        const filtered = resp.data.data.products.filter(
          (el: any) => el.product.id !== productId,
        );
        setSellerProduct(filtered);
      })
      .catch((err) => err);
  };

  const goToSellerPage = () => {
    navigate(`/toko/${sellerId}`);
  };

  useEffect(() => {
    getSellerProduct().then();
  }, []);

  return (
    <div className="seller_product_container">
      <div className="seller_product_content">
        <div className="header">
          <h3 className="title">PRODUK LAIN DARI TOKO INI</h3>
          <Button
            buttonType="plain right"
            text="Lihat semua"
            iconUrl={IconChevronRight}
            iconName="all"
            handleClickedButton={goToSellerPage}
          />
        </div>
        <div className="items">
          {
            sellerProduct?.map(
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
      </div>
    </div>
  );
};

export default SellerProduct;

import React, { useEffect, useState } from 'react';
import { ReactComponent as IconStar } from '../../../assets/svg/icon_star.svg';
import titleFormatter from '../../../utils/titleFormatter';
import { formatPriceWithCurrency, formatSoldCount } from '../../../utils/product';
import Form from '../../../components/Form/Form';
import Button from '../../../components/Button/Button';
import { ReactComponent as IconAddToCart } from '../../../assets/svg/icon_add_to_cart.svg';

import './HeaderInfo.scss';

type HeaderInfoProps = {
  data: any,
};

const HeaderInfo = (props: HeaderInfoProps) => {
  const { data } = props;
  const { product } = data;

  const [amount, setAmount] = useState(1);
  const [variantDetail, setVariantDetail] = useState<any>([]);

  const amountItems = [
    {
      inputType: 'number',
      name: 'amount',
      label: 'Jumlah',
    },
  ];

  const handleAmount = (event: any) => {
    setAmount(event.target.value);
  };

  const addToCart = () => {
    console.log('ADD TO CART');
  };

  const buyNow = () => {
    console.log('BUY NOW');
  };

  useEffect(() => {
    setVariantDetail(product.product_variant_detail);
  }, [data]);

  return (
    <div className="header_info_container">
      {
        data
        && (
          <div className="header_info_content">
            <div className="info first_content">
              <h1 className="title">{ titleFormatter(product.name) }</h1>
            </div>
            <div className="info second_content">
              <div className="rating_content">
                {
                  React.createElement(IconStar, { className: 'star' })
                }
                <p className="rating">5</p>
              </div>
              <div className="sold_content">
                <p className="count">{ formatSoldCount(product.sold_count) }</p>
              </div>
            </div>
            <div className="info third_content">
              <h2 className="price">
                {
                  variantDetail.length > 0
                  && variantDetail[0].price
                    ? formatPriceWithCurrency(variantDetail[0].price)
                    : ''
                }
              </h2>
            </div>
            <div className="info fourth_content">
              <p className="variable">Variant</p>
              <p className="variant">...</p>
            </div>
            <div className="info fifth_content">
              <p className="variable">Kuantitas</p>
              <div className="amount">
                <Form
                  formType="amount-item-cart"
                  items={amountItems}
                  values={{ amount }}
                  handleInput={handleAmount}
                />
              </div>
              <div className="stock_content">
                <p className={`stock ${data.total_stock < 20 ? 'red' : ''}`}>
                  Tersisa&nbsp;
                  { data.total_stock }
                  &nbsp;Buah
                </p>
              </div>
            </div>
            <div className="info sixth_content">
              <Button
                buttonType="primary alt add_to_cart"
                text="Masukkan ke Keranjang"
                iconUrl={IconAddToCart}
                iconName="plus_cart"
                handleClickedButton={addToCart}
              />
              <Button
                buttonType="primary buy_now"
                text="Beli Sekarang"
                handleClickedButton={buyNow}
              />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default HeaderInfo;

import React, { useEffect, useState } from 'react';
import { ReactComponent as IconStar } from '../../../assets/svg/icon_star.svg';
import titleFormatter from '../../../utils/titleFormatter';
import { formatSoldCount, validatePrice } from '../../../utils/product';
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
  const minPrice = data.min_price;
  const maxPrice = data.max_price;

  const [amount, setAmount] = useState(1);
  const [variantDetail, setVariantDetail] = useState<any>([]);
  // const [pickedVariant, setPickedVariant] = useState({
  //   id: 0
  // })

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

  const splitProductVariant = (items: any[]) => {
    let variants: any[] = [];
    for (let i = 0; i < items.length; i += 1) {
      let isVariant1Exist = -1;
      let isVariant2Exist = -1;

      if (items[i].product_variant1) {
        isVariant1Exist = variants.findIndex(
          (el: any) => el.name === items[i].product_variant1.name,
        );
      }
      if (items[i].product_variant2) {
        isVariant2Exist = variants.findIndex(
          (el: any) => el.name === items[i].product_variant2.name,
        );
      }

      if (isVariant1Exist !== -1) {
        const isItemExist = variants[isVariant1Exist].items.find(
          (el: any) => el.value === items[i].variant1_value,
        );
        if (!isItemExist) {
          const newItem = {
            id: items[i].id,
            value: items[i].variant1_value,
          };
          variants[isVariant1Exist].items = [
            ...variants[isVariant1Exist].items,
            newItem,
          ];
        }
      }
      if (isVariant1Exist === -1 && items[i].product_variant1) {
        const newItem = {
          id: items[i].id,
          value: items[i].variant1_value,
        };
        const newVariant = {
          name: items[i].product_variant1.name,
          items: [newItem],
        };
        variants = [
          ...variants,
          newVariant,
        ];
      }

      if (isVariant2Exist !== -1) {
        const isItemExist = variants[isVariant2Exist].items.find(
          (el: any) => el.value === items[i].variant2_value,
        );
        if (!isItemExist) {
          const newItem = {
            id: items[i].id,
            value: items[i].variant2_value,
          };
          variants[isVariant2Exist].items = [
            ...variants[isVariant2Exist].items,
            newItem,
          ];
        }
      }
      if (isVariant2Exist === -1 && items[i].product_variant2) {
        const newItem = {
          id: items[i].id,
          value: items[i].variant2_value,
        };
        const newVariant = {
          name: items[i].product_variant2.name,
          items: [newItem],
        };
        variants = [
          ...variants,
          newVariant,
        ];
      }
    }
    console.log(variants);
    return variants;
  };

  const addToCart = () => {
    console.log('ADD TO CART');
  };

  const buyNow = () => {
    console.log('BUY NOW');
  };

  useEffect(() => {
    setVariantDetail(splitProductVariant(product.product_variant_detail));
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
                  validatePrice(minPrice, maxPrice)
                }
              </h2>
            </div>
            {
              variantDetail.length > 0
              && variantDetail.map(
                (item: any) => (
                  <div className="info fourth_content">
                    <p className="variable">{ item.name }</p>
                    <div className="variants">
                      {
                        item.items.map(
                          (el: any) => (
                            <Button
                              buttonType="primary alt"
                              text={el.value}
                              handleClickedButton={() => console.log(el.value)}
                            />
                            // <div className="item">
                            //   <p className="value">{ el.value }</p>
                            // </div>
                          ),
                        )
                      }
                    </div>
                  </div>
                ),
              )
            }
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

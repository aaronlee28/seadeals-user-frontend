import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as IconStar } from '../../../assets/svg/icon_star.svg';
import titleFormatter from '../../../utils/titleFormatter';
import { formatPrice, formatSoldCount, validatePrice } from '../../../utils/product';
import Form from '../../../components/Form/Form';
import Button from '../../../components/Button/Button';
import { ReactComponent as IconAddToCart } from '../../../assets/svg/icon_add_to_cart.svg';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import './HeaderInfo.scss';
import useAuth from '../../../hooks/useAuth';
import Carts from '../../../api/carts';
import Promotion from '../../../components/Promotion/Promotion';

type HeaderInfoProps = {
  data: any,
};

const HeaderInfo = (props: HeaderInfoProps) => {
  const { data } = props;
  const { product } = data;
  const minPrice = data.min_price;
  const maxPrice = data.max_price;

  const [amount, setAmount] = useState(1);
  const [variantDetail, setVariantDetail] = useState<any>({
    price: 0,
  });
  const [variantItems, setVariantItems] = useState<any>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>({
    variant1: '',
    variant2: '',
  });
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const amountItems = [
    {
      inputType: 'number',
      name: 'amount',
      label: 'Jumlah',
    },
  ];

  const checkDisabled = (index: number, value: string, name: string) => {
    const updated = variantItems.map(
      (item: any, idx: 0) => {
        if (index !== idx) {
          const updatedItem = item.items.map(
            (element: any) => {
              const isRelated = element.relatedVariant.find(
                (el: any) => el === value,
              );
              if (!isRelated) {
                return {
                  value: element.value,
                  isDisabled: selectedVariant[name] !== value,
                  relatedVariant: element.relatedVariant,
                };
              }
              if (isRelated) {
                return {
                  value: element.value,
                  isDisabled: false,
                  relatedVariant: element.relatedVariant,
                };
              }
              return element;
            },
          );
          return {
            name: item.name,
            items: updatedItem,
          };
        }
        return item;
      },
    );
    console.log(updated);
    setVariantItems(updated);
  };

  const handleAmount = (event: any) => {
    setAmount(event.target.value);
  };

  const handleSelectedVariant = (name: string, value: string) => {
    if (selectedVariant[name] !== value) {
      setSelectedVariant((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (selectedVariant[name] === value) {
      setSelectedVariant((prevState: any) => ({
        ...prevState,
        [name]: '',
      }));
    }

    checkDisabled(parseInt(name.charAt(name.length - 1), 10) - 1, value, name);
  };

  const getVariantDetail = () => {
    console.log(variantDetail);
    console.log(selectedVariant);
    let getVar = variantDetail;
    if (variantItems.length === 1) {
      if (selectedVariant.variant1 === '') {
        getVar = { price: 0 };
      }
      if (selectedVariant.variant1 !== '') {
        getVar = product.product_variant_detail.find(
          (el: any) => el.variant1_value === selectedVariant.variant1,
        );
      }
    }
    if (variantItems.length === 2) {
      if (selectedVariant.variant1 === '' || selectedVariant.variant2 === '') {
        getVar = { price: 0 };
      }
      if (selectedVariant.variant1 !== '' && selectedVariant.variant2 !== '') {
        getVar = product.product_variant_detail.find(
          (el: any) => el.variant1_value === selectedVariant.variant1
            && el.variant2_value === selectedVariant.variant2,
        );
      }
    }
    console.log(getVar);
    setVariantDetail(getVar);
  };

  const splitProductVariant = (items: any[]) => {
    let variants: any[] = [];
    for (let i = 0; i < items.length; i += 1) {
      const isExistName = variants.find(
        (el: any) => el.name === items[i].product_variant1?.name
        || el.name === items[i].product_variant2?.name,
      );
      if (isExistName) {
        variants = variants.map(
          (item: any) => {
            if (item.name === items[i].product_variant1.name) {
              const isExistValue = item.items.find(
                (el: any) => el.value === items[i].variant1_value,
              );
              if (isExistValue) {
                const updatedItems = item.items.map(
                  (element: any) => {
                    if (element.value === items[i].variant1_value) {
                      const updatedRelatedVariant = [
                        ...element.relatedVariant,
                        items[i].variant2_value,
                      ];
                      return {
                        value: element.value,
                        isDisabled: false,
                        relatedVariant: updatedRelatedVariant,
                      };
                    }
                    return element;
                  },
                );
                return {
                  name: item.name,
                  items: updatedItems,
                };
              }
              const newItem = {
                value: items[i].variant1_value,
                isDisabled: false,
                relatedVariant: [items[i].variant2_value],
              };
              return {
                name: item.name,
                items: [
                  ...item.items,
                  newItem,
                ],
              };
            }
            if (item.name === items[i].product_variant2.name) {
              const isExistValue = item.items.find(
                (el: any) => el.value === items[i].variant2_value,
              );
              if (isExistValue) {
                const updatedItems = item.items.map(
                  (element: any) => {
                    if (element.value === items[i].variant2_value) {
                      const updatedRelatedVariant = [
                        ...element.relatedVariant,
                        items[i].variant1_value,
                      ];
                      return {
                        value: element.value,
                        isDisabled: false,
                        relatedVariant: updatedRelatedVariant,
                      };
                    }
                    return element;
                  },
                );
                return {
                  name: item.name,
                  items: updatedItems,
                };
              }
              const newItem = {
                value: items[i].variant2_value,
                isDisabled: false,
                relatedVariant: [items[i].variant1_value],
              };
              return {
                name: item.name,
                items: [
                  ...item.items,
                  newItem,
                ],
              };
            }
            return item;
          },
        );
      }
      if (!isExistName) {
        if (items[i].product_variant1) {
          const variant1 = {
            name: items[i].product_variant1.name,
            items: [
              {
                value: items[i].variant1_value,
                isDisabled: false,
                relatedVariant: [items[i].variant2_value],
              },
            ],
          };
          variants = [...variants, variant1];
        }
        if (items[i].product_variant2) {
          const variant2 = {
            name: items[i].product_variant2.name,
            items: [
              {
                value: items[i].variant2_value,
                isDisabled: false,
                relatedVariant: [items[i].variant1_value],
              },
            ],
          };
          variants = [...variants, variant2];
        }
      }
    }
    console.log(variants);
    return variants;
  };

  const checkSelectedVariant = () => {
    if (variantItems.length === 1) {
      return selectedVariant.variant1 !== '';
    }
    if (variantItems.length === 2) {
      return selectedVariant.variant1 !== ''
        && selectedVariant.variant2 !== '';
    }
    return true;
  };

  const postToCart = async () => {
    if (checkSelectedVariant()) {
      const val = {
        product_variant_detail_id: Object.keys(variantDetail).length <= 1
          ? product.id
          : variantDetail.id,
        quantity: amount,
      };
      await Carts.PostCartItem(axiosPrivate, val)
        .then(() => {
          toast.success('Barang berhasil dimasukkan ke keranjang');
        })
        .catch(() => {
          toast.error('Barang gagal dimasukkan ke keranjang');
        });
    }
    if (!checkSelectedVariant()) {
      toast.error('Anda belum memilih varian');
    }
  };

  const addToCart = () => {
    if (auth.user) {
      postToCart().then();
    }
    if (!auth.user) {
      navigate('/login', { state: { from: location } });
      toast.error('Silahkan masuk terlebih dahulu');
    }
  };

  const buyNow = () => {
    if (auth.user) {
      postToCart().then();
      navigate('/cart', { state: { from: location } });
    }
    if (!auth.user) {
      navigate('/login', { state: { from: location } });
      toast.error('Silahkan masuk terlebih dahulu');
    }
  };

  useEffect(() => {
    setVariantItems(splitProductVariant(product.product_variant_detail));
  }, [data]);

  useEffect(() => {
    getVariantDetail();
  }, [selectedVariant]);

  console.log(Object.keys(variantDetail).length);

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
                  product.promotion
                  && (
                    <div className="promotion">
                      {
                        Object.keys(variantDetail).length <= 1
                          ? validatePrice(
                            minPrice - product.promotion.amount,
                            maxPrice - product.promotion.amount,
                          )
                          : validatePrice(
                            variantDetail.price - product.promotion.amount,
                            variantDetail.price - product.promotion.amount,
                          )
                      }
                    </div>
                  )
                }
                {
                  Object.keys(variantDetail).length <= 1
                    ? validatePrice(minPrice, maxPrice)
                    : validatePrice(variantDetail.price, variantDetail.price)
                }
                {
                  product.promotion
                  && (
                    <Promotion
                      promotionType="orange"
                      text={`${formatPrice(product.promotion.amount)} OFF`}
                    />
                  )
                }
              </h2>
            </div>
            {
              variantItems.length > 0
              && variantItems.map(
                (item: any, index: number) => (
                  <div
                    key={item.name}
                    className="info fourth_content"
                  >
                    <p className="variable">{ item.name }</p>
                    <div className="variants">
                      {
                        item.items.map(
                          (el: any) => (
                            <Button
                              key={el.value}
                              buttonType={`select ${
                                selectedVariant.variant1 === el.value
                                || selectedVariant.variant2 === el.value
                                  ? 'active'
                                  : ''
                              }`}
                              text={el.value}
                              handleClickedButton={() => handleSelectedVariant(
                                index === 0 ? 'variant1' : 'variant2',
                                el.value,
                              )}
                              isDisabled={el.isDisabled}
                            />
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
                  {
                    Object.keys(variantDetail).length <= 1
                      ? data.total_stock
                      : variantDetail.stock
                  }
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

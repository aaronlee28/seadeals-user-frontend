import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import Card from '../../components/Cards/Card';

import './Cart.scss';
import CardCartAll from '../../components/Cards/CardCart/CardCartAll';
import Carts from '../../api/carts';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      storeId: 0,
      storeName: '',
      storeIsChecked: false,
      storeItems: [
        {
          id: 0,
          name: '',
          imgUrl: '',
          price: 0,
          amount: 0,
          isChecked: false,
        },
      ],
    },
  ]);
  const [total, setTotal] = useState({
    totalPrice: 0,
    totalProduct: 0,
  });

  const [isAllProductsChecked, setIsAllProductsChecked] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const location = useLocation();
  const buyNow = location?.state?.cartId || '';

  console.log(location);
  console.log(buyNow);

  const isAllChecked = () => {
    for (let i = 0; i < cartItems.length; i += 1) {
      if (!cartItems[i].storeIsChecked) {
        return false;
      }
    }
    return true;
  };

  const isAllInStoreChecked = (items: any[]) => {
    for (let i = 0; i < items.length; i += 1) {
      if (!items[i].isChecked) {
        return false;
      }
    }
    return true;
  };

  const setTotalCheck = (store: any) => {
    let tempTotalProduct = 0;
    let tempTotalPrice = 0;
    for (let i = 0; i < store.length; i += 1) {
      const items = store[i].storeItems;
      for (let j = 0; j < items.length; j += 1) {
        if (items[j].isChecked) {
          tempTotalProduct += items[j].amount;
          tempTotalPrice += items[j].price * items[j].amount;
        }
      }
    }
    setTotal({
      totalPrice: tempTotalPrice,
      totalProduct: tempTotalProduct,
    });
  };

  const handleCheckedAllProducts = () => {
    const checkedStore = cartItems.map(
      (storeData: any) => {
        const newStoreData = storeData;
        newStoreData.storeIsChecked = !isAllProductsChecked;
        newStoreData.storeItems.map(
          (item: any) => {
            const newItem = item;
            newItem.isChecked = !isAllProductsChecked;
            return newItem;
          },
        );
        return newStoreData;
      },
    );

    setCartItems(checkedStore);
    setIsAllProductsChecked(isAllChecked);
    setTotalCheck(checkedStore);
  };

  const handleCheckedStore = (storeId: number) => {
    const checkedStore = cartItems.map(
      (storeData: any) => {
        if (storeData.storeId === storeId) {
          const newStoreData = storeData;
          newStoreData.storeIsChecked = !newStoreData.storeIsChecked;
          newStoreData.storeItems.map(
            (item: any) => {
              const newItem = item;
              newItem.isChecked = newStoreData.storeIsChecked;
              return newItem;
            },
          );
          return newStoreData;
        }
        return storeData;
      },
    );

    setCartItems(checkedStore);
    setIsAllProductsChecked(isAllChecked);
    setTotalCheck(checkedStore);
  };

  const handleCheckedItem = (id: number) => {
    const checkedItem = cartItems.map(
      (storeData: any) => {
        const newStoreData = storeData;
        newStoreData.storeItems.map(
          (item: any) => {
            if (item.id === id) {
              const newItem = item;
              newItem.isChecked = !newItem.isChecked;
              return newItem;
            }
            return item;
          },
        );
        newStoreData.storeIsChecked = isAllInStoreChecked(newStoreData.storeItems);
        return newStoreData;
      },
    );

    setCartItems(checkedItem);
    setIsAllProductsChecked(isAllChecked);
    setTotalCheck(checkedItem);
  };

  const updateAmount = async (id: number, amount: number) => {
    const val = {
      cart_item_id: id,
      current_quantity: amount,
    };
    await Carts.PatchCartItem(axiosPrivate, val)
      .then()
      .catch();
  };

  const handleAmount = (storeId: number, id: number, amount: any) => {
    let newAmount = parseInt(String(amount), 10);
    if (amount === '') {
      newAmount = 0;
    }
    const updatedStore = cartItems.map(
      (storeData: any) => {
        if (storeData.storeId === storeId) {
          const newStoreData = storeData;
          newStoreData.storeItems.map(
            (item: any) => {
              if (item.id === id) {
                const newItem = item;
                newItem.amount = newAmount;
                return newItem;
              }
              return item;
            },
          );
          return newStoreData;
        }
        return storeData;
      },
    );

    updateAmount(id, amount).then();
    setCartItems(updatedStore);
    setTotalCheck(updatedStore);
  };

  const splitCart = (items: any[]) => {
    let tempCart: any[] = [];
    for (let i = 0; i < items.length; i += 1) {
      const isSellerExist = tempCart.find(
        (el: any) => el.storeId === items[i].seller_id,
      );
      if (!isSellerExist) {
        const newItem = {
          id: items[i].id,
          name: items[i].product_name,
          imgUrl: items[i].image_url,
          price: items[i].price_per_item,
          amount: items[i].quantity,
          isChecked: items[i].id === buyNow,
        };
        const newSeller = {
          storeId: items[i].seller_id,
          storeName: items[i].seller_name,
          storeIsChecked: newItem.isChecked,
          storeItems: [newItem],
        };
        tempCart = [...tempCart, newSeller];
      }
      if (isSellerExist) {
        tempCart = tempCart.map(
          (element: any) => {
            if (element.storeId === items[i].seller_id) {
              const newItem = {
                id: items[i].id,
                name: items[i].product_name,
                imgUrl: items[i].image_url,
                price: items[i].price_per_item,
                amount: items[i].quantity,
                isChecked: items[i].id === buyNow,
              };
              const addedItems = [...element.storeItems, newItem];
              return {
                storeId: element.storeId,
                storeName: element.storeName,
                storeIsChecked: isAllInStoreChecked(addedItems),
                storeItems: addedItems,
              };
            }
            return element;
          },
        );
      }
    }

    setCartItems(tempCart);
  };

  const getCartItems = async () => {
    await Carts.GetCartItem(axiosPrivate)
      .then((resp: any) => {
        const allItems = resp.data.data.cart_items;
        console.log(allItems);
        splitCart(allItems);
      })
      .catch((err: any) => err);
  };

  const deleteItem = async (id: number) => {
    const val = {
      user_id: auth.user.user_id,
      cart_item_id: id,
    };
    await Carts.DeleteCartItem(axiosPrivate, val)
      .then(() => {
        toast.success('Barang berhasil dihapus dari keranjang');
        getCartItems().then();
      })
      .catch(() => {
        toast.error('Barang gagal dihapus');
      });
  };

  const handleDeleteItem = (storeId: number, id: number) => {
    deleteItem(id).then();
  };

  useEffect(() => {
    getCartItems().then();
  }, []);

  useEffect(() => {
    console.log(buyNow);
    handleCheckedItem(buyNow);
  }, [buyNow]);

  return (
    <div className="cart_container">
      <div className="cart_content">
        <CardCartAll
          totalProduct={total.totalProduct}
          totalPrice={total.totalPrice}
          isAllProductsChecked={isAllProductsChecked}
          handleCheckedAllProducts={handleCheckedAllProducts}
        />
        <div className="cart_items">
          {
            cartItems.map(
              (item) => (
                <Card
                  key={`${item.storeId}-${item.storeName}`}
                  data={item}
                  cardType="cart"
                  handleCheckedStore={handleCheckedStore}
                  handleCheckedItem={handleCheckedItem}
                  handleDeleteItem={handleDeleteItem}
                  handleAmount={handleAmount}
                />
              ),
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;

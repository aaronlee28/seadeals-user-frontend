import React, { useState } from 'react';
import Card from '../../components/Cards/Card';

import './Cart.scss';
import CardCartAll from '../../components/Cards/CardCart/CardCartAll';

const Cart = () => {
  const [dummy, setDummy] = useState(
    [
      {
        storeId: 1,
        storeName: 'Kamari Odd Space',
        storeIsChecked: false,
        storeItems: [
          {
            id: 1,
            name: 'Es Kopi Susu',
            imgUrl: 'https://firebasestorage.googleapis.com/v0/b/bucket-seadeals.appspot.com/o/categories%2Faudio.png?alt=media&token=3092aa1f-3aab-40ea-9902-0990599b09c5',
            price: 100000,
            amount: 2,
            isChecked: false,
          },
          {
            id: 2,
            name: 'Es Hazelnut Latte',
            imgUrl: 'https://firebasestorage.googleapis.com/v0/b/bucket-seadeals.appspot.com/o/categories%2Faudio.png?alt=media&token=3092aa1f-3aab-40ea-9902-0990599b09c5',
            price: 50000,
            amount: 4,
            isChecked: false,
          },
        ],
      },
      {
        storeId: 2,
        storeName: 'Kamari Odd Space KW',
        storeIsChecked: false,
        storeItems: [
          {
            id: 1,
            name: 'Es Kopi Susu',
            imgUrl: 'https://firebasestorage.googleapis.com/v0/b/bucket-seadeals.appspot.com/o/categories%2Faudio.png?alt=media&token=3092aa1f-3aab-40ea-9902-0990599b09c5',
            price: 100000,
            amount: 2,
            isChecked: false,
          },
          {
            id: 2,
            name: 'Es Hazelnut Latte',
            imgUrl: 'https://firebasestorage.googleapis.com/v0/b/bucket-seadeals.appspot.com/o/categories%2Faudio.png?alt=media&token=3092aa1f-3aab-40ea-9902-0990599b09c5',
            price: 50000,
            amount: 4,
            isChecked: false,
          },
        ],
      },
    ],
  );

  const [isAllProductsChecked, setIsAllProductsChecked] = useState(false);

  const isAllChecked = () => {
    for (let i = 0; i < dummy.length; i += 1) {
      if (!dummy[i].storeIsChecked) {
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

  const handleCheckedAllProducts = () => {
    const checkedStore = dummy.map(
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

    setDummy(checkedStore);
    setIsAllProductsChecked(isAllChecked);
  };

  const handleCheckedStore = (storeId: number) => {
    const checkedStore = dummy.map(
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

    setDummy(checkedStore);
    setIsAllProductsChecked(isAllChecked);
  };

  const handleCheckedItem = (storeId: number, id: number) => {
    const checkedItem = dummy.map(
      (storeData: any) => {
        if (storeData.storeId === storeId) {
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
        }
        return storeData;
      },
    );

    setDummy(checkedItem);
    setIsAllProductsChecked(isAllChecked);
  };

  const handleDeleteItem = (storeId: number, id: number) => {
    const deletedItem = dummy.map(
      (storeData: any) => {
        if (storeData.storeId === storeId) {
          const newStoreData = storeData;
          newStoreData.storeItems.map(
            (item: any) => {
              if (item.id === id) {
                const newItem = item;
                newItem.amount = 0;
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

    setDummy(deletedItem);
  };

  const handleAmount = (storeId: number, id: number, amount: any) => {
    let newAmount = parseInt(String(amount), 10);
    if (amount === '') {
      newAmount = 0;
    }
    const updatedStore = dummy.map(
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

    setDummy(updatedStore);
  };

  return (
    <div className="cart_container">
      <div className="cart_content">
        <CardCartAll
          isAllProductsChecked={isAllProductsChecked}
          handleCheckedAllProducts={handleCheckedAllProducts}
        />
        <div className="cart_items">
          {
            dummy.map(
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

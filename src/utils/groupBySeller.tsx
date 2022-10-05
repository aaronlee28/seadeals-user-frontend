const groupBySeller = (cartItems:any) => {
  const sellerProducts:any = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const cartItem of cartItems) {
    const sellerObj = sellerProducts
      .find((sellerProduct:any) => sellerProduct.storeID === cartItem.seller_id)
        || { storeID: cartItem.seller_id, storeItems: [], storeName: cartItem.seller_name };
    sellerObj.storeItems = [...sellerObj.storeItems, cartItem];
    if (sellerObj.storeItems.length <= 1) sellerProducts.push(sellerObj);
  }

  return sellerProducts;
};

export default groupBySeller;

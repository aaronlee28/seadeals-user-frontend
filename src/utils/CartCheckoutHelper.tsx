import PAYMENT_TYPE from '../constants/payment';

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

const parseCartItemsToPayload = (sellerProducts:any[]) => sellerProducts.map((sellerProduct) => {
  const storeCart = {
    seller_id: sellerProduct.storeID, cart_item_id: [], voucher_code: '', courier_id: 1,
  };
  storeCart.cart_item_id = sellerProduct.storeItems.map((item: any) => item.id);
  return storeCart;
});

// const applyVoucherToStore = (voucherID:string | number, storeID:string | number,
// cartPerStore:any[]) => cartPerStore.map((cartStore) => {
//   if (cartStore.seller_id === storeID) {
//     cartStore.voucher_id = voucherID;
//   }
//   return cartStore;
// });

const generateCheckoutPayload = (
  cartPerStore:any[],
  method:string,
  globalVoucher:string = '',
  accountNumber = '',
  buyerAddressID: number = 0,
) => {
  let paymentMethod = '';
  if (method === PAYMENT_TYPE.SLP) paymentMethod = 'sea-labs-pay';
  if (method === PAYMENT_TYPE.WALLET) paymentMethod = 'wallet';

  return {
    global_voucher_code: globalVoucher,
    cart_per_store: cartPerStore,
    payment_method: paymentMethod,
    account_number: accountNumber,
    buyer_address_id: buyerAddressID,
  };
};

const calculateSubtotal = (cartItems:any) => cartItems.reduce((
  sum:any,
  a:any,
) => sum + a.subtotal, 0);

export {
  groupBySeller, calculateSubtotal, parseCartItemsToPayload, generateCheckoutPayload,
};

const formatSoldCount = (count: number) => {
  if (count >= 10000) {
    return '10RB+ Terjual';
  }
  if (count >= 1000) {
    const formatCount = Math.round((count / 1000) * 100) / 100;
    return `${formatCount}RB Terjual`;
  }
  return `${count} Terjual`;
};

const formatPrice = (price: number) => {
  const priceSplit = price.toString().split(/(?=(?:\d{3})+(?:\.|$))/g);
  return priceSplit.join('.');
};

const formatPriceWithCurrency = (price: number) => {
  console.log(price);
  const priceSplit = price.toString().split(/(?=(?:\d{3})+(?:\.|$))/g);
  const priceJoin = priceSplit.join('.');
  return `Rp. ${priceJoin},00`;
};

export {
  formatSoldCount,
  formatPrice,
  formatPriceWithCurrency,
};

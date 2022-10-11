const getNumberOrder = (multiple: number) => {
  if (multiple === 1) {
    return 'RB';
  }
  if (multiple === 2) {
    return 'JT';
  }
  if (multiple === 3) {
    return 'M';
  }
  if (multiple === 4) {
    return 'T';
  }
  return '';
};

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
  const priceSplit = price.toString().split(/(?=(?:\d{3})+(?:\.|$))/g);
  const priceJoin = priceSplit.join('.');
  return `Rp${priceJoin}`;
};

const validatePrice = (minPrice: number, maxPrice: number) => {
  if (minPrice !== maxPrice) {
    return `${formatPriceWithCurrency(minPrice)} - ${formatPriceWithCurrency(maxPrice)}`;
  }
  return formatPriceWithCurrency(minPrice);
};

const formatFavorite = (count: number) => {
  let formatCount = count;
  let multiple = 0;
  while (formatCount >= 1000 && multiple < 4) {
    formatCount = Math.round((formatCount / 1000) * 100) / 100;
    multiple += 1;
  }
  return `${formatCount} ${getNumberOrder(multiple)}`;
};

export {
  formatSoldCount,
  formatPrice,
  formatPriceWithCurrency,
  formatFavorite,
  validatePrice,
};

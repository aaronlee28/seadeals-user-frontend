const formatCardNumber = (cardNum:string) => {
  if (cardNum && cardNum.length !== 16) return cardNum;

  const split = cardNum.match(/.{1,4}/g) ?? [];
  return split.join('·');
};

export default formatCardNumber;

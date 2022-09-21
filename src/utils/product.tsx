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

export default formatSoldCount;

const formatTitle = (title:any) => {
  const wordArr = title.split(' ');

  return wordArr.map((word:any) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
};

export default formatTitle;

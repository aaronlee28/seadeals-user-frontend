const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
];

const formatTime = (dateStr:string) => {
  const date = new Date(dateStr);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${date.getUTCHours()}:${date.getUTCMinutes()}`;
};

export default formatTime;

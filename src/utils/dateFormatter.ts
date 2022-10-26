const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
];

const formatTime = (dateStr:string, isDateTime:boolean = true) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const timeString = `,${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}${isDateTime ? timeString : ''}`;
};

export default formatTime;

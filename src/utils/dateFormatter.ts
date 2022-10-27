const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
];

const formatTime = (dateStr:string, isDateTime:boolean = true) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const timeString = `,${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
  return `${String(date.getUTCDate()).padStart(2, '0')} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}${isDateTime ? timeString : ''}`;
};

export default formatTime;

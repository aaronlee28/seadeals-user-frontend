import SORT_OPTIONS from '../constants/ProductListSortOptions';

const validateSorting = (sortOption:any) => {
  if (sortOption === SORT_OPTIONS.Priciest) return { option: 'price', order: 'desc' };
  if (sortOption === SORT_OPTIONS.Cheapest) return { option: 'price', order: 'asc' };
  if (sortOption === SORT_OPTIONS.Oldest) return { option: 'date', order: 'asc' };
  if (sortOption === SORT_OPTIONS.Recent) return { option: 'date', order: 'desc' };
  return { option: '', order: '' };
};

export const validatePageNumber = (pageNumber:any) => {
  const pageInt = parseInt(pageNumber, 10);
  return Number.isNaN(pageInt) ? 1 : pageInt;
};

export const getActiveTabName = (option:string, order:string) => {
  if (option === 'price' && order === 'desc') return SORT_OPTIONS.Priciest;
  if (option === 'price' && order === 'asc') return SORT_OPTIONS.Cheapest;
  if (option === 'date' && order === 'asc') return SORT_OPTIONS.Oldest;
  if (option === 'date' && order === 'desc') return SORT_OPTIONS.Recent;
  return SORT_OPTIONS.Top;
};

export default validateSorting;

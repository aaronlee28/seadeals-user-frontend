// if input is neither, input is changed into the default option
export const validateSortOption = (option:string) => (option === 'date' ? 'date' : 'price');
export const validateSortOrder = (order:string) => (order === 'asc' ? 'asc' : 'desc');
export default validateSortOption;

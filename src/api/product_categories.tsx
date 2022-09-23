// import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from './axios';

// const axiosPrivate = useAxiosPrivate();

class ProductCategories {
  static GetAllCategories() {
    return axios.get('/categories');
  }
}

export default ProductCategories;

import axios from './axios';

class Products {
  static GetRecommendedProducts() {
    return axios.get('/search-recommend-product');
  }
}

export default Products;

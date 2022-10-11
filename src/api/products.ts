import axios from './axios';

class Products {
  static GetAllProducts(filter: string) {
    return axios.get(`/products${filter}`);
  }

  static GetProductBySlug(slug: string) {
    return axios.get(`/products/detail/${slug}`);
  }

  static GetProductsBySellerID(SellerID: number, filter: string) {
    return axios.get(`/sellers/${SellerID}/products${filter}`);
  }

  static GetProductsByCategoryID(CategoryID: number, filter: string) {
    return axios.get(`/categories/${CategoryID}/products${filter}`);
  }

  static GetRecommendedProducts(filter: string = '') {
    return axios.get(`/search-recommend-product${filter}`);
  }

  static GetPromotionPrice(ProductID: number) {
    return axios.get(`/products/${ProductID}/promotion-price`);
  }
}

export default Products;

import axios from './axios';

class Reviews {
  static GetReviewsByProductID(productID: number, filter: string) {
    return axios.get(`/products/${productID}/reviews${filter}`);
  }
}

export default Reviews;

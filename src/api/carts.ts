import axios from './axios';

class Carts {
  static PostCartItem(ax: any, data: any) {
    return ax.post('/user/cart', data);
  }

  static DeleteCartItem(data: any) {
    return axios.delete('/user/cart', data);
  }

  static GetCartItem() {
    return axios.get('/user/cart');
  }
}

export default Carts;

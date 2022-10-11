class Carts {
  static PostCartItem(ax: any, data: any) {
    return ax.post('/user/cart', data);
  }

  static DeleteCartItem(ax: any, data: any) {
    return ax.delete('/user/cart', data);
  }

  static GetCartItem(ax: any) {
    return ax.get('/user/cart');
  }
}

export default Carts;

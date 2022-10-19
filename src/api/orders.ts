class Orders {
  static GetAllOrdersByUser(ax: any, filter: string = '') {
    return ax.get(`/user/orders${filter}`);
  }

  static PostFinishOrder(ax: any, data: any) {
    return ax.post('/user/finish/orders', data);
  }
}

export default Orders;

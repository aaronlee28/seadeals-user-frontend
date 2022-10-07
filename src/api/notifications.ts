import axios from './axios';

class Notifications {
  static PostFavorite(data: any) {
    return axios.post('/products/favorites', data);
  }
}

export default Notifications;

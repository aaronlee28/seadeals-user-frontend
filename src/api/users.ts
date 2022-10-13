import axios from './axios';

class Users {
  static GetUserProfile() {
    return axios.get('/user/profiles');
  }
}

export default Users;

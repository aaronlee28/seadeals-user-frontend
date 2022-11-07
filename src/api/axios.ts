import axios from 'axios';

const baseURL = 'https://seadeals-backend.herokuapp.com/';

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});


import axios from 'axios';
import router from '@/router';

const AccountApi = axios.create({
  'baseURL': process.env.VUE_APP_KTA_CUSTOMER,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

AccountApi.interceptors.response.use(null, error => {
  let path = '/error';

  switch (error.response.status) {
    case 401: path = '/account/login'; break;
    case 404: path = '/404'; break;
    case 500: path = '/error'; break;
  }
  router.push(path)
  return Promise.reject(error);
});

export default AccountApi;
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { LOGOUT } from '../redux/actions/types';
import store from '../redux/store';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
  withCredentials:true
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      if(localStorage.getItem("token")){
         toast.error("You session is expired. Please login again!")  
      }

      localStorage.removeItem('token');
      localStorage.removeItem('RefreshToken');
      localStorage.removeItem('userToken');
      store.dispatch({ type: LOGOUT });

    }
    return Promise.reject(err);
  }
);

export default api;

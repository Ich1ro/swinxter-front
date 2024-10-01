import api from '../../utils/api';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  USER_LOADED
} from './types';


const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
  }
// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/active',config);
console.log(res)
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/register', formData);

return res;
  } catch (err) {
    console.log(err)
    const errors = err.response.data.errors;


    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const LoginA = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body,config);
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });

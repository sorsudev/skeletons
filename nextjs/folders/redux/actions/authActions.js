import Router from 'next/router';
import axios from 'axios';
import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { setCookie, removeCookie } from '../../utils/cookie';
const API = process.env.NEXT_PUBLIC_API_HOST;

const resetPassword = ({ email }) => {
  return (dispatch) => {
    axios.post(`${API}/mails/users/lost_password/${email}`)
      .then(response => {
        Router.push('/users/sign_in');
        dispatch({ type: DEAUTHENTICATE });
      })
      .catch((err) => {
        if (err.response.status === 500)
          console.log(err.response.data.message)

        console.log(err.response.data.message);
      });
  }
}

const authenticate = ({ email, password }, type) => {
  if (type !== 'sign_in') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios.post(`${API}/users/${type}`, { email, password })
      .then((response) => {
        setCookie('token', response.data.token);
        Router.push('/users/dashboard');
        dispatch({type: AUTHENTICATE, payload: response.data.token});
      })
      .catch((err) => {
        if (err.response.status === 500)
          console.log(err.response.data.message)
        console.log(err.response.data.message);
      });
  };
};

const register = (data, type) => {
  if (type !== 'sign_up') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios.post(`${API}/users`, data)
      .then((response) => {
        setCookie('token', response.data.token);
        var token = response.data.token;
        axios.post(`${API}/mails/users/account_created/${response.data.userId}`)
          .then(response => {
            Router.push('/users/dashboard');
            dispatch({ type: AUTHENTICATE, payload: token });
          })
          .catch((err) => {
            if (err.response.status === 500)
              console.log(err.response.data.message)

            console.log(err.response.data.message);
          });
      })
      .catch((err) => {
        if (err.response.status === 500)
          console.log(err.response.data.message)
        console.log(err.response.data.message);
      });
  };
};

const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({type: AUTHENTICATE, payload: token});
  };
};

const deauthenticate = () => {
  return (dispatch) => {
    removeCookie('token');
    Router.push('/');
    dispatch({type: DEAUTHENTICATE});
  };
};

export default {
  authenticate,
  register,
  reauthenticate,
  deauthenticate,
  resetPassword
};

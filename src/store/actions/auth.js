import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkValidity = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBM_YMUX4PyncmR3cFmhUfus1uB2MpaZgE';

    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBM_YMUX4PyncmR3cFmhUfus1uB2MpaZgE';
    }
    axios
      .post(url, {
        email,
        password,
        returnSecureToken: true,
      })
      .then((response) => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkValidity(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

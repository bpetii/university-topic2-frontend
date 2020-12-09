import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_ERROR,
  USER_LOGIN_ALERT_CLEAR,
  USER_SIGNUP_SUCCESS,
} from '../constants';

const initialState = {
  requesting: false,
  alert: null,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, requesting: true, alert: null };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        requesting: false,
        alert: null,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        requesting: false,
        alert: { type: 'alert-danger', message: 'Wrong e-mail or password' },
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        requesting: false,
        alert: { type: 'alert-danger', message: 'Someting went wrong' },
      };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        requesting: false,
        alert: { type: 'alert-success', message: 'Singup successful' },
      };

    case USER_LOGIN_ALERT_CLEAR:
      return { ...state, alert: null };

    default:
      return state;
  }
};

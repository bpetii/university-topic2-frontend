import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_ERROR,
  USER_SIGNUP_ALERT_CLEAR,
} from '../constants';

const initialState = {
  requesting: false,
  alert: null,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case USER_SIGNUP_REQUEST:
      return { ...state, requesting: true, alert: null };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        requesting: false,
        alert: { type: 'alert-success', message: 'Singup successful' },
      };
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        requesting: false,
        alert: { type: 'alert-danger', message: 'Already registered' },
      };
    case USER_SIGNUP_ERROR:
      return {
        ...state,
        requesting: false,
        alert: { type: 'alert-danger', message: 'Someting went wrong' },
      };

    case USER_SIGNUP_ALERT_CLEAR:
      return { ...state, alert: null };

    default:
      return state;
  }
};

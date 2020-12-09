import {
  USER_SESSION_LOGIN_FINISHED,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_ERROR,
} from '../constants';

const initialState = {
  finished: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case USER_SESSION_LOGIN_FINISHED:
    case USER_LOGIN_SUCCESS:
    case USER_LOGIN_FAILURE:
    case USER_LOGIN_ERROR:
      return { ...state, finished: true };
    default:
      return state;
  }
};

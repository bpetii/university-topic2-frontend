import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants';

const initialState = {
  token: null,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, token: payload.token, user: payload.user };
    case USER_LOGOUT:
      return { ...state, token: null, user: null };
    default:
      return state;
  }
};

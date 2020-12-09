import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_SIGNUP_ALERT_CLEAR,
  USER_LOGIN_ALERT_CLEAR,
  USER_SESSION_LOGIN_FINISHED,
} from '../constants';

const urlToSignUp =
  'https://onlab-game-app.azurewebsites.net/api/user/register';
const urlToLogIn = 'https://onlab-game-app.azurewebsites.net/api/user/login';
const urlToMe = 'https://onlab-game-app.azurewebsites.net/api/user/me';

export const signupUser = userData => async dispatch => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });
    const response = await fetch(urlToSignUp, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    switch (response.status) {
      case 201:
        dispatch({ type: USER_SIGNUP_SUCCESS });
        return;
      case 400:
        dispatch({ type: USER_SIGNUP_FAILURE });
        return;
      default:
        throw Error('Unexpected status');
    }
  } catch (error) {
    dispatch({ type: USER_SIGNUP_ERROR });
  }
};

export const loginUser = userData => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const response = await fetch(urlToLogIn, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    switch (response.status) {
      case 200:
        const { token } = await response.json();
        localStorage.setItem('token', token);
        dispatch(fetchUser(token));
        return;
      case 400:
        dispatch({ type: USER_LOGIN_FAILURE });
        return;
      default:
        throw Error('Unexpected status');
    }
  } catch (error) {
    dispatch({ type: USER_LOGIN_ERROR });
  }
};

export const sessionLoginUser = () => dispatch => {
  const token = localStorage.getItem('token');

  if (token) {
    dispatch({ type: USER_LOGIN_REQUEST });
    dispatch(fetchUser(token));
  } else {
    dispatch({ type: USER_SESSION_LOGIN_FINISHED });
  }
};

const fetchUser = token => async dispatch => {
  try {
    // TESTING
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await timeout(3000);

    const response = await fetch(urlToMe, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
    switch (response.status) {
      case 200:
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: {
            token: token,
            user: await response.json(),
          },
        });
        return;
      case 401:
        dispatch(logoutUser());
        dispatch({ type: USER_LOGIN_FAILURE });
        return;
      default:
        throw Error('Unexpected status');
    }
  } catch (error) {
    dispatch(logoutUser());
    dispatch({ type: USER_LOGIN_ERROR });
  }
};

export const logoutUser = () => dispatch => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
};

export const clearSignupAlert = () => dispatch => {
  dispatch({ type: USER_SIGNUP_ALERT_CLEAR });
};

export const clearLoginAlert = () => dispatch => {
  dispatch({ type: USER_LOGIN_ALERT_CLEAR });
};

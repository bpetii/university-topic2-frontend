import { combineReducers } from 'redux';

import auth from './authenticationReducer';
import login from './loginReducer';
import signup from './signupReducer';
import sessionLogin from './sessionLoginReducer';
import webSocket from './webSocketReducer';
import games from './gamesReducer';

export default combineReducers({
  auth,
  login,
  signup,
  sessionLogin,
  webSocket,
  games,
});

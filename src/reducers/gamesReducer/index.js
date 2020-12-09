import { combineReducers } from 'redux';

import types from './typesReducer';
import ticTacToe from './ticTackToeReducer';
import battleships from './battleshipsReducer';

export default combineReducers({
  types,
  ticTacToe,
  battleships,
});

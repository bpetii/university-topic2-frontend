import {
  GAME_TICTACTOE_INIT,
  GAME_TICTACTOE_JOIN,
  GAME_TICTACTOE_LEAVE,
  GAME_TICTACTOE_STEPPED,
} from '../constants';

import { sendWS } from './webSocketActions';

export const init = () => dispatch => {
  dispatch({ type: GAME_TICTACTOE_INIT });
};

export const join = () => dispatch => {
  dispatch(sendWS({ type: GAME_TICTACTOE_JOIN }));
};

export const leave = () => dispatch => {
  dispatch(sendWS({ type: GAME_TICTACTOE_LEAVE }));
};

export const step = id => dispatch => {
  dispatch(sendWS({ type: GAME_TICTACTOE_STEPPED, payload: id }));
};

import {
  GAME_BATTLESHIPS_INIT,
  GAME_BATTLESHIPS_JOIN,
  GAME_BATTLESHIPS_LEAVE,
  GAME_BATTLESHIPS_GUESSED,
  GAME_BATTLESHIPS_PLACED_SHIPS,
} from '../constants';

import { sendWS } from './webSocketActions';

export const init = () => dispatch => {
  dispatch({ type: GAME_BATTLESHIPS_INIT });
};

export const join = () => dispatch => {
  dispatch(sendWS({ type: GAME_BATTLESHIPS_JOIN }));
};

export const placedShips = ships => dispatch => {
  dispatch({ type: GAME_BATTLESHIPS_PLACED_SHIPS });
  dispatch(sendWS({ type: GAME_BATTLESHIPS_PLACED_SHIPS, payload: ships }));
};

export const leave = () => dispatch => {
  dispatch(sendWS({ type: GAME_BATTLESHIPS_LEAVE }));
};

export const guess = (row, column) => dispatch => {
  dispatch(
    sendWS({ type: GAME_BATTLESHIPS_GUESSED, payload: { row, column } }),
  );
};

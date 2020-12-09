import {
  WEBSOCKET_OPENING,
  WEBSOCKET_OPENED,
  WEBSOCKET_CLOSED,
} from '../constants';

const initialState = {
  socket: null,
  opening: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case WEBSOCKET_OPENING:
      if (state.socket) return state;
      return { ...state, socket: payload, opening: true };
    case WEBSOCKET_OPENED:
      if (state.socket !== payload) return state;
      return { ...state, opening: false };
    case WEBSOCKET_CLOSED:
      if (state.socket !== payload) return state;
      return initialState;

    default:
      return state;
  }
};

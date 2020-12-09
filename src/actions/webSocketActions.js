import {
  WEBSOCKET_OPENING,
  WEBSOCKET_OPENED,
  WEBSOCKET_CLOSED,
  WEBSOCKET_TOKEN,
  GAME_TICTACTOE_MAP_UPDATE,
  GAME_TICTACTOE_STARTED,
  GAME_TICTACTOE_TURN,
  GAME_TICTACTOE_END,
  GAME_BATTLESHIPS_PLACING,
  GAME_BATTLESHIPS_STARTED,
  GAME_BATTLESHIPS_TURN,
  GAME_BATTLESHIPS_MAP_UPDATE,
  GAME_BATTLESHIPS_END,
} from '../constants';

// const wsHost = window.location.origin.replace(/^http/, 'ws') + '/api/';
// const wsHost = 'ws://localhost:1234/api/';
const wsHost = 'wss://onlab-game-app.azurewebsites.net/api/';

export const connectWS = () => (dispatch, getState) => {
  const state = getState();

  if (state.webSocket.socket) return;

  const ws = new WebSocket(wsHost);
  dispatch({ type: WEBSOCKET_OPENING, payload: ws });

  ws.onopen = e => {
    ws.send(
      JSON.stringify({
        type: WEBSOCKET_TOKEN,
        payload: state.auth.token,
      }),
    );
  };
  ws.onmessage = ({ data }) => {
    console.log(data);
    const { type, payload } = JSON.parse(data);

    switch (type) {
      case WEBSOCKET_OPENED:
        dispatch({ type: WEBSOCKET_OPENED, payload: ws });
        return;

      case GAME_TICTACTOE_STARTED:
      case GAME_TICTACTOE_TURN:
      case GAME_TICTACTOE_MAP_UPDATE:
      case GAME_TICTACTOE_END:
      case GAME_BATTLESHIPS_PLACING:
      case GAME_BATTLESHIPS_STARTED:
      case GAME_BATTLESHIPS_TURN:
      case GAME_BATTLESHIPS_MAP_UPDATE:
      case GAME_BATTLESHIPS_END:
        dispatch({ type: type, payload: payload });
        return;

      default:
        return;
    }
  };
  ws.onclose = e => {
    dispatch({ type: WEBSOCKET_CLOSED, payload: ws });
  };
};

export const closeWS = () => (dispatch, getState) => {
  const state = getState();
  const ws = state.webSocket.socket;
  if (ws) ws.close();
};

export const sendWS = messageObject => (dispatch, getState) => {
  const {
    webSocket: { socket, opening },
  } = getState();

  if (!socket || opening) return;

  socket.send(JSON.stringify(messageObject));
};

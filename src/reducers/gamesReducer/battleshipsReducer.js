import {
  GAME_BATTLESHIPS_INIT,
  GAME_BATTLESHIPS_STARTED,
  STATE_PLACING,
  GAME_BATTLESHIPS_PLACING,
  STATE_PLAY,
  GAME_BATTLESHIPS_TURN,
  GAME_BATTLESHIPS_END,
  GAME_BATTLESHIPS_RESULT_WIN,
  GAME_BATTLESHIPS_RESULT_LOSE,
  GAME_BATTLESHIPS_RESULT_DRAW,
  GAME_BATTLESHIPS_RESULT_DISCONNECTED,
  GAME_BATTLESHIPS_MAP_UPDATE,
  GAME_BATTLESHIPS_PLACED_SHIPS,
  STATE_WAITING,
} from '../../constants';

const initialState = {
  myGuesses: null,
  foundShips: null,

  enemyGuesses: null,

  gameState: null,
  myTurn: false,
  message: '',

  win: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GAME_BATTLESHIPS_INIT:
      return initialState;

    case GAME_BATTLESHIPS_PLACING:
      return {
        ...state,
        gameState: STATE_PLACING,
        message: 'Place your ships',
      };

    case GAME_BATTLESHIPS_STARTED:
      return { ...state, gameState: STATE_PLAY };

    case GAME_BATTLESHIPS_MAP_UPDATE:
      const { myGuesses, enemyGuesses, foundShips } = payload;
      return { ...state, myGuesses, enemyGuesses, foundShips };

    case GAME_BATTLESHIPS_TURN:
      const myTurn = payload.yourTurn;
      return {
        ...state,
        myTurn,
        message: myTurn ? 'Your turn to attack' : 'Waiting for enemy attack',
      };

    case GAME_BATTLESHIPS_PLACED_SHIPS:
      return {
        ...state,
        gameState: STATE_WAITING,
        message: 'Waiting for other player to place the ships',
      };

    case GAME_BATTLESHIPS_END:
      const { result } = payload;
      let message = '';
      switch (result) {
        case GAME_BATTLESHIPS_RESULT_WIN:
          message = 'You Won - Congratulations ☺';
          break;
        case GAME_BATTLESHIPS_RESULT_LOSE:
          message = 'You Lost - Maybe next time :(';
          break;
        case GAME_BATTLESHIPS_RESULT_DRAW:
          message = `It's a draw`;
          break;
        case GAME_BATTLESHIPS_RESULT_DISCONNECTED:
          message = 'Your opponent disconnected';
          break;

        default:
          break;
      }
      return {
        ...state,
        message,
        myTurn: false,
        win: result === GAME_BATTLESHIPS_RESULT_WIN,
      };

    default:
      return state;
  }
};

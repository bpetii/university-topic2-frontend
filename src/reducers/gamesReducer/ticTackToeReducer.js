import {
  GAME_TICTACTOE_INIT,
  GAME_TICTACTOE_MAP_UPDATE,
  GAME_TICTACTOE_TURN,
  GAME_TICTACTOE_STARTED,
  GAME_TICTACTOE_END,
  GAME_TICTACTOE_RESULT_WIN,
  GAME_TICTACTOE_RESULT_LOSE,
  GAME_TICTACTOE_RESULT_DRAW,
  GAME_TICTACTOE_RESULT_DISCONNECTED,
} from '../../constants';

const initialState = {
  fields: [],
  started: false,
  myMark: null,
  myTurn: false,
  message: '',
};

for (let i = 0; i < 9; i++) {
  initialState.fields.push({ id: i, value: '', disabled: true });
}

export default (state = initialState, { type, payload }) => {
  let newFields;

  switch (type) {
    case GAME_TICTACTOE_INIT:
      return initialState;

    case GAME_TICTACTOE_STARTED:
      return { ...state, started: true, myMark: payload };

    case GAME_TICTACTOE_MAP_UPDATE:
      payload.forEach(field => {
        field.disabled = field.value || !state.myTurn;
      });
      return { ...state, fields: payload };

    case GAME_TICTACTOE_TURN:
      const myTurn = payload.yourTurn;
      newFields = JSON.parse(JSON.stringify(state.fields));
      newFields.forEach(field => {
        field.disabled = field.value || !myTurn;
      });
      return {
        ...state,
        fields: newFields,
        myTurn,
        message: myTurn ? 'Your turn' : 'Waiting for other player',
      };

    case GAME_TICTACTOE_END:
      newFields = JSON.parse(JSON.stringify(state.fields));
      newFields.forEach(field => {
        field.disabled = true;
      });
      const { result } = payload;
      let message = '';
      switch (result) {
        case GAME_TICTACTOE_RESULT_WIN:
          message = 'You Won :)';
          break;
        case GAME_TICTACTOE_RESULT_LOSE:
          message = 'You Lost :(';
          break;
        case GAME_TICTACTOE_RESULT_DRAW:
          message = `It's a draw`;
          break;
        case GAME_TICTACTOE_RESULT_DISCONNECTED:
          message = 'Your opponent disconnected';
          break;
        default:
          break;
      }
      return { ...state, fields: newFields, message };

    default:
      return state;
  }
};

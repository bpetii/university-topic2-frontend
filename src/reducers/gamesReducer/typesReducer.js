const initialState = [
  {
    id: 2,
    pathName: 'tictactoe',
    name: 'Tic Tac Toe',
    description:
      'The player who succeeds in placing three of their marks in a row wins the game.',
    imgSrc: '/tictactoe.png',
  },
  {
    id: 3,
    pathName: 'battleships',
    name: 'Battleships',
    description:
      "A guessing game on the sea. The objective of the game is to destroy the opposing player's fleet.",
    imgSrc: '/battleships.png',
  },
];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

// TODO

// const urlToGames = 'https://onlab-game-app.azurewebsites.net/api/games/all';

// const response = await fetch(urlToGames, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-auth-token': this.props.token,
//     },
//   });

import Ship from './Ship';
import ShipPlacing from './ShipPlacing';
import GuessingGrid from './GuessingGrid';
import { STATE_PLACING, STATE_PLAY } from '../../constants';
import Grid from './Grid';
import ColorOverlay from './ColorOverlay';
import Firework from './Fireworks';

export const battleshipsSketch = p => {
  let redColor = p.color(255, 0, 0, 100);
  let grayColor = p.color(255, 255, 255, 100);
  let selectedColor = p.color(255, 255, 255, 50);

  let props;

  const handlePlacingDone = shipPos => {
    props.placedShips(shipPos);
  };
  const handleGuess = (row, column) => {
    props.guess(row, column);
  };

  let shipPlacing = new ShipPlacing(
    0,
    0,
    8,
    8,
    75,
    75,
    [new Ship(2), new Ship(3), new Ship(3), new Ship(4), new Ship(5)],
    handlePlacingDone,
    redColor,
  );

  let foundShipsGrid = new Grid(650, 0, 8, 8, 75, 75);
  let guessingGrid = new GuessingGrid(
    650,
    0,
    8,
    8,
    75,
    75,
    handleGuess,
    selectedColor,
  );

  let enemyGuessGrid = new Grid(0, 0, 8, 8, 75, 75, true);

  let redOverlay = new ColorOverlay(redColor);

  let grayOverlay = new ColorOverlay(grayColor);

  let firework = new Firework(p);

  p.preload = () => {
    Ship.loadImages(p);
  };

  p.setup = () => {
    p.createCanvas(1250, 600);
    p.background(0);
  };

  p.draw = () => {
    if (props.win) firework.draw(p);
    else if (props.gameState) {
      p.background(0);
      shipPlacing.draw(p);

      if (props.gameState === STATE_PLACING) {
        p.textSize(30);
        p.fill(255, 255, 255);
        p.text('R - rotate', 850, 290);
        p.text('C - clear', 850, 330);
      }

      if (props.gameState === STATE_PLAY) {
        enemyGuessGrid.draw(p);
        guessingGrid.drawBackground(p);
        foundShipsGrid.draw(p);
        guessingGrid.drawGrid(p, props.myTurn);
      }
    }
  };

  p.mousePressed = () => {
    if (props.gameState)
      switch (props.gameState) {
        case STATE_PLACING:
          shipPlacing.mousePressed(p);
          break;
        case STATE_PLAY:
          if (props.myTurn) guessingGrid.mousePressed(p);
          break;
        default:
          throw new Error('Unknown game state');
      }
  };

  p.keyPressed = () => {
    if (props.gameState)
      switch (props.gameState) {
        case STATE_PLACING:
          shipPlacing.keyPressed(p);
          break;
        case STATE_PLAY:
          break;
        default:
          throw new Error('Unknown game state');
      }
  };

  p.receiveProps = newProps => {
    props = newProps;

    if (props.myGuesses)
      guessingGrid.grid.content = props.myGuesses.map(row =>
        row.map(guess => {
          switch (guess) {
            case true:
              return redOverlay;
            case false:
              return grayOverlay;
            case null:
              return null;
            default:
              throw new Error('Invalid guess state');
          }
        }),
      );

    if (props.foundShips)
      foundShipsGrid.content = props.foundShips.map(row =>
        row.map(ship => (ship ? Object.assign(new Ship(), ship) : null)),
      );

    if (props.enemyGuesses)
      enemyGuessGrid.content = props.enemyGuesses.map(row =>
        row.map(guess => {
          switch (guess) {
            case true:
              return redOverlay;
            case false:
              return grayOverlay;
            case null:
              return null;
            default:
              throw new Error('Invalid guess state');
          }
        }),
      );
  };
};

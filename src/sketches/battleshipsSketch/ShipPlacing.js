import Grid from './Grid';
import WaveBackground from './WaveBackground';
import Ship from './Ship';
import ShipPlaceholer from './ShipPlaceholder';
import ColorOverlay from './ColorOverlay';
import ShipArea from './ShipArea';

export default class ShipPlacing {
  constructor(
    startX,
    startY,
    rowCount,
    columnCount,
    rowHeight,
    columnWidth,
    shipsToPlace,
    onPlacingDone,
    redColor,
  ) {
    this.startX = startX;
    this.startY = startY;
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.rowHeight = rowHeight;
    this.columnWidth = columnWidth;

    this.waveBackground = new WaveBackground(
      startX,
      startY,
      columnCount * columnWidth,
      rowCount * rowHeight,
    );

    this.grid = new Grid(
      startX,
      startY,
      rowCount,
      columnCount,
      rowHeight,
      columnWidth,
    );

    this.redOverlay = new ColorOverlay(redColor);

    this.placedContent = this.grid.cloneContent();

    this.shipsToPlace = shipsToPlace;

    this.placingQueue = this.shipsToPlace.slice();

    this.isPlacingDone = false;
    this.onPlacingDone = onPlacingDone;
  }

  getNextShip() {
    if (this.placingQueue) return this.placingQueue[0];
    return null;
  }

  popShip() {
    this.placingQueue.splice(0, 1);
  }

  rotateShip() {
    let ship = this.getNextShip();
    if (ship) ship.rotate();
  }

  placeShip(row, column, ship) {
    // If no ship to place
    if (!ship) return false;

    // If ship already present in start grid
    if (this.grid.content[row][column]) return false;

    switch (ship.orientation) {
      case Ship.HORIZONTAL:
        // If ship out of grid boundaries
        if (column + ship.size > this.columnCount) return false;

        // If ship already placed in it's place
        for (let currCol = column; currCol < column + ship.size; currCol++) {
          if (this.grid.content[row][currCol]) return false;
        }
        break;
      case Ship.VERTICAL:
        // If ship out of grid boundaries
        if (row + ship.size > this.rowCount) return false;

        // If ship already placed in it's place
        for (let currRow = row; currRow < row + ship.size; currRow++) {
          if (this.grid.content[currRow][column]) return false;
        }
        break;
      default:
        throw new Error('Invalis Ship orientation');
    }

    // Every check succeeds, can place the ship now

    // Ship area, where other ship cannot be placed

    let endRow;
    let endColumn;

    switch (ship.orientation) {
      case Ship.HORIZONTAL:
        endRow = row + 1;
        endColumn = column + ship.size;
        break;
      case Ship.VERTICAL:
        endRow = row + ship.size;
        endColumn = column + 1;
        break;
      default:
        throw new Error('Invalis Ship orientation');
    }

    for (let currRow = row - 1; currRow <= endRow; currRow++) {
      if (currRow < 0 || currRow >= this.grid.rowCount) continue;
      for (let currCol = column - 1; currCol <= endColumn; currCol++) {
        if (currCol < 0 || currCol >= this.grid.columnCount) continue;

        this.grid.content[currRow][currCol] = new ShipArea();
      }
    }

    // Ship beginning
    this.grid.content[row][column] = ship;

    // Rest of the ship
    switch (ship.orientation) {
      case Ship.HORIZONTAL:
        for (
          let currCol = column + 1;
          currCol < column + ship.size;
          currCol++
        ) {
          this.grid.content[row][currCol] = new ShipPlaceholer();
        }
        break;
      case Ship.VERTICAL:
        for (let currRow = row + 1; currRow < row + ship.size; currRow++) {
          this.grid.content[currRow][column] = new ShipPlaceholer();
        }
        break;
      default:
        throw new Error('Invalid Ship orientation');
    }

    return true;
  }

  callOnPlacingDone() {
    this.isPlacingDone = true;

    const shipPos = this.placedContent.map(row =>
      row.map(ship => (ship && ship.isShip() ? ship : null)),
    );

    this.onPlacingDone(shipPos);
  }

  mousePressed(p) {
    if (this.grid.selectedGrid) {
      const { row, column } = this.grid.selectedGrid;
      const success = this.placeShip(row, column, this.getNextShip());
      if (success) {
        this.placedContent = this.grid.cloneContent();
        this.popShip();
        if (!this.getNextShip()) this.callOnPlacingDone();
      }
    }
  }

  keyPressed(p) {
    if (this.isPlacingDone) return;

    switch (p.keyCode) {
      case 82:
        this.rotateShip();
        break;
      case 67:
        this.grid.fillEmpty();
        this.placedContent = this.grid.content;
        this.placingQueue = this.shipsToPlace.slice();
        break;
      default:
        return;
    }
  }

  draw(p) {
    this.waveBackground.draw(p);
    this.grid.content = this.placedContent;
    this.placedContent = this.grid.cloneContent();

    if (this.grid.selectedGrid) {
      const { row, column } = this.grid.selectedGrid;
      const ship = this.getNextShip();

      const success = this.placeShip(row, column, ship);
      this.grid.draw(p);
      if (!success) this.redOverlay.drawOnShip(p, ship, this.grid, row, column);
    } else {
      this.grid.draw(p);
    }

    this.grid.content = this.placedContent;
  }
}

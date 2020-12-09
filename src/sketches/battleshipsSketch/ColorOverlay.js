import Ship from './Ship';

export default class ColorOverlay {
  constructor(color) {
    this.color = color;
  }

  drawOnGrid(p, grid) {
    p.colorMode(p.RGB);
    p.noStroke();
    p.fill(this.color);

    p.rect(
      grid.startX,
      grid.startY,
      grid.columnCount * grid.columnWidth,
      grid.rowCount * grid.rowHeight,
    );
  }

  drawOnShip(p, ship, grid, row, column) {
    if (!ship) return;

    p.colorMode(p.RGB);
    p.noStroke();
    p.fill(this.color);

    const x = grid.startX + column * grid.columnWidth;
    const y = grid.startY + row * grid.rowHeight;

    switch (ship.orientation) {
      case Ship.HORIZONTAL:
        p.rect(
          x,
          y,
          (column + ship.size > grid.columnCount
            ? ship.size + grid.columnCount - column - ship.size
            : ship.size) * grid.columnWidth,
          grid.rowHeight,
        );
        break;
      case Ship.VERTICAL:
        p.rect(
          x,
          y,
          grid.columnWidth,
          (row + ship.size > grid.rowCount
            ? ship.size + grid.rowCount - row - ship.size
            : ship.size) * grid.rowHeight,
        );
        break;
      default:
        throw new Error('Invalis Ship orientation');
    }
  }

  draw(p, x, y, columnWidth, rowHeight) {
    p.colorMode(p.RGB);
    p.noStroke();
    p.fill(this.color);

    p.rect(x, y, columnWidth, rowHeight);
  }
}

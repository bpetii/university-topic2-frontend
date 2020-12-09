import Grid from './Grid';
import WaveBackground from './WaveBackground';
import ColorOverlay from './ColorOverlay';

export default class GuessingGrid {
  constructor(
    startX,
    startY,
    rowCount,
    columnCount,
    rowHeight,
    columnWidth,
    onGuess,
    selectedColor,
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
      true,
    );

    this.onGuess = onGuess;

    this.selectedOverlay = new ColorOverlay(selectedColor);

    this.originalContent = null;
  }

  mousePressed(p) {
    if (this.grid.selectedGrid) {
      const { row, column } = this.grid.selectedGrid;
      if (!this.grid.content[row][column]) this.onGuess(row, column);
    }
  }

  drawBackground(p) {
    this.waveBackground.draw(p);
  }

  drawGrid(p, myTurn) {
    if (this.grid.selectedGrid && myTurn) {
      this.originalContent = this.grid.cloneContent();
      const { row, column } = this.grid.selectedGrid;
      if (!this.grid.content[row][column])
        this.grid.content[row][column] = this.selectedOverlay;
      this.grid.draw(p);
      this.grid.content = this.originalContent;
    } else this.grid.draw(p);
  }
}

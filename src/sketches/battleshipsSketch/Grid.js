export default class Grid {
  constructor(
    startX,
    startY,
    rowCount,
    columnCount,
    rowHeight,
    columnWidth,
    disableGridDraw,
  ) {
    this.startX = startX;
    this.startY = startY;
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.rowHeight = rowHeight;
    this.columnWidth = columnWidth;
    this.disableGridDraw = disableGridDraw;

    this.content = null;
    this.fillEmpty();

    this.selectedGrid = null;
  }

  fillEmpty() {
    this.content = Array.from(Array(this.columnCount), () =>
      new Array(this.rowCount).fill(null),
    );
  }

  cloneContent() {
    var newContent = this.content.map(arr => {
      return arr.slice();
    });
    return newContent;
  }

  drawGridPattern(p) {
    p.colorMode(p.RGB);
    p.stroke(0);
    p.strokeWeight(0.5);
    p.noFill();

    for (let row = 0; row < this.rowCount; row++) {
      let y = this.startY + row * this.rowHeight;
      for (let column = 0; column < this.columnCount; column++) {
        let x = this.startX + column * this.columnWidth;

        p.rect(x, y, this.columnWidth, this.rowHeight);
      }
    }
  }

  drawContent(p) {
    for (let row = 0; row < this.rowCount; row++) {
      let y = this.startY + row * this.rowHeight;
      for (let column = 0; column < this.columnCount; column++) {
        let x = this.startX + column * this.columnWidth;

        let element = this.content[row][column];
        if (element && element.draw)
          element.draw(p, x, y, this.columnWidth, this.rowHeight);
      }
    }
  }

  findSelectedGrid(p) {
    for (let row = 0; row < this.rowCount; row++) {
      let y = this.startY + row * this.rowHeight;
      if (p.mouseY > y && p.mouseY < y + this.rowHeight) {
        for (let column = 0; column < this.columnCount; column++) {
          let x = this.startX + column * this.columnWidth;
          if (p.mouseX > x && p.mouseX < x + this.columnWidth) {
            this.selectedGrid = {
              row,
              column,
            };
            return;
          }
        }
      }
    }
    this.selectedGrid = null;
  }

  draw(p) {
    if (!this.disableGridDraw) this.drawGridPattern(p);
    this.drawContent(p);
    this.findSelectedGrid(p);
  }
}

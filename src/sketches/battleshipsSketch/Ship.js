const basePath = window.location.origin;

export default class Ship {
  static HORIZONTAL = 'HORIZONTAL';
  static VERTICAL = 'VERTICAL';

  static images = null;

  static loadImages(p) {
    Ship.images = {
      ship_2_h: p.loadImage(`${basePath}/ship_2_h.png`),
      ship_2_v: p.loadImage(`${basePath}/ship_2_v.png`),
      ship_3_h: p.loadImage(`${basePath}/ship_3_h.png`),
      ship_3_v: p.loadImage(`${basePath}/ship_3_v.png`),
      ship_4_h: p.loadImage(`${basePath}/ship_4_h.png`),
      ship_4_v: p.loadImage(`${basePath}/ship_4_v.png`),
      ship_5_h: p.loadImage(`${basePath}/ship_5_h.png`),
      ship_5_v: p.loadImage(`${basePath}/ship_5_v.png`),
    };
  }

  constructor(size, orientation = Ship.HORIZONTAL) {
    this.size = size;
    this.orientation = orientation;
  }

  rotate() {
    switch (this.orientation) {
      case Ship.HORIZONTAL:
        this.orientation = Ship.VERTICAL;
        break;
      case Ship.VERTICAL:
        this.orientation = Ship.HORIZONTAL;
        break;
      default:
        throw new Error('Invalid ship orientation');
    }
  }

  draw(p, x, y, columnWidth, rowHeight) {
    let imgPath = `ship_${this.size}_${this.orientation
      .charAt(0)
      .toLowerCase()}`;

    let img = Ship.images[imgPath];

    switch (this.orientation) {
      case Ship.HORIZONTAL:
        p.image(img, x, y, this.size * columnWidth, rowHeight);
        break;
      case Ship.VERTICAL:
        p.image(img, x, y, columnWidth, this.size * rowHeight);
        break;
      default:
        throw new Error('Invalid ship orientation');
    }
  }

  isShip() {
    return true;
  }
}

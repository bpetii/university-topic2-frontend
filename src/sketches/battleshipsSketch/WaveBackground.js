export default class WaveBackground {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.offset = 0;
    this.increment = 0.015;
  }

  draw(p) {
    p.colorMode(p.HSB);
    p.noStroke();
    for (let x = this.x; x < this.x + this.width; x += 10) {
      for (let y = this.y; y < this.y + this.height; y += 10) {
        let noise = p.noise(0.01 * x, 0.01 * y, this.offset);
        let brightness = p.map(noise, 0, 1, 30, 100);
        //let saturation = p.map(noise, 0, 1, 20, 100);
        p.fill(200, 100, brightness);
        p.rect(x, y, 10, 10);
      }
    }
    this.offset += this.increment;
  }
}

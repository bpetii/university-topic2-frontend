import p5 from 'p5';

export default class Firework {
  constructor(p) {
    this.fireworks = [];
    this.gravity = p.createVector(0, 0.2);

    this.hu = p.random(255);
    this.firework = new Particle(p.random(p.width), p.height, this.hu, true, p);
    this.exploded = false;
    this.particles = [];
  }

  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  update(p) {
    //firstUpdate
    if (!this.exploded) {
      this.firework.applyForce(this.gravity);
      this.firework.update(p);
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode(p);
      }
    }
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(this.gravity);
      this.particles[i].update(p);
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode(p) {
    for (var i = 0; i < 250; i++) {
      var particle = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        this.hu,
        false,
        p,
      );
      this.particles.push(particle);
    }
  }
  show(p) {
    if (!this.exploded) {
      this.firework.show(p);
    }
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].show(p);
    }
  }

  draw(p) {
    p.colorMode(p.RGB);
    p.background(0, 0, 0, 50);
    p.colorMode(p.HSB);
    p.stroke(255);
    p.strokeWeight(4);
    p.colorMode(p.RGB);
    if (p.random(1) < 0.03) {
      this.fireworks.push(new Firework(p));
    }

    for (var i = this.fireworks.length - 1; i >= 0; i--) {
      this.fireworks[i].update(p);
      this.fireworks[i].show(p);
      if (this.fireworks[i].done()) this.fireworks.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y, hu, firework, p) {
    this.pos = p.createVector(x, y);
    this.firework = firework;
    this.lifespan = p.random(20, 255);
    this.maxSaturation = p.random(50, 255);
    this.hu = hu;

    if (this.firework) {
      this.vel = p.createVector(0, p.random(-14, -10));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(p.random(2, 40));
    }

    this.acc = p.createVector(0, 0);
  }

  applyForce(force) {
    if (this.firework) this.acc.add(force);
    else this.acc.add(force.copy().mult((this.lifespan / 255) * 0.5 + 0.5));
  }

  update(p) {
    //second update
    if (!this.firework) {
      this.vel.mult(p.map(this.lifespan, 0, 150, 0.6, 0.8, true));
      this.lifespan -= 2.5;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  done() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }
  show(p) {
    p.colorMode(p.HSB);
    if (!this.firework) {
      p.strokeWeight(2);
      p.stroke(
        this.hu,
        p.map(this.lifespan, 0, 255, this.maxSaturation, 0),
        this.lifespan,
      );
    } else {
      p.strokeWeight(4);
      p.stroke(
        this.hu,
        p.map(this.vel.y, -18, 0, 0, 255),
        p.map(this.vel.y, -18, 0, 255, 20),
      );
    }
    p.point(this.pos.x, this.pos.y);
  }
}

import p5 from 'p5';

export default (offsetWidth, offsetHeight) => p => {
  var fireworks = [];
  var gravity;

  function Firework() {
    this.hu = p.random(255);
    this.firework = new Particle(p.random(p.width), p.height, this.hu, true);
    this.exploded = false;
    this.particles = [];

    this.done = function() {
      if (this.exploded && this.particles.length === 0) {
        return true;
      } else {
        return false;
      }
    };
    this.update = function() {
      //firstUpdate
      if (!this.exploded) {
        this.firework.applyForce(gravity);
        this.firework.update();
        if (this.firework.vel.y >= 0) {
          this.exploded = true;
          this.explode();
        }
      }
      for (var i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(gravity);
        this.particles[i].update();
        if (this.particles[i].done()) {
          this.particles.splice(i, 1);
        }
      }
    };

    this.explode = function() {
      for (var i = 0; i < 250; i++) {
        var p = new Particle(
          this.firework.pos.x,
          this.firework.pos.y,
          this.hu,
          false,
        );
        this.particles.push(p);
      }
    };
    this.show = function() {
      if (!this.exploded) {
        this.firework.show();
      }
      for (var i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].show();
      }
    };
  }

  p.setup = () => {
    p.createCanvas(offsetWidth, offsetHeight);
    gravity = p.createVector(0, 0.2);
    p.colorMode(p.HSB);
    p.stroke(255);
    p.strokeWeight(4);
    p.background(0);
  };

  p.draw = () => {
    p.colorMode(p.RGB);
    p.background(0, 0, 0, 50);
    if (p.random(1) < 0.03) {
      fireworks.push(new Firework());
    }

    for (var i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();
      if (fireworks[i].done()) fireworks.splice(i, 1);
    }
  };

  function Particle(x, y, hu, firework) {
    this.pos = p.createVector(x, y);
    this.firework = firework;
    this.lifespan = p.random(20, 255);
    this.maxSaturation = p.random(50, 255);
    this.hu = hu;

    if (this.firework) {
      this.vel = p.createVector(0, p.random(-16, -12));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(p.random(2, 50));
    }

    this.acc = p.createVector(0, 0);

    this.applyForce = function(force) {
      if (this.firework) this.acc.add(force);
      else this.acc.add(force.copy().mult((this.lifespan / 255) * 0.5 + 0.5));
    };

    this.update = function() {
      //second update
      if (!this.firework) {
        this.vel.mult(p.map(this.lifespan, 0, 150, 0.6, 0.8, true));
        this.lifespan -= 2.5;
      }
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    };
    this.done = function() {
      if (this.lifespan < 0) {
        return true;
      } else {
        return false;
      }
    };
    this.show = function() {
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
    };
  }
};

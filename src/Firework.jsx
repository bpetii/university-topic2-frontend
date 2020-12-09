import React, { Component } from 'react';
import p5 from 'p5';

import fireworkSketch from './sketches/fireworkSketch';

export default class Firework extends Component {
  componentDidMount() {
    const { offsetWidth, offsetHeight } = this.wrapper;
    console.log(offsetWidth, offsetHeight);
    this.canvas = new p5(
      fireworkSketch(offsetWidth, offsetHeight),
      this.wrapper,
    );
  }

  componentWillUnmount() {
    this.canvas.remove();
  }

  render() {
    return (
      <div
        className="d-flex flex-fill"
        ref={wrapper => (this.wrapper = wrapper)}
      />
    );
  }
}

import React from 'react';
import p5 from 'p5';
import PropTypes from 'prop-types';

export default class P5Wrapper extends React.Component {
  static propTypes = {
    sketch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
  }

  componentDidMount() {
    this.setCanvas();
    this.passPropsToSketch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sketch !== this.props.sketch) {
      this.setCanvas();
    }
    this.passPropsToSketch();
  }

  componentWillUnmount() {
    this.removeCanvas();
  }

  passPropsToSketch() {
    if (this.canvas.receiveProps) {
      this.canvas.receiveProps(this.props);
    }
  }

  setCanvas() {
    this.removeCanvas();
    this.canvas = new p5(this.props.sketch, this.wrapper.current);
    this.passPropsToSketch();
  }

  removeCanvas() {
    if (this.canvas) this.canvas.remove();
  }

  render() {
    return <div ref={this.wrapper} />;
  }
}

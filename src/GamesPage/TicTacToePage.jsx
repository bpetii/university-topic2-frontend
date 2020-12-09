import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal, Button, Spinner } from 'react-bootstrap';

import { init, join, leave, step } from '../actions/ticTacToeActions';

const CONNECTING_TO_SERVER = 'Connecting to server';
const WAITING_FOR_PLAYER = 'Waiting for new player';

class TicTacToePage extends Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    started: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    ws: PropTypes.object.isRequired,
    init: PropTypes.func.isRequired,
    join: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
    step: PropTypes.func.isRequired,
  };

  state = {
    modalMessage: null,
  };

  componentDidUpdate = oldProps => {
    const newProps = this.props;

    if (!newProps.ws.opening && oldProps.ws.opening) {
      this.props.join();
      this.setState({
        modalMessage: newProps.started ? null : WAITING_FOR_PLAYER,
      });
    }
    if (newProps.started && !oldProps.started)
      this.setState({ modalMessage: null });
  };

  componentDidMount = () => {
    if (this.props.ws.opening)
      this.setState({ modalMessage: CONNECTING_TO_SERVER });
    else {
      this.props.join();
      this.setState({
        modalMessage: this.props.started ? null : WAITING_FOR_PLAYER,
      });
    }
  };

  componentWillUnmount = () => {
    this.props.leave();
    this.props.init();
  };

  render() {
    return (
      <div
        className="container my-auto border border-dark"
        style={{ width: 452, height: 452 }}
      >
        <div className="row">
          {this.props.fields.map(field => (
            <div key={field.id} className="col p-0">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => {
                  this.props.step(field.id);
                }}
                style={{
                  width: 150,
                  height: 150,
                  fontSize: 75,
                  borderRadius: 0,
                }}
                disabled={field.disabled}
              >
                {field.value}
              </button>
            </div>
          ))}
        </div>
        <p className="text-center mt-3 h3">{this.props.message}</p>
        <Modal
          show={this.state.modalMessage !== null}
          onHide={this.handleClose}
          centered
        >
          <Modal.Body className="text-center">
            <div className="text-secondary font-weight-bold mb-3">
              {this.state.modalMessage}
            </div>
            <Spinner animation="border" variant="secondary" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fields: state.games.ticTacToe.fields,
    started: state.games.ticTacToe.started,
    message: state.games.ticTacToe.message,
    ws: state.webSocket,
  };
};

export default connect(
  mapStateToProps,
  { init, join, leave, step },
)(TicTacToePage);

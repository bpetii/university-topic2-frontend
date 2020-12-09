import React, { Component } from 'react';

import { Modal, Button, Spinner } from 'react-bootstrap';

import { connect } from 'react-redux';

import {
  init,
  join,
  leave,
  placedShips,
  guess,
} from '../actions/battleshipsActions';

import P5Wrapper from '../components/P5Wrapper';
import { battleshipsSketch } from '../sketches/battleshipsSketch';

const CONNECTING_TO_SERVER = 'Connecting to server';
const WAITING_FOR_PLAYER = 'Waiting for new player';

class BattleshipsPage extends Component {
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
    if (newProps.gameState && !oldProps.gameState)
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

  render = () => {
    return (
      <div className="mx-auto my-auto">
        <P5Wrapper sketch={battleshipsSketch} {...this.props} />
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
  };
}

BattleshipsPage.propTypes = {};

const mapStateToProps = state => {
  return {
    myGuesses: state.games.battleships.myGuesses,
    foundShips: state.games.battleships.foundShips,

    enemyGuesses: state.games.battleships.enemyGuesses,

    gameState: state.games.battleships.gameState,
    myTurn: state.games.battleships.myTurn,
    message: state.games.battleships.message,
    win: state.games.battleships.win,

    ws: state.webSocket,
  };
};

export default connect(
  mapStateToProps,
  { init, join, leave, placedShips, guess },
)(BattleshipsPage);

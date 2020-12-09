import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import GameSelectorPage from './GameSelectorPage';
import NoMatchPage from '../NoMatchPage';
import TicTacToePage from './TicTacToePage';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { connectWS, closeWS } from '../actions/webSocketActions';
import BattleshipsPage from './BattleshipsPage';

class GamesRouter extends Component {
  static propTypes = {
    connectWS: PropTypes.func.isRequired,
    closeWS: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.props.connectWS();
  };

  componentWillUnmount = () => {
    this.props.closeWS();
  };

  render() {
    return (
      <Switch>
        <Route exact path="/games" component={GameSelectorPage} />
        <Route exact path="/games/tictactoe" component={TicTacToePage} />
        <Route exact path="/games/battleships" component={BattleshipsPage} />

        <Route component={NoMatchPage} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { connectWS, closeWS },
)(GamesRouter);

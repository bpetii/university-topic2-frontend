import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameSelectorPage extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    games: PropTypes.array.isRequired,
  };

  render = () => {
    return (
      <div className="mx-auto my-auto">
        <div className="card-deck mx-auto m-3">
          {this.props.games.map(game => (
            <div
              key={game.id}
              className="shadow card border-dark text-center"
              style={{ width: 400 }}
            >
              <img
                style={{ width: 300 }}
                src={game.imgSrc}
                className="card-img-top mx-auto"
                alt="..."
              />

              <div className="card-body border-top border-dark ">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text">{game.description}</p>
                <Link
                  to={`/games/${game.pathName}`}
                  className="btn btn-outline-primary stretched-link w-50"
                >
                  Play Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    games: state.games.types,
  };
};

export default connect(mapStateToProps)(GameSelectorPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DashboardPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  //return <div>Dashboard {JSON.stringify(this.props.user)}</div>;

  render = () => {
    return (
      <div className="my-auto flex-fill">
        <div className="card mx-auto m-7 shadow" style={{ width: '50%' }}>
          <div className="card-body">
            <h5 class="card-title text-center ">Tic Tac Toe</h5>
            <div className="form-group">
              <h6 class="card-subtitle mb-2 text-muted">Win rate</h6>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped bg-success"
                  role="progressbar"
                  style={{ width: '30%' }}
                  aria-valuenow="30"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  30%
                </div>

                <div
                  className="progress-bar progress-bar-striped bg-info"
                  role="progressbar"
                  style={{ width: '20%' }}
                  aria-valuenow="20"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  20%
                </div>
                <div
                  className="progress-bar progress-bar-striped bg-danger"
                  role="progressbar"
                  style={{ width: '50%' }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  50%
                </div>
              </div>
            </div>
            <h6 class="card-subtitle mb-2 text-muted  text-center">
              Total played: 6
            </h6>
          </div>
        </div>
        <div className="card mx-auto m-3 shadow" style={{ width: '50%' }}>
          <h5 class="card-title text-center m-3">Battleships</h5>
          <div className="card-body">
            <div className="form-group">
              <h6 class="card-subtitle mb-2 text-muted">Win rate</h6>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped bg-success"
                  role="progressbar"
                  style={{ width: '70%' }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  70%
                </div>
                <div
                  className="progress-bar progress-bar-striped bg-danger"
                  role="progressbar"
                  style={{ width: '30%' }}
                  aria-valuenow="30"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  30%
                </div>
              </div>
            </div>
            <h6 class="card-subtitle mb-2 text-muted  text-center">
              Total played: 35
            </h6>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(DashboardPage);

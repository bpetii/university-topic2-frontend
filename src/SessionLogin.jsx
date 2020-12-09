import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sessionLoginUser, clearLoginAlert } from './actions/userActions';

class SessionLogin extends Component {
  componentDidMount = () => {
    this.props.sessionLoginUser();
  };

  componentDidUpdate = prevProps => {
    if (!this.props.requesting && prevProps.requesting)
      this.props.clearLoginAlert();
  };
  render = () => {
    if (!this.props.finished)
      return (
        <div className="d-flex flex-column mx-auto my-auto">
          <div
            className="spinner-border text-secondary mx-auto mt-5"
            style={{ width: '3rem', height: '3rem' }}
            role="status"
          />
          <div>
            <p className="h6 text-secondary mx-auto mt-3">
              <i>Logging in...</i>
            </p>
          </div>
        </div>
      );
    else return this.props.children;
  };
}

SessionLogin.propTypes = {
  finished: PropTypes.bool.isRequired,
  sessionLoginUser: PropTypes.func.isRequired,
  clearLoginAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    finished: state.sessionLogin.finished,
  };
};

export default connect(
  mapStateToProps,
  { sessionLoginUser, clearLoginAlert },
)(SessionLogin);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from './actions/userActions';

class LogoutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.props.logoutUser();
  };

  render = () => {
    return (
      <div className="text-dark text-center mx-auto">
        <h1 className="font-weight-normal display-1 mt-5">Farewell</h1>
        <h5 className="h5 font-weight-light">Next time, bring more cookies.</h5>
      </div>
    );
  };
}

LogoutPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = null;

export default connect(
  mapStateToProps,
  { logoutUser },
)(LogoutPage);

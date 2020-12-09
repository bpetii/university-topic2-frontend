import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

class Protected extends Component {
  static propTypes = {
    redirect: PropTypes.bool,
    user: PropTypes.object,
  };

  render() {
    const { pathname } = this.props.location;
    if (this.props.user) return this.props.children;
    else if (this.props.redirect)
      return <Redirect to={`/login?to=${pathname}`} />;
    else return null;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(withRouter(Protected));

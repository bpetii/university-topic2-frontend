import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router-dom';
import Protected from './Protected';

export default class ProtectedRoute extends Component {
  static propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired,
  };

  render() {
    return (
      <Route
        exact={this.props.exact || false}
        path={this.props.path}
        render={routeProps => (
          <Protected {...routeProps} redirect>
            <this.props.component />
          </Protected>
        )}
      />
    );
  }
}

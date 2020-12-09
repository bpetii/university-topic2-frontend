import React, { Component } from 'react';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';
import SignupPage from './SignupPage';
import GamesPage from './GamesPage';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';

import NoMatchPage from './NoMatchPage';

import { Switch, Route, Redirect } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import SessionLogin from './SessionLogin';
import DashboardPage from './DashboardPage';

export default class App extends Component {
  render() {
    return (
      <div className="d-flex flex-fill flex-column bg-light">
        <SessionLogin>
          <div>
            <Navbar />
            <Route
              exact
              path="/"
              render={routeProps => <Redirect {...routeProps} to="/home" />}
            />
          </div>
          <div className="d-flex flex-fill">
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/logout" component={LogoutPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/home" component={HomePage} />

              <ProtectedRoute
                exact
                path="/dashboard"
                component={DashboardPage}
              />
              <ProtectedRoute exact path="/profile" component={ProfilePage} />

              <ProtectedRoute path="/games" component={GamesPage} />

              <Route component={NoMatchPage} />
            </Switch>
          </div>
        </SessionLogin>
      </div>
    );
  }
}

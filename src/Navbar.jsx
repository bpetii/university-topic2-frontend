import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [
        { name: 'Home', to: '/home' },
        { name: 'Dashboard', to: '/dashboard', loginRequired: true },
        { name: 'Games', to: '/games', loginRequired: true },
      ],
    };
  }

  render = () => {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul className="navbar-nav mr-auto">
            {this.state.links
              .filter(link => !link.loginRequired || this.props.user)
              .map(link => (
                <NavLink key={link.name} className="nav-link" to={link.to}>
                  {link.name}
                </NavLink>
              ))}
          </ul>
        </div>
        <div className="mx-auto order-0">
          <Link className="navbar-brand" to="/">
            Quatro
          </Link>
        </div>
        <div className="navbar-collapse collapse w-100 order-2 dual-collapse2">
          <div className="navbar-nav ml-auto">
            <div className="collapse dual-collapse2 d-flex">
              <span className="nav-brand border-top border-primary w-100 mx-auto my-2" />
            </div>
            {this.props.user ? (
              <div className="d-flex">
                <NavLink to="/profile" className="nav-link">
                  {`${this.props.user.firstName} ${this.props.user.lastName}`}
                </NavLink>
                <NavLink
                  to="/logout"
                  className="nav-link btn btn-light py-0 px-2 my-1 ml-auto"
                  style={{ borderRadius: '47%' }}
                >
                  <svg height="15" width="15" viewBox="0 0 512 512" fill="grey">
                    <path
                      d="M255.15,468.625H63.787c-11.737,0-21.262-9.526-21.262-21.262V64.638c0-11.737,9.526-21.262,21.262-21.262H255.15
			c11.758,0,21.262-9.504,21.262-21.262S266.908,0.85,255.15,0.85H63.787C28.619,0.85,0,29.47,0,64.638v382.724
			c0,35.168,28.619,63.787,63.787,63.787H255.15c11.758,0,21.262-9.504,21.262-21.262
			C276.412,478.129,266.908,468.625,255.15,468.625z"
                    />
                    <path
                      d="M505.664,240.861L376.388,113.286c-8.335-8.25-21.815-8.143-30.065,0.213s-8.165,21.815,0.213,30.065l92.385,91.173
			H191.362c-11.758,0-21.262,9.504-21.262,21.262c0,11.758,9.504,21.263,21.262,21.263h247.559l-92.385,91.173
			c-8.377,8.25-8.441,21.709-0.213,30.065c4.167,4.21,9.653,6.336,15.139,6.336c5.401,0,10.801-2.041,14.926-6.124l129.276-127.575
			c4.04-3.997,6.336-9.441,6.336-15.139C512,250.302,509.725,244.88,505.664,240.861z"
                    />
                  </svg>
                </NavLink>
              </div>
            ) : (
              <div className="d-flex">
                <NavLink to="/login" className="nav-link mr-2">
                  Log In
                </NavLink>
                <NavLink to="/signup" className="btn btn-primary ml-auto">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".dual-collapse2"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </nav>
    );
  };
}

Navbar.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Navbar);

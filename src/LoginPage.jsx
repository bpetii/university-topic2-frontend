import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser, clearLoginAlert } from './actions/userActions';

import queryString from 'query-string';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: queryString.parse(props.location.search).email || '',
        password: '',
      },
    };

    this.redirectOnSuccess =
      queryString.parse(props.location.search).to || '/dashboard';
  }

  handleValueChange = event => {
    const { name, value } = event.target;

    let data = { ...this.state.data, [name]: value };
    this.setState({ data });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.props.loginUser(this.state.data);
  };

  componentWillUnmount = () => {
    this.props.clearLoginAlert();
  };

  render = () => {
    if (this.props.user) return <Redirect to={this.redirectOnSuccess} />;
    else
      return (
        <div className="my-auto flex-fill">
          <div className="shadow card mx-auto" style={{ maxWidth: 350 }}>
            <div className="card-body">
              <form
                onSubmit={this.handleSubmit}
                className="container form text-center"
              >
                <img
                  className=""
                  src="login.png"
                  alt=""
                  width="100"
                  height="100"
                />
                {/* <h1 className='h3 mb-1 font-weight-normal'>Please log in</h1> */}
                {/* <h2 className='h6 mb-3 font-weight-light'>Something funny</h2> */}
                <input
                  name="email"
                  type="email"
                  className="form-control my-1"
                  placeholder="Email address"
                  required
                  value={this.state.data.email}
                  onChange={this.handleValueChange}
                  style={{ height: 50 }}
                  disabled={this.props.requesting}
                />
                <input
                  name="password"
                  type="password"
                  className="form-control my-1"
                  placeholder="Password"
                  required
                  value={this.state.data.password}
                  onChange={this.handleValueChange}
                  style={{ height: 50 }}
                  disabled={this.props.requesting}
                />
                {(() => {
                  if (this.props.alert) {
                    const { type, message } = this.props.alert;
                    return (
                      <div className={`alert ${type} mt-3`} role="alert">
                        {message}
                      </div>
                    );
                  }
                })()}
                <button
                  className="btn btn-lg btn-primary btn-block mt-3 w-50 mx-auto"
                  type="submit"
                  disabled={this.props.requesting}
                >
                  {this.props.requesting ? (
                    <span
                      className="spinner-border spinner-border-sm m-1"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    'Log In'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
  };
}

LoginPage.propTypes = {
  requesting: PropTypes.bool.isRequired,
  alert: PropTypes.object,
  user: PropTypes.object,
  loginUser: PropTypes.func.isRequired,
  clearLoginAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    requesting: state.login.requesting,
    alert: state.login.alert,
    user: state.auth.user,
  };
};

export default connect(
  mapStateToProps,
  { loginUser, clearLoginAlert },
)(LoginPage);

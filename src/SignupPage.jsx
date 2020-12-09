import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signupUser, clearSignupAlert } from './actions/userActions';

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: '',
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
      },
    };
  }

  handleValueChange = event => {
    const { name, value } = event.target;

    let data = { ...this.state.data, [name]: value };
    this.setState({ data });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.props.signupUser(this.state.data);
  };

  componentWillUnmount = () => {
    this.props.clearSignupAlert();
  };

  render = () => {
    if (this.props.alert && this.props.alert.type === 'alert-success')
      return <Redirect to={`/login?email=${this.state.data.email}`} />;
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
                  src="signup.png"
                  alt=""
                  width="100"
                  height="100"
                />
                {/* <h1 className='h3 mb-1 font-weight-normal'>Welcome</h1> */}
                {/* <h2 className='h6 mb-3 font-weight-light'>
                  Just a few clicks away
                </h2> */}
                <input
                  name="email"
                  type="email"
                  className="form-control mb-1 mt-3"
                  placeholder="Email address"
                  required
                  value={this.state.data.email}
                  onChange={this.handleValueChange}
                  style={{ height: 50 }}
                  disabled={this.props.requesting}
                />
                <input
                  name="userName"
                  type="text"
                  className="form-control my-1"
                  placeholder="Username"
                  required
                  minLength="4"
                  maxLength="20"
                  value={this.state.data.userName}
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
                  minLength="8"
                  maxLength="100"
                  value={this.state.data.password}
                  onChange={this.handleValueChange}
                  style={{ height: 50 }}
                  disabled={this.props.requesting}
                />
                <div className="input-group my-1">
                  <input
                    name="firstName"
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    required
                    maxLength="50"
                    value={this.state.data.firstName}
                    onChange={this.handleValueChange}
                    style={{ height: 50 }}
                    disabled={this.props.requesting}
                  />
                  <input
                    name="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    required
                    maxLength="50"
                    value={this.state.data.lastName}
                    onChange={this.handleValueChange}
                    style={{ height: 50 }}
                    disabled={this.props.requesting}
                  />
                </div>
                {this.props.alert ? (
                  <div
                    className={`alert ${this.props.alert.type} mt-3`}
                    role="alert"
                  >
                    {this.props.alert.message}
                  </div>
                ) : null}
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
                    'Sign Up'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
  };
}

SignupPage.propTypes = {
  requesting: PropTypes.bool.isRequired,
  alert: PropTypes.object,
  signupUser: PropTypes.func.isRequired,
  clearSignupAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    requesting: state.signup.requesting,
    alert: state.signup.alert,
  };
};

export default connect(
  mapStateToProps,
  { signupUser, clearSignupAlert },
)(SignupPage);

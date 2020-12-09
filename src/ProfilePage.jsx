import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const urlToProfil = 'https://onlab-game-app.azurewebsites.net/api/user/profile';

class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      requestSent: false,
      alert: '',
      editing: false,
      data: {
        newFirstName: props.user.firstName || '',
        newLastName: props.user.lastName || '',
        newUsername: props.user.userName || '',
        oldPassword: 'testestest',
        newPassword: 'BiroPeti',
      },
    };
  }

  handleValueChange = event => {
    const { name, value } = event.target;

    let data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
  };

  handleSubmit = async event => {
    event.preventDefault();

    if (this.state.requestSent) return;
    try {
      this.setState({ requestSent: true });
      const response = await fetch(urlToProfil, {
        method: 'PUT',
        body: JSON.stringify(this.state.data),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.props.token,
        },
      });

      console.log(response);
    } catch (error) {
      this.setState({ alert: 'Something went wrong' });
    }
  };

  handleEdit = async event => {
    event.preventDefault();
    this.setState({ editing: !this.state.editing });
  };

  handlePassword = async event => {
    event.preventDefault();
    if (this.state.data.oldPassword === this.state.data.newPassword) {
      console.log('nem lehet ugyan az ');
      return;
    }
  };

  render = () => {
    return (
      <div className="my-auto flex-fill">
        <div className="shadow card mx-auto" style={{ maxWidth: 500 }}>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <ul
                class="nav nav-pills nav-fill navbar navbar-light"
                id="pills-tab"
                role="tablist"
                style={{ COLOR: '#007BFF' }}
              >
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="pills-home-tab"
                    data-toggle="pill"
                    href="#pills-home"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Profile
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="pills-profile-tab"
                    data-toggle="pill"
                    href="#pills-profile"
                    role="tab"
                    background="#007BFF"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Password
                  </a>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <form>
                    <div class="form-group">
                      <div class="col-xs-2">
                        <label> Username</label>
                        <input
                          placeholder="Username"
                          name="newUsername"
                          type="text"
                          class="form-control"
                          onChange={this.handleValueChange}
                          value={this.state.data.newUsername}
                          disabled={!this.state.editing}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label>First name</label>
                      <input
                        placeholder="First name"
                        name="newFirstName"
                        type="text"
                        class="form-control"
                        onChange={this.handleValueChange}
                        value={this.state.data.newFirstName}
                        disabled={!this.state.editing}
                      />
                    </div>
                    <div class="form-group">
                      <label>Last name</label>
                      <input
                        placeholder="Last name"
                        name="newLastName"
                        type="text"
                        class="form-control"
                        value={this.state.data.newLastName}
                        onChange={this.handleValueChange}
                        disabled={!this.state.editing}
                      />
                    </div>
                    <form className="mx-auto mt-3 " style={{ maxWidth: 500 }}>
                      <button
                        type="button"
                        class="btn btn-success"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        disabled={!this.state.editing}
                      >
                        Save
                      </button>
                      {/* Modal components */}
                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Confirm password
                              </h5>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <label>Password</label>
                              <input
                                placeholder="Password"
                                name="oldPassword"
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                onChange={this.handleValueChange}
                              />
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="submit" class="btn btn-success">
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        class="btn btn-warning float-right"
                        onClick={this.handleEdit}
                      >
                        Edit
                      </button>
                    </form>
                  </form>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <form>
                    <div class="form-group">
                      <div class="form-group">
                        <label for="exampleInputPassword1">New Password</label>
                        <input
                          name="newPassword"
                          type="password"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="New password"
                          onChange={this.handleValueChange}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">
                        Confirm Password
                      </label>
                      <input
                        placeholder="Confrim password"
                        name="newPassword"
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        onChange={this.handleValueChange}
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Old Password</label>
                      <input
                        name="oldPassword"
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Old password"
                        onChange={this.handleValueChange}
                      />
                    </div>
                    <button
                      type="submit"
                      class="btn btn-success"
                      onClick={this.handlePassword}
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(ProfilePage);

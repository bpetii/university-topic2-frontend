import React, { Component } from 'react';

class HomePage extends Component {
  render() {
    return (
      <div className="my-auto flex-fill text-center">
        <h1 class="display-2">Welcome ☺</h1>
        <p class="lead">Play simple classic games with your friends</p>
        {/* <hr class="my-4" /> */}
        <p class="lead mt-5">
          Currently <b>15</b> players
        </p>
        <p class="lead">
          <div className="btn btn-primary btn-lg" role="button">
            Join Now
          </div>
        </p>
      </div>
    );
  }
}

export default HomePage;

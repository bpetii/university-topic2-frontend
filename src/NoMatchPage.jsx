import React, { Component } from 'react';

export default class NoMatchPage extends Component {
  render = () => {
    return (
      <div className="text-dark text-center mx-auto">
        <h1 className="font-weight-normal display-1 mt-5">404</h1>
        <h5 className="h5 font-weight-light">Sorry, page was not found</h5>
      </div>
    );
  };
}

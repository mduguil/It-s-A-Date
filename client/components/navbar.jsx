import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-container">
        <i className="far fa-calendar"></i>
        <i className="fas fa-clipboard-list"></i>
        <i className="fas fa-plus-circle"></i>
        <i className="far fa-envelope"></i>
        <i className="fas fa-cog"></i>
      </div>
    );
  }
}

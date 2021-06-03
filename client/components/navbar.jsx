import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <i className={this.props.calendarIcon}></i>
          <i className="fas fa-clipboard-list nav-icon"></i>
          <i className="fas fa-plus-circle nav-icon new-date-icon"></i>
          <i className="far fa-envelope nav-icon"></i>
          <i className="fas fa-cog nav-icon"></i>
        </div>
      </div>
    );
  }
}

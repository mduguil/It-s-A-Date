import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const classNames = require('classnames');

function NavbarLink({ icon, to, activeOnlyWhenExact, title }) {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
  const className = classNames({
    fas: true,
    [icon]: true,
    'nav-icon': true,
    currPage: match
  });
  return (
    <Link to={to} title={title}>
      <i className={className}></i>
    </Link>
  );
}

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <NavbarLink
            to='/'
            icon="fa-calendar"
            activeOnlyWhenExact={true}
            title="Home"
          />
          <NavbarLink
            to='/weekly-view'
            title="Daily Schedule"
            icon="fa-clipboard"
          />
          <NavbarLink
            to='/date-form'
            title="New Date"
            icon="fa-plus-circle new-date-icon"
          />
          <NavbarLink
            to='/invitations'
            title="Invitations"
            icon="fa-envelope"
          />
          <NavbarLink
            to='./settings'
            title="Settings"
            icon="fa-cog"
          />
        </div>
      </div>
    );
  }
}

import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const classNames = require('classnames');

function NavbarLink({ icon, to, activeOnlyWhenExact }) {
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
    <Link to={to}>
      <i className={className}></i>
    </Link>
  );
}

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <NavbarLink to='/'
            icon="fa-calendar"
            activeOnlyWhenExact={true}
          />
          <NavbarLink
            to='/weekly-view'
            icon="fa-clipboard"
          />
          <NavbarLink to='/date-form'
            icon="fa-plus-circle new-date-icon"
          />
          <NavbarLink icon="fa-envelope" />
          <NavbarLink icon="fa-cog"/>
        </div>
      </div>
    );
  }
}

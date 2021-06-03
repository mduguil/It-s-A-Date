import React from 'react';
import Navbar from './navbar';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="container">
        <div className="calendar -container">
          <h1 className="calendar-title center row">Calendar</h1>
        </div>
        <Navbar calendarIcon="far fa-calendar nav-icon home-calendar-icon"/>
      </div>
    );
  }
}

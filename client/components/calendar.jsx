import React from 'react';
import Navbar from './navbar';
import moment from 'moment';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const startDay = moment().clone().startOf('month').startOf('week');
    const endDay = moment().clone().endOf('month').endOf('week');
    const day = startDay.clone().subtract(1, 'day');

    this.state = {
      daysOfTheWeek,
      startDay,
      endDay,
      day,
      calendar: []
    };
    this.getWeeklyDates = this.getWeeklyDates.bind(this);
    this.isToday = this.isToday.bind(this);

  }

  getWeeklyDates() {
    while (this.state.day.isBefore(this.state.endDay, 'day')) {
      this.state.calendar.push(
        Array(7).fill('dayOfTheWeek').map(() => this.state.day.add(1, 'day').clone())
      );
    }
  }

  isToday(day) {
    return moment(new Date()).isSame(day, 'day');
  }

  dayStyle(day) {
    if (this.isToday(day)) return 'today';
    return '';
  }

  render() {
    this.getWeeklyDates();
    return (
      <div className="container">
        <div className="calendar -container">
          <h1 className="calendar-title center row">Calendar</h1>
          <div className="month-name-container">
            <div className="month-name">June</div>
          </div>
          <div className="days-of-the-week">
            {this.state.daysOfTheWeek.map(day => {
              return (
                <div className="day-name" key={day}>{day}</div>
              );
            })}
          </div>
          <div className="calendar">
            {this.state.calendar.map((week, wi) => {
              return (
                <div key={wi} className="week">
                  {week.map((day, di) => {
                    return (
                      <div key={di} className="day-number">
                        <div className={this.dayStyle(day)}>
                          {day.format('D')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <Navbar calendarIcon="far fa-calendar nav-icon home-calendar-icon"/>
      </div>
    );
  }
}

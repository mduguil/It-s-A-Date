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
  }

  getWeeklyDates() {
    while (this.state.day.isBefore(this.state.endDay, 'day')) {
      this.state.calendar.push(
        Array(7).fill('dayOfTheWeek').map(() => this.state.day.add(1, 'day').clone())
      );
    }
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
                <div className="weekday" key={day}>{day}</div>
              );
            })}
          </div>
              <div>
                {this.state.calendar.map((week, wi) => {
                  return (
                    <div key={wi}>
                      {week.map((day, di) => {
                        return (
                          <div key={di}>
                            {day.format('D')}
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

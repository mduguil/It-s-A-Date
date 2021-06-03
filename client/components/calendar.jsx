import React from 'react';
import Navbar from './navbar';
import moment from 'moment';

function generateCalendarDays(startDay, endDay) {
  const calendarDays = [];

  const day = startDay.clone().subtract(1, 'day');
  while (day.isBefore(endDay, 'day')) {
    calendarDays.push(
      Array(7).fill('dayOfTheWeek').map(() => day.add(1, 'day').clone())
    );
  }

  return calendarDays;
}

function getStartEndDay(currMonth) {
  return {
    startDay: currMonth.clone().startOf('month').startOf('week'),
    endDay: currMonth.clone().endOf('month').endOf('week')
  };
}

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const currMonth = moment();

    const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const { startDay, endDay } = getStartEndDay(currMonth);

    this.state = {
      daysOfTheWeek,
      startDay,
      endDay,
      calendar: [],
      selectedDay: null,
      currMonth: currMonth,
      calendarDays: generateCalendarDays(startDay, endDay)
    };

    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);

  }

  prevMonth() {
    const currMonth = this.state.currMonth.clone().subtract(1, 'month');
    const { startDay, endDay } = getStartEndDay(currMonth);

    this.setState({
      currMonth,
      calendarDays: generateCalendarDays(startDay, endDay)
    });
  }

  nextMonth() {
    const currMonth = this.state.currMonth.clone().add(1, 'month');
    const { startDay, endDay } = getStartEndDay(currMonth);

    this.setState({
      currMonth,
      calendarDays: generateCalendarDays(startDay, endDay)
    });
  }

  isSelected(day) {
    return moment(day).isSame(day, 'day');
  }

  isToday(day) {
    return moment(new Date()).isSame(day, 'day');
  }

  dayStyle(day) {
    if (this.isToday(day)) return 'today';
    if (this.isSelected(day)) return 'selected-day';
    return '';
  }

  render() {
    return (
      <div className="container">
        <div className="calendar -container">
          <h1 className="calendar-title center row">Calendar</h1>
          <div className="month-name-container">
            <i className="fas fa-chevron-left" onClick={() => this.prevMonth()}></i>
            <div className="month-name">{this.state.currMonth.format('MMMM')}</div>
            <i className="fas fa-chevron-right" onClick={() => this.nextMonth()}></i>
          </div>
          <div className="days-of-the-week">
            {this.state.daysOfTheWeek.map(day => {
              return (
                <div className="day-name" key={day}>{day}</div>
              );
            })}
          </div>
          <div className="calendar">
            {this.state.calendarDays.map((week, wi) => {
              return (
                <div key={wi} className="week">
                  {week.map((day, di) => {
                    return (
                      <div
                        key={di}
                        className="day-number"
                        onClick={event => { this.isSelected(day); }}
                      >
                        <div value={day.format('D')} className={this.dayStyle(day)}>
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
        <Navbar calendarIcon="far fa-calendar nav-icon home-calendar-icon" />
      </div>
    );
  }
}

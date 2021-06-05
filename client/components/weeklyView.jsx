import React from 'react';
import moment from 'moment';

function generateWeeklyCalendarDays(startDay, endDay) {
  const calendarDays = [];

  const day = startDay.clone().subtract(1, 'day');
  while (day.isBefore(endDay, 'day')) {
    calendarDays.push(
      Array(1).fill('dayOfTheWeek').map(() => day.add(1, 'day').clone())
    );
  }

  return calendarDays;
}

function getStartEndWeekDay(selectedDay) {
  return {
    startDay: moment(selectedDay).clone().startOf('week'),
    endDay: moment(selectedDay).clone().endOf('week')
  };
}

export default class WeeklyView extends React.Component {
  constructor(props) {
    super(props);
    const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const { startDay, endDay } = getStartEndWeekDay(this.props.selectedDay);

    this.state = {
      daysOfTheWeek,
      calendarDays: generateWeeklyCalendarDays(startDay, endDay),
      currMonth: this.props.selectedDay.clone()
    };
    this.isToday = this.isToday.bind(this);

  }

  isToday(day) {
    return moment(new Date()).isSame(day, 'day');
  }

  dayStyle(day) {
    if (this.hasDateScheduled(day)) return 'scheduled-date';
    if (this.isToday(day)) return 'today';
    return '';
  }

  render() {
    return (
      <div className="container">
        <div className="calendar-container">
          <h1 className="calendar-title center row">Calendar</h1>
          <div className="calendar">
            <div className="month-name-container">
              <i className="fas fa-chevron-left week-controls" onClick={() => this.prevWeek()}></i>
              <div className="month-name">{this.state.currMonth.format('MMMM')}</div>
              <i className="fas fa-chevron-right week-controls" onClick={() => this.nextWeek()}></i>
            </div>
            <div className="days-of-the-week">
              {this.state.daysOfTheWeek.map(day => {
                return (
                  <div className="day-name" key={day}>{day}</div>
                );
              })}
            </div>
            <div className="weekly-calendar-numbers">
              {this.state.calendarDays.map((day, di) => {
                return (
                  <div
                    key={di}
                    className="day-number"
                    onClick={this.props.handleDayClick}
                  >
                    <div className={this.dayStyle(day)}>
                      {day.format('D')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

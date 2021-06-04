import React from 'react';
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
      calendarDays: generateCalendarDays(startDay, endDay),
      dates: []
    };

    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.isNotCurrMonthNums = this.isNotCurrMonthNums.bind(this);
    this.hasDateScheduled = this.hasDateScheduled.bind(this);
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
    if (moment(day).isSame(day, 'day')) {
      return 'selected-day';
    }
  }

  isToday(day) {
    return moment(new Date()).isSame(day, 'day');
  }

  isNotCurrMonthNums(day) {
    const firstDay = this.state.currMonth.clone().startOf('month');
    const lastDay = this.state.currMonth.clone().endOf('month');
    return !moment(day).isBetween(firstDay - 1, lastDay + 1);
  }

  dayStyle(day) {
    if (this.hasDateScheduled(day)) return 'scheduled-date';
    if (this.isToday(day)) return 'today';
    if (this.isNotCurrMonthNums(day)) return 'extra-days';
    return '';
  }

  hasDateScheduled(day) {
    const dates = this.state.dates.slice();
    let hasDateScheduled = false;
    dates.some(date => {
      const dayArr = date.day.split(' ');
      const [a, b] = dayArr;
      dayArr[0] = +b + 1;
      dayArr[1] = +a;
      const dateDay = dayArr.join(' ');
      if (moment(new Date(dateDay)).isSame(new Date(day))) {
        hasDateScheduled = true;
      }
      return hasDateScheduled;
    });
  }

  componentDidMount() {
    fetch('api/dates')
      .then(res => res.json())
      .then(dates => {
        this.setState({
          dates: dates
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="calendar-container">
          <h1 className="calendar-title center row">Calendar</h1>
          <div className="calendar">
            <div className="month-name-container">
              <i className="fas fa-chevron-left month-controls" onClick={() => this.prevMonth()}></i>
              <div className="month-name">{this.state.currMonth.format('MMMM')}</div>
              <i className="fas fa-chevron-right month-controls" onClick={() => this.nextMonth()}></i>
            </div>
            <div className="days-of-the-week">
              {this.state.daysOfTheWeek.map(day => {
                return (
                  <div className="day-name" key={day}>{day}</div>
                );
              })}
            </div>
            <div className="calendar-numbers">
              {this.state.calendarDays.map((week, wi) => {
                return (
                  <div key={wi} className="week">
                    {week.map((day, di) => {
                      return (
                        <div
                          key={di}
                          className="day-number"
                          onClick={event => {
                            this.isSelected(day);
                          }}
                        >
                          <div value={day.format('D M Y')} className={this.dayStyle(day)}>
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
        </div>
      </div>
    );
  }
}

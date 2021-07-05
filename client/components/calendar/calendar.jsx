import React from 'react';
import moment from 'moment';
import { generateCalendarDays, getStartEndDay, dayStyle } from './utils';
import UpcomingDates from './upcomingDates';
import { API_URLS } from '../../constants';

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
      currMonth: currMonth,
      calendarDays: generateCalendarDays(startDay, endDay),
      byDate: [],
      isfetching: false,
      err: ''
    };

    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
  }

  componentDidMount() {
    this.setState({
      isfetching: true
    });
    fetch(API_URLS.getDate)
      .then(res => res.json())
      .then(dates => {
        this.setState({
          byDate: dates.reduce((acc, date) => ({
            ...acc,
            [date.day]: acc[date.day] ? [...acc[date.day], date] : [date]
          }), {}),
          isfetching: false
        });
      })
      .catch(err => {
        this.setState({
          err: err.toString()
        });
      });
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
                          onClick={event => this.props.handleDayClick(event, day)}
                        >
                          <div
                            value={day.format('D M Y')}
                            className={dayStyle(
                              {
                                day,
                                currMonth: this.state.currMonth,
                                byDate: this.state.byDate
                              })}
                          >
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
        <div>
          <div className="upcoming-date-title">
            Upcoming Dates
          </div>
          {this.state.err
            ? <div>{this.state.err}</div>
            : <>
              {this.state.isFetching && <div className="loading-placeholder center">Loading...</div>}
              <UpcomingDates
                byDate={this.state.byDate}
              />
              </>
          }
        </div>
      </div>
    );
  }
}

import moment from 'moment';
import React from 'react';
import { API_URLS } from '../../constants';
import { generateWeeklyCalendarDays, getStartEndWeekDay, weeklyViewDayStyle, hasDateScheduled } from './utils';
import ShowDatesScheduled from './showDatesScheduled';

export default class WeeklyView extends React.Component {
  constructor(props) {
    super(props);
    const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const { startDay, endDay } = getStartEndWeekDay(this.props.selectedDay);
    const selectedDay = this.props.selectedDay;
    this.state = {
      selectedDay,
      daysOfTheWeek,
      calendarDays: generateWeeklyCalendarDays(startDay, endDay),
      currMonth: moment(this.props.selectedDay),
      currWeek: moment(this.props.selectedDay),
      byDate: [],
      isfetching: false
    };
    this.prevWeek = this.prevWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.updateSelectedDay = this.updateSelectedDay.bind(this);
  }

  updateSelectedDay(day) {
    this.setState({
      selectedDay: moment(day._d)
    });
  }

  prevWeek() {
    const currWeek = this.state.currWeek.clone().subtract(1, 'week');
    const { startDay, endDay } = getStartEndWeekDay(currWeek);

    this.setState({
      currWeek,
      calendarDays: generateWeeklyCalendarDays(startDay, endDay)
    });
  }

  nextWeek() {
    const currWeek = this.state.currWeek.clone().add(1, 'week');
    const { startDay, endDay } = getStartEndWeekDay(currWeek);

    this.setState({
      currWeek,
      calendarDays: generateWeeklyCalendarDays(startDay, endDay)
    });
  }

  componentDidMount() {
    this.setState({
      isfetching: true
    });
    fetch(API_URLS.getDate)
      .then(res => res.json())
      .then(dates => {
        this.setState({
          byDate: dates.reduce((acc, item) => ({
            ...acc,
            [item.day]: acc[item.day] ? [...acc[item.day], item] : [item]
          }), {}),
          isfetching: false
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="calendar-container">
          <h1 className="calendar-title center row">Schedule</h1>
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
            <div className="calendar-numbers">
              <div className="week">
                {this.state.calendarDays.map((day, di) => {
                  return (
                    <div
                      key={di}
                      className="day-number"
                      onClick={this.props.handleDayClick}
                    >
                      <div
                      className="weekly-day-number-container"
                      onClick={event => this.updateSelectedDay(day)}
                      >
                        <div
                          className={weeklyViewDayStyle(
                            {
                              day,
                              currMonth: this.state.currMonth,
                              byDate: this.state.byDate,
                              selectedDay: this.state.selectedDay
                            }
                          )}>
                          {day.format('D')}
                          </div>
                          {hasDateScheduled(day, this.state.byDate)
                            ? <div className="weekly-scheduled-date"></div>
                            : ''
                          }
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {this.state.isfetching
          ? <div className="loading-placeholder center">Loading...</div>
          : <ShowDatesScheduled
              byDate={this.state.byDate}
              currMonth={this.state.currMonth}
              selectedDay={this.state.selectedDay}
            />
        }
      </div>
    );
  }
}

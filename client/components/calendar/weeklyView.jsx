import moment from 'moment';
import React from 'react';
import { API_URLS } from '../../constants';
import { generateWeeklyCalendarDays, getStartEndWeekDay, dayStyle } from './utils';
import ShowDatesScheduled from './showDatesScheduled';

export default class WeeklyView extends React.Component {
  constructor(props) {
    super(props);
    const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const { startDay, endDay } = getStartEndWeekDay(this.props.selectedDay);
    this.state = {
      daysOfTheWeek,
      calendarDays: generateWeeklyCalendarDays(startDay, endDay),
      currMonth: moment(this.props.selectedDay),
      byDate: []
    };
  }

  componentDidMount() {
    fetch(API_URLS.getDate)
      .then(res => res.json())
      .then(dates => {
        this.setState({
          byDate: dates.reduce((acc, item) => ({
            ...acc,
            [item.day]: acc[item.day] ? [...acc[item.day], item] : [item]
          }), {})
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
                        className={dayStyle(
                          {
                            day,
                            currMonth: this.state.currMonth,
                            byDate: this.state.byDate
                          }
                        )}>
                        {day.format('D')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <ShowDatesScheduled
          byDate={this.state.byDate}
          selectedDay={this.state.currMonth}/>
      </div>
    );
  }
}

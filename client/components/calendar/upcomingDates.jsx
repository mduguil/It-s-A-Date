import moment from 'moment';
import React from 'react';
import { getFutureDates, styleDailyScheduleActivity, activityIcons, hasFutureDates } from './utils';

export default class UpcomingDates extends React.Component {
  render() {
    return (
      <div>
        {hasFutureDates(this.props.byDate)
          ? <>
            <div className="upcoming-dates-container">
              {getFutureDates(this.props.byDate).slice(0, 3).map((date, i) => {
                return (
                  <div className="upcoming-date-schedule" key={i}>
                    <div className="upcoming-date-activity-container">
                      <div className={styleDailyScheduleActivity(date.activity)}>
                        <i className={activityIcons[date.activity.split(' ')[0].toLowerCase()]}></i>
                      </div>
                    </div>
                    <div className="upcoming-date-info-container">
                      <div className="upcoming-dates-invitees" key="activity">
                        {date.activity} <span className="filler-word">on</span> {moment(date.day).format('dddd, MMMM D')}
                      </div>
                      <div className="scheduled-time" key="time">
                        {moment(date.day + ' ' + date.time).format('h:m a')}
                      </div>
                      <div className="scheduled-invites-container" key="invite">
                        With <span className="scheduled-invitees">{date.invites}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            </>
          : <div className="scheduled-date-placeholder-container center">
              No Upcoming Dates
            </div>
        }
      </div>
    );
  }
}

moment(new Date()).format('M D YYYY');

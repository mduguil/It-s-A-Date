import moment from 'moment';
import React from 'react';
import { getFutureDates, styleDailyScheduleActivity, activityIcons } from './utils';

export default class UpcomingDates extends React.Component {
  render() {
    return (
      <div>
        <div className="upcoming-date-title">
          Upcoming Dates
        </div>
        {this.props.byDate
          ? <>
            <div className="upcoming-dates-container">
              {getFutureDates(this.props.byDate).map((date, i) => {
                return (
                  <div className="upcoming-date-schedule" key={i}>
                    <div className="upcoming-date-activity-container">
                      <div className={styleDailyScheduleActivity(date.activity)}>
                        <i className={activityIcons[date.activity.split(' ')[0].toLowerCase()]}></i>
                      </div>
                    </div>
                    <div className="upcoming-date-info-container">
                      <div className="upcoming-dates-invitees" key="invite">
                        {date.activity} <span className="filler-word">on</span> {date.day}
                      </div>
                      <div className="scheduled-time" key="time">
                        {date.time}
                      </div>
                      <div className="scheduled-invites-container" key="time">
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

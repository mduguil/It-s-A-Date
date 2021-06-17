import React from 'react';
import { hasDateScheduled, styleDailyScheduleActivity } from './utils';

const activityIcons = {
  eating: 'fas fa-utensils activity-icon dark-icon',
  shopping: 'fas fa-shopping-bag activity-icon',
  hiking: 'fas fa-hiking activity-icon dark-icon',
  bowling: 'fas fa-bowling-ball activity-icon',
  picnic: 'fas fa-tree activity-icon',
  movies: 'fas fa-ticket-alt activity-icon',
  spa: 'fas fa-spa activity-icon',
  other: 'fas fa-ellipsis-h activity-icon'
};

export default class ShowDatesScheduled extends React.Component {
  render() {
    return (
      <div className="day-scheduled-date-container">
        {hasDateScheduled(this.props.selectedDay, this.props.byDate)
          ? <>
              <div className="scheduled-date-title">
                Dates Today
              </div>
              <div className="schedule-container">
              {this.props.byDate[this.props.selectedDay.format('M D YYYY')]
                .map((date, i) => {
                  return (
                      <div className="schedule" key={i}>
                        <div className="scheduled-activity-container">
                        <div className={styleDailyScheduleActivity(date.activity)}>
                          <i className={activityIcons[date.activity.split(' ')[0].toLowerCase()]}></i>
                        </div>
                          <div className="activity-decor"></div>
                        </div>
                          <div className="scheduled-date-info-container">
                            <div className="scheduled-invitees-container">
                              <div className="scheduled-invitees-img-container">
                                <img className="scheduled-invitees-img" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"></img>
                              </div>
                              <div className="scheduled-invitees-time-container">
                                <div className="scheduled-invitees" key="invite">
                                  {date.invites}
                                </div>
                                <div className="scheduled-time" key="time">
                                  {date.time}
                                </div>
                              </div>
                            </div>
                            <div className="scheduled-location" key="location">
                              {date.location}
                          </div>
                          {date.notes
                            ? <div className="scheduled-note" key="note">
                              <span className="note-label">NOTE:</span> {date.notes}
                              </div>
                            : ''
                          }
                        </div>
                      </div>
                  );
                })
                }
              </div>
            </>
          : <div className="scheduled-date-placeholder-container center">
              No Scheduled Dates
            </div>
        }
      </div>
    );
  }
}

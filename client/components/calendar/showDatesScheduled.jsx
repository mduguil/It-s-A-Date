import React from 'react';
import { hasDateScheduled } from './utils';

export default class ShowDatesScheduled extends React.Component {
  render() {
    return (
      <div className="day-scheduled-date-container">
        {hasDateScheduled(this.props.currMonth, this.props.byDate)
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
                          <div className="scheduled-activity"></div>
                          <div className="activity-decor"></div>
                        </div>
                          <div className="scheduled-date-info-container">
                            <div className="scheduled-invitees-container">
                              <div className="scheduled-invitees-img-container">
                                <img className="scheduled-invitees-img" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"></img>
                              </div>
                              <div className="scheduled-invitees-time-container">
                                <div className="scheduled-invitees" key={i}>
                                  {date.invites}
                                </div>
                                <div className="scheduled-time" key={i}>
                                  {date.time}
                                </div>
                              </div>
                            </div>
                            <div className="scheduled-location" key={i}>
                              {date.location}
                          </div>
                          {date.notes
                            ? <div className="scheduled-note" key={i}>
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

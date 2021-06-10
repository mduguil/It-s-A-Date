import React from 'react';
import { hasDateScheduled } from './utils';

export default class ShowDatesScheduled extends React.Component {
  render() {
    return (
      <div className="scheduled-date-container">
        {hasDateScheduled(this.props.selectedDay, this.props.byDate)
          ? <>
              <div className="scheduled-date-title">
                Dates Today
              </div>
              <div className="schedule">
                {this.props.byDate[this.props.selectedDay.format('M D YYYY')]
                  .map((date, i) => {
                    return (
                      <>
                        <div className="scheduled-time" key={i}>
                          {date.time}
                        </div>
                        <div className="scheduled-location" key={i}>
                          {date.location}
                        </div>
                      </>
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

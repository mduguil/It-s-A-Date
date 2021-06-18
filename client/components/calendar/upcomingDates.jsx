import React from 'react';

export default class UpcomingDates extends React.Component {
  render() {
    return (
      <div>
        <div className="upcoming-date-title">
          Upcoming Dates
        </div>
        {this.props.byDate
          ? <>
            </>
          : <div className="scheduled-date-placeholder-container center">
             No Scheduled Dates
            </div>
  }
      </div>
    );
  }
}

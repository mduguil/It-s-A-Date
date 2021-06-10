import React from 'react';
import { hasDateScheduled } from './utils';

export default class ShowDatesScheduled extends React.Component {
  render() {
    return (
      <div className="scheduled-date-container">
        {hasDateScheduled(this.props.selectedDay, this.props.byDate)
          ? 'Yes'
          : <div className="scheduled-date-placeholder-container center">
              No Scheduled Dates
            </div>
        }

      </div>
    );
  }
}

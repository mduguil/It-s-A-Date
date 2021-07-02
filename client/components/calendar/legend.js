import React from 'react';
import { activities } from '../../constants';

export default class Legend extends React.Component {
  renderActivities() {
    activities.map(activity => {
      return (
      <div className="row" key={activity}>
        <div className={activity === 'Spa Day' ? 'spa-bubble bubble' : `${activity.toLowerCase()}-bubble bubble`}></div>
        <div className="activity-legend">
          {activity}
        </div>
      </div>
      );
    });
  }

  render() {
    return (
      <div className="activity-legend-container">
        {this.renderActivities()}
      </div>
    );
  }
}

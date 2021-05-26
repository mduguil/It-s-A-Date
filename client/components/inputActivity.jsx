import React from 'react';

export default class InputActivity extends React.Component {
  render() {
    return (
      <div className="input-container row">
        <label className="row">
          <div className="activity-label col-half row">
            Activity
          </div>
          <div className="activity-input col-half row">
            <select
              className="activity col-third"
              value={this.props.selectedActivity}
              onChange={this.props.handleChange}
            >
              {
              this.props.options.map(activity => {
                return (
                  <option value={activity} key={activity} className={activity}>{activity}</option>
                );
              })
              }
            </select>
          </div>
        </label>
      </div>
    );
  }
}

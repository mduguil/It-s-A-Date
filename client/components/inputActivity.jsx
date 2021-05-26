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
            <select className="activity col-third"
              value={this.state.activity}
              onChange={event => {
                this.setState({
                  activity: event.target.value
                });
              }}>
                {
                this.state.activities.map(activity => {
                  return (
                    <option value={activity} key={activity}>{activity}</option>
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

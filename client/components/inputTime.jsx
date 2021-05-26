import React from 'react';

export default class InputTime extends React.Component {

  render() {
    return (
      <div className="input-container row">
        <label className="row">
          <div className="time-label col-half row">
            Time
          </div>
          <div className="time-input col-half row">
            <input
            type="time"
            id="time"
            step="60"
            onChange={this.props.handleChange}
            value={this.props.time} />
          </div>
        </label>
      </div>
    );
  }
}

import React from 'react';

export default class InputTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '13:30'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      time: event.target.value
    });
  }

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
            onChange={this.handleChange}
            value={this.state.time} />
          </div>
        </label>
      </div>
    );
  }
}

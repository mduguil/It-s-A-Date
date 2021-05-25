import React from 'react';

export default class InputTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div className="input-container row">
        <label className="time-label row">
          <div className="time-label col-half row">
            Time
          </div>
          <div className="time-input col-half row">
            <input type="time" id="time" value={this.state.time} onChange={this.handleChange} />
          </div>
        </label>
      </div>
    );
  }
}

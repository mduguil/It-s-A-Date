import React from 'react';

export default class InputSelect extends React.Component {
  render() {
    return (
      <select
        className="month col-third"
        value={this.props.value}
        onChange={this.props.onChange}>
        {this.props.options.map(option => {
          return (
            <option
              value={option}
              key={option}
            >
              {this.props.formatFunction ? this.props.formatFunction(option) : option}
            </option>
          );
        })}
      </select>
    );
  }
}

import React from 'react';

export default class SelectAddress extends React.Component {
  render() {
    return (
      <div className="location-container">
        <div className="location-label row">
          Location
        </div>
        <div className="input-container row" onClick={this.props.handleClick}>
            <div className="selected-address">
              3422 Priscilla Dr. yada yada
            </div>
        </div>
      </div>
    );
  }
}

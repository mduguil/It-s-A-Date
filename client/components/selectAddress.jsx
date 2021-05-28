import React from 'react';

export default class SelectAddress extends React.Component {
  render() {
    return (
      <div className="location-container">
        <div className="location-label row">
          Location
        </div>
        <div className="input-container address-container row" onClick={this.props.handleClick}>
            <div className="selected-address">
              {this.props.address}
            </div>
        </div>
      </div>
    );
  }
}

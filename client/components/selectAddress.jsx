/* eslint-disable no-lone-blocks */
import React from 'react';

export default class SelectAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      places: [],
      isFetching: false,
      searchIsOpen: false
    };

  }

  render() {
    return (
      <div className="location-container">
        <div className="location-label row">
          Location
        </div>
        <div className="input-container row">
            <div className="selected-address">
              3422 Priscilla Dr. yada yada
            </div>
        </div>
      </div>
    );
  }
}

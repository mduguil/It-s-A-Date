import React from 'react';

export default class MakeDecisions extends React.Component {
  render() {
    return (
      <div className="decisions-container row">
        <div className="accept-container">
          <button
            type="submit"
            className="yes-button decisions-btn"
            onSubmit={this.props.handleYesSubmit}
          >
            {this.props.yes}
          </button>
        </div>
        <div className="cancel-container">
          <button
            type="submit"
            className="no-button decisions-btn"
            onSubmit={this.props.handleCancelSubmit}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

import React from 'react';

export default class MakeDecisions extends React.Component {
  render() {
    return (
      <div className={this.props.decisionsContainer}>
        <div className={this.props.yesBtnContainer}>
          <button
            type="submit"
            className={this.props.yesBtn}
            onClick={this.props.handleYesClick}
          >
            {this.props.yes}
          </button>
        </div>
        <div className={this.props.noBtnContainer}>
          <button
            className={this.props.noBtn}
            onClick={this.props.handleCancelBtn}
          >
            {this.props.no}
          </button>
        </div>
      </div>
    );
  }
}

import React from 'react';

export default class AddInvites extends React.Component {
  render() {
    return (
      <div className="invite-container">
        <div className="invite-label row">
          Add Invites
        </div>
        <div className="input-container invitees-container row" onClick={this.props.handleClick}>
          <div className="invitees">
            {this.props.invitees.map(invitee => {
              return (
                <span key={invitee}>{invitee}</span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';

export default class AddInvites extends React.Component {
  render() {
    return (
      <div className="invite-container">
        <div className="invite-label row">
          Add Invites
        </div>
        <div
          className="input-container invitees-container row"
          onClick={event => {
            if (event.target.matches('.invitees-container')) {
              this.props.handleClick();
            }
          }}
        >
          <div className="invitees center">
            {this.props.invitees.map(invitee => {
              return (
                <span
                  className="invited-contact center"
                  key={invitee.friendId}
                  value={invitee.name}
                >
                  {invitee.name}
                </span>
              );
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

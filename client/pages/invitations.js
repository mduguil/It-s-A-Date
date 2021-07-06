import React from 'react';
import SentInvites from '../components/Invitations/SentInvites';

export default class Invitations extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="invitations-title center row">Invitations</h1>
        <div className="sent-received-container">
          <div className="sent-tab row center">Sent</div>
          <div className="curr-invitation-tab-container row center">
            <div className="curr-invitation-tab" />
          </div>
        </div>
        <SentInvites />
      </div>
    );
  }
}

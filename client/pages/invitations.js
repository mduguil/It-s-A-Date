import React from 'react';
import SentInvites from '../components/Invitations/SentInvites';

export default class Invitations extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="invitations-title center row">Invitations</h1>
        <SentInvites />
      </div>
    );
  }
}

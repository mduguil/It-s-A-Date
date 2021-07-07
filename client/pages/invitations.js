import React from 'react';
import { useHistory } from 'react-router-dom';
import SentInvites from '../components/Invitations/SentInvites';

export default function Invitations(props) {
  const history = useHistory();

  function handleClick(dateId) {
    history.push(`/date-form/${dateId}`);
  }

  return (
      <div className="container">
        <h1 className="invitations-title center row">Invitations</h1>
        <div className="sent-received-container">
          <div className="sent-tab row center">Sent</div>
          <div className="curr-invitation-tab-container row center">
            <div className="curr-invitation-tab" />
          </div>
        </div>
        <SentInvites handleEditClick={dateId => handleClick(dateId)}/>
      </div>
  );
}

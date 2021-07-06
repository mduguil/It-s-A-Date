import React from 'react';
import moment from 'moment';
import { API_URLS } from '../../constants';
import { getFutureDates, hasFutureDates } from '../calendar/utils';
import MakeDecisions from '../makeDecisions';

export default class SentInvites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      byDate: [],
      isFetching: false,
      err: ''
    };
  }

  componentDidMount() {
    this.setState({
      isFetching: true
    });
    fetch(API_URLS.getDate)
      .then(res => res.json())
      .then(dates => {
        this.setState({
          byDate: dates.reduce((acc, date) => ({
            ...acc,
            [date.day]: acc[date.day] ? [...acc[date.day], date] : [date]
          }), {}),
          isFetching: false
        });
      })
      .catch(err => {
        this.setState({
          err: err.toString()
        });
      });
  }

  render() {
    return (
      <div className="invitations-container">
        {hasFutureDates(this.state.byDate)
          ? <div className="sent-invitation-container">
              {getFutureDates(this.state.byDate).map((sent, i) => {
                return (
                  <div className="sent-invitation" key={i}>
                    <div className="profile-pic-container">
                      <img className="profile-pic" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
                    </div>
                    <div className="sent-invitation-info">
                      <div className="sent-contact">{sent.invites}</div>
                      <div className="sent-activity">{sent.activity}</div>
                      <div className="sent-datetime">
                        {moment(sent.day).format('ddd MMMM D')} @ {moment(sent.day + ' ' + sent.time).format('h:m a')}
                      </div>
                    </div>
                    <MakeDecisions
                      yes="Edit"
                      no="Delete"
                      decisionsContainer="sent-invites-decisions-container"
                      yesBtnContainer="sent-invites-yes-btn-container"
                      noBtnContainer="sent-invites-no-btn-container"
                      yesBtn="invite-button sent-yes-button sent-invites-decisions-btn"
                      noBtn="no-button sent-no-button sent-invites-decisions-btn"
                    />
                  </div>
                );
              })}
            </div>
          : <div className="scheduled-date-placeholder-container center">No Dates Sent</div>
        }
      </div>
    );
  }
}

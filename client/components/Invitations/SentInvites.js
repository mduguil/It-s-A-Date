import React from 'react';
import moment from 'moment';
import { API_URLS } from '../../constants';
import { getFutureDates, hasFutureDates } from '../calendar/utils';

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
                      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
                    </div>
                    <div className="sent-invitation-info">
                      <div className="sent-contact">{sent.invites}</div>
                      <div className="sent-activity">{sent.activity}</div>
                      <div className="sent-datetime">
                        {sent.day} @ {moment(sent.day + ' ' + sent.time).format('h:m a')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          : <div>nada</div>
        }
      </div>
    );
  }
}

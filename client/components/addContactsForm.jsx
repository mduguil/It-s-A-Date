import React from 'react';
import MakeDecisions from './makeDecisions';

export default class AddContactsForm extends React.Component {
  render() {
    return (
      <div className="add-contacts-container container">
        <div className="add-contacts-title-container">
          <h1 className="add-contacts-title center row">Add Contact</h1>
        </div>
        <form className="add-contact-form" onSubmit={this.props.handleSubmit}>
          <div className="new-contact-img-container">
            <img className="new-contact-img" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
          </div>
          <label className="add-contacts-label">
            <div className="add-contact-name-label">
              Name
            </div>
            <div className="add-contact-name-input">
              <input
                type="text"
                className="new-contact-name"
                name={this.props.name}
                onChange={this.props.handleNameChange}
                required
              />
            </div>
          </label>
          <label className="add-contacts-label">
            <div className="add-contact-number-label">
              Number
            </div>
            <div className="add-contact-number-input">
              <input
                type="number"
                className="new-contact-number"
                placeholder='(123) 456 - 7890'
                number={this.props.number}
                onChange={this.props.handleNumChange}
                required
              />
            </div>
          </label>
          <MakeDecisions
            yes="Add"
            decisionsContainer="add-contact-decisions-container row"
            yesBtnContainer="add-contact-yes-btn-container"
            noBtnContainer="add-contact-no-btn-container"
            yesBtn="yes-button add-contact-decisions-btn"
            noBtn="no-button add-contact-decisions-btn"
            handleCancelBtn={this.props.handleCancel}
           />
        </form>
      </div>
    );
  }
}

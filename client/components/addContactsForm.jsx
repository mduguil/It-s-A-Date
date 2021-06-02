import React from 'react';
import MakeDecisions from './makeDecisions';

export default class AddContactsForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="add-contacts-container">
        <div className="add-contacts-title-container">
          <h1 className="add-contacts-title center row">Add Contact</h1>
        </div>
        <form className="add-contact-form" onSubmit={this.handleSubmit}>
          <div className="new-contact-img-container">
            <img className="new-contact-img" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
          </div>
          <label>
            <div className="add-contact-name-label">
              Name
            </div>
            <div className="add-contact-name-input ">
              <input
                type="text"
                className="new-contact-name"
                name={this.props.name}
                onChange={this.props.handleNameChange}
                required
              />
            </div>
          </label>
          <label>
            <div className="add-contact-number-label">
              Number
            </div>
            <div className="add-contact-number-input ">
              <input
                type="number"
                className="new-contact-number"
                number={this.props.number}
                onChange={this.props.handleNumChange}
                required
              />
            </div>
          </label>
          <MakeDecisions
            yes="Add"
            handleYesSubmit={this.props.handleAdd}
            handleCancelBtn={this.props.handleCancel}
           />
        </form>
      </div>
    );
  }
}

import React from 'react';

export default class AddContactsForm extends React.Component {
  render() {
    return (
      <div className="add-contacts-container">
        <div className="add-contacts-title-container">
          <h1 className="add-contacts-title center row">Add Contact</h1>
        </div>
        <form className="add-contact-form">
          <label>
            <div className="add-contact-name-label">
              Name
            </div>
            <div className="add-contact-name-input ">
              <input type="text" className="new-contact-name"/>
            </div>
          </label>
        </form>
      </div>
    );
  }
}

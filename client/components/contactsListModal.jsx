import React from 'react';
import AddContactsForm from './addContactsForm';

export default class ContactsListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      addContactFormIsOpen: true,
      name: '',
      number: ''
    };
    this.closeAddForm = this.closeAddForm.bind(this);
  }

  componentDidMount() {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(contactsData => {
        this.setState({
          contacts: contactsData
        });
      });
  }

  closeAddForm() {
    this.setState({
      addContactFormIsOpen: false
    });
  }

  postContact(contact) {
    fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
      .then(res => res.json())
      .then(task => {
        const newContacts = this.state.contacts.slice();
        newContacts.push(contact);
        this.setState({
          contacts: newContacts
        });
      });
  }

  render() {
    if (this.state.addContactIsOpen) {
      return (
        <AddContactsForm
          handleAdd={event => {
            this.closeAddForm();
          }}
          handleCancel={event => {
            this.closeAddForm();
          }}
        />
      );
    }
    return (
    <div className="contacts-container">
      <div className="contacts-title-container">
        <i className="fas fa-arrow-left center back-icon"/>
        <h1 className="contacts-title center row">Contacts</h1>
        <i className="fas fa-plus center add-icon"
          onClick={event => {
            this.setState({
              addContactFormIsOpen: true
            });
          }}
        />
      </div>
        {this.state.contacts.map(
          (contact, i) => {
            return (
              <div
                className="contact-list"
                onClick={() => { this.props.handleClick(contact); }}
                key={i}
              >
                <div className="contact-img-container">
                  <img className="contact-img" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
                </div>
                <div className="contact-info">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-number">{`(${contact.phoneNumber.slice(0, 3)}) ${contact.phoneNumber.slice(3, 6)} - ${contact.phoneNumber.slice(6, 10)}`}
                  </div>
                </div>
              </div>
            );
          }
        )}
    </div>
    );
  }
}

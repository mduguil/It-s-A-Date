import React from 'react';

export default class ContactsListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
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

  render() {
    return (
      <div className="contacts-container">
        <div className="contacts-title-container">
          <i className="fas fa-arrow-left center back-icon"></i>
          <h1 className="contacts-title center row">Contacts</h1>
          <i className="fas fa-plus center add-icon"></i>
        </div>
          {
          this.state.contacts.map(
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
          )
          }
      </div>
    );
  }
}

import React from 'react';
import AddContactsForm from './addContactsForm';

export default class ContactsListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      addContactFormIsOpen: false,
      name: '',
      number: '',
      contactId: '',
      err: '',
      isFetching: false
    };
    this.closeAddForm = this.closeAddForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      isfetching: true
    });
    fetch('/api/contacts')
      .then(res => res.json())
      .then(contactsData => {
        this.setState({
          contacts: contactsData,
          contactId: contactsData.contactId,
          isFetching: false
        });
      })
      .catch(err => {
        this.setState({
          err: err
        });
      });
  }

  closeAddForm() {
    this.setState({
      addContactFormIsOpen: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newContact = {
      name: this.state.name,
      number: this.state.number
    };
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newContact)
    };
    fetch('/api/contacts', init)
      .then(res => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then(contact => {
        const newContacts = this.state.contacts.slice();
        newContacts.push(contact);
        this.setState({
          contacts: newContacts
        });
      });
    this.closeAddForm();
  }

  render() {
    return (
      <>
      {this.state.err
        ? <div>{this.state.err}</div>
        : <>
            {this.state.addContactFormIsOpen
              ? <AddContactsForm
                name={this.state.name}
                number={this.state.number}
                handleSubmit={event => this.handleSubmit(event)}
                handleNameChange={event => {
                  this.setState({
                    name: event.target.value
                  });
                }}
                handleNumChange={event => {
                  this.setState({
                    number: event.target.value
                  });
                }}
                handleCancel={event => {
                  this.closeAddForm();
                }}
              />
              : <div className="contacts-container container">
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
                <div>
                  {this.state.isFetching
                    ? <div className="loading-placeholder center">Loading...</div>
                    : <>
                      {this.state.contacts.map(
                        contact => {
                          return (
                            <div
                              className="contact-container"
                              onClick={() => { this.props.handleClick(contact); }}
                              key={contact.contactId}
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
                      </>
                  }
                </div>
              </div>
            }
          </>
        }
      </>
    );
  }
}

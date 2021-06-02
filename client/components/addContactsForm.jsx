import React from 'react';
import MakeDecisions from './makeDecisions';

export default class AddContactsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // const newContact = {
    //   name: this.state.name,
    //   number: this.state.number
    // };
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
                value={this.state.name}
                onChange={event => {
                  this.setState({
                    name: event.target.value
                  });
                }}
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
                value={this.state.number}
                onChange={event => {
                  this.setState({
                    number: event.target.value
                  });
                }}
                required
              />
            </div>
          </label>
          <MakeDecisions
            yes="Add"
            handleYesSubmit={this.props.handleAdd}
            handleCancelSubmit={this.props.handleCancel}
           />
        </form>
      </div>
    );
  }
}

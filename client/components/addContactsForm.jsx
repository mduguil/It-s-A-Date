import React from 'react';

export default class AddContactsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, labelName) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="add-contacts-container">
        <div className="add-contacts-title-container">
          <h1 className="add-contacts-title center row">Add Contact</h1>
        </div>
        <form className="add-contact-form" onSubmit={this.handleSubmit}>
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
        </form>
      </div>
    );
  }
}

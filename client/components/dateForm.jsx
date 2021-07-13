import React from 'react';
import InputTime from './inputTime';
import InputSelect from './inputSelect';
import InputActivity from './inputActivity';
import SelectAddress from './selectAddress';
import PlacesModal from './placesModal';
import AddInvites from './addInvites';
import ContactsListModal from './contactsListModal';
import MakeDecisions from './makeDecisions';
import { activities, monthNames, dayNames } from '../constants';

const timeInputName = 'time';
const selectedMonthInputName = 'selectedMonth';
const selectedYearInputName = 'selectedYear';
export default class DateForm extends React.Component {
  constructor(props) {
    super(props);
    const dateId = props.dateId || '';
    const editingDate = props.editingDate || null;
    const selectedMonth = editingDate ? editingDate.day.split(' ')[0] - 1 : new Date().getMonth();
    const selectedYear = editingDate ? editingDate.day.split(' ')[2] : new Date().getFullYear();
    this.state = {
      dateId,
      editingDate,
      [selectedYearInputName]: selectedYear,
      [selectedMonthInputName]: selectedMonth,
      selectedActivity: editingDate ? editingDate.activity : 'Eating',
      day: editingDate ? new Date(editingDate.day).getDate() : new Date().getDate(),
      days: this.getDaysOfTheMonth(dayNames, selectedMonth, selectedYear),
      months: this.populateNumbers(0, 11),
      years: this.populateNumbers(2021, 2025),
      [timeInputName]: editingDate ? editingDate.time : '15:30',
      searchIsOpen: false,
      contactsIsOpen: false,
      address: editingDate ? editingDate.location : '',
      invitees: [],
      notes: editingDate ? editingDate.notes : ''
    };
    this.populateDays = this.populateNumbers.bind(this);
    this.getMonthName = this.getMonthName.bind(this);
    this.getDaysInAMonth = this.getDaysInAMonth.bind(this);
    this.getDaysOfTheMonth = this.getDaysOfTheMonth.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.turnInvitesIntoStr = this.turnInvitesIntoStr.bind(this);
  }

  saveEditingDate = (event, dateId) => {
    event.preventDefault();
    const editedDate = {
      location: this.state.address,
      day: (+this.state.selectedMonth + 1) + ' ' + this.state.day + ' ' + this.state.selectedYear,
      time: this.state.[timeInputName],
      activity: this.state.selectedActivity,
      notes: this.state.notes,
      invites: this.turnInvitesIntoStr(this.state.invitees)
    };
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    fetch(`/api/dates/${dateId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(editedDate)
    })
      .then(res => res.json())
      .then(() => this.props.onSubmitSuccess())
      .catch(err => {
        this.setState({
          err: err.toString()
        });
      });
  }

  getMonthName(monthNum) {
    return monthNames[monthNum];
  }

  populateNumbers(min, max) {
    const nums = [];
    for (let num = min; num <= max; num++) {
      nums.push(num);
    }
    return nums;
  }

  getDaysInAMonth(month, year) {
    const selectedDate = new Date(year, month + 1, 0);
    return selectedDate.getDate();
  }

  getDaysOfTheMonth(dayNames, month, year) {
    const result = [];
    const numOfDays = this.getDaysInAMonth(month, year);
    for (let day = 1; day <= numOfDays; day++) {
      const selectedDate = new Date(year, month, day);
      const dayIndex = selectedDate.getDay();
      result.push({
        date: day,
        dayName: dayNames[dayIndex]
      });
    }
    return result;
  }

  onSelectChange({ target: { value } }, fieldName, shouldConvertToNumber = false) {
    const newSelectedFieldValue = shouldConvertToNumber ? +value : value;
    const newDays = this.getDaysOfTheMonth(dayNames, newSelectedFieldValue, this.state.selectedYear);

    this.setState({
      [fieldName]: newSelectedFieldValue,
      days: fieldName !== timeInputName ? newDays : this.state.days
    });
  }

  handleNotesChange(event) {
    this.setState({
      notes: event.target.value
    });
  }

  turnInvitesIntoStr(invitees) {
    let invites = '';
    const inviteLength = invitees.length;
    let count = 0;
    if (inviteLength === 1) {
      return invitees[0].name;
    }
    if (inviteLength === 2) {
      return `${invitees[0].name} & ${invitees[1].name}`;
    }
    for (count; count < inviteLength - 1; count++) {
      invites += `${invitees[count].name}, `;
    }
    invites += `& ${invitees[count].name}`;
    return invites;
  }

  handleSubmit(event) {
    event.preventDefault();
    const newDate = {
      location: this.state.address,
      day: (+this.state.selectedMonth + 1) + ' ' + this.state.day + ' ' + this.state.selectedYear,
      time: this.state.[timeInputName],
      activity: this.state.selectedActivity,
      notes: this.state.notes,
      invites: this.turnInvitesIntoStr(this.state.invitees)
    };
    fetch('/api/dates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDate)
    })
      .then(res => res.json())
      .then(() => this.props.onSubmitSuccess());
  }

  render() {
    if (this.state.searchIsOpen) {
      return (
        <>
          <PlacesModal
            defaultSearch={this.state.selectedActivity}
            handleBackBtn={event => {
              this.setState({
                searchIsOpen: false
              });
            }}
            handleClick={place => {
              this.setState({
                address: place.formatted_address,
                searchIsOpen: false
              });
            }}
          />
        </>
      );
    }

    if (this.state.contactsIsOpen) {
      return (
        <ContactsListModal
          handleClick={contact => {
            this.setState({
              invitees: this.state.invitees.concat(contact),
              contactsIsOpen: false
            });
          }}
        />
      );
    }
    return (
      <>
        <div className="form-container">
          <h1 className="form-title center row">Date</h1>
          <form onSubmit={this.handleSubmit}>
            <InputActivity
              selectedActivity={this.state.selectedActivity}
              options={activities}
              handleChange={event => {
                this.setState({
                  selectedActivity: event.target.innerHTML
                });
              }
              }
            />
            <div className="input-container row">
              <label className="row">
                <div className="col-half row">
                  Day
              </div>
                <div className="day-options col-half row">
                  <select
                    className="day col-third"
                    value={this.state.day}
                    onChange={event => {
                      this.setState({
                        day: event.target.value
                      });
                    }}>
                    {this.state.days.map(day => {
                      return (
                        <option value={day.date} key={day.date}>{day.dayName.slice(0, 3)} {day.date} </option>
                      );
                    })}
                  </select>
                  <InputSelect
                    value={this.state.selectedMonth}
                    options={this.state.months}
                    onChange={event => this.onSelectChange(event, selectedMonthInputName, true)}
                    formatFunction={this.getMonthName}
                  />
                  <InputSelect
                    value={this.state.selectedYear}
                    options={this.state.years}
                    onChange={event => this.onSelectChange(event, selectedYearInputName, true)}
                  />
                </div>
              </label>
            </div>
            <InputTime time={this.state.time} handleChange={event => this.onSelectChange(event, timeInputName, false)} />
            <SelectAddress
              address={this.state.address}
              handleClick={event => {
                this.setState({
                  searchIsOpen: true
                });
              }} />
            <AddInvites
              invitees={this.state.invitees}
              handleClick={event => {
                this.setState({
                  contactsIsOpen: true
                });
              }}
            />
            <div className="notes-container">
              <textarea
                className="notes"
                placeholder="Write a note..."
                onChange={this.handleNotesChange}
              />
            </div>
            <MakeDecisions
              yes={this.state.editingDate ? 'Save' : 'Invite'}
              no="Cancel"
              decisionsContainer="new-date-decisions-container row"
              yesBtnContainer="new-date-yes-btn-container"
              noBtnContainer="new-date-no-btn-container"
              yesBtn="invite-button new-date-decisions-btn"
              noBtn="no-button new-date-decisions-btn"
              handleYesClick={event => this.saveEditingDate(event, this.state.dateId)}
              handleCancelBtn={() => this.props.onSubmitSuccess}
            />
          </form>
        </div>
      </>
    );
  }

}

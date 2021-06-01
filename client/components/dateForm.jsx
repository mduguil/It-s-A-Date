import React from 'react';
import InputTime from './inputTime';
import InputSelect from './inputSelect';
import InputActivity from './inputActivity';
import SelectAddress from './selectAddress';
import PlacesModal from './placesModal';
import AddInvites from './addInvites';
import ContactsListModal from './contactsListModal';
import MakeDecisions from './makeDecisions';
import Navbar from './navbar';

const activities = ['Eating', 'Shopping', 'Hiking', 'Picnic', 'Movies', 'Spa Day', 'Bowling', 'Other'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const timeInputName = 'time';
const selectedMonthInputName = 'selectedMonth';
const selectedYearInputName = 'selectedYear';

export default class DateForm extends React.Component {
  constructor(props) {
    super(props);
    const selectedMonth = new Date().getMonth();
    const selectedYear = new Date().getFullYear();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.state = {
      [selectedYearInputName]: selectedYear,
      [selectedMonthInputName]: selectedMonth,
      dayNames,
      selectedActivity: 'Eating',
      day: new Date().getDate(),
      days: this.getDaysOfTheMonth(dayNames, selectedMonth, selectedYear),
      months: this.populateNumbers(0, 11),
      years: this.populateNumbers(2021, 2025),
      [timeInputName]: '15:30',
      searchIsOpen: false,
      contactsIsOpen: true,
      address: '',
      invitees: ['Me', 'Myself', 'I'],
      notes: ''
    };
    this.populateDays = this.populateNumbers.bind(this);
    this.getMonthName = this.getMonthName.bind(this);
    this.getDaysInAMonth = this.getDaysInAMonth.bind(this);
    this.getDaysOfTheMonth = this.getDaysOfTheMonth.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
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
    const newDays = this.getDaysOfTheMonth(this.state.dayNames, newSelectedFieldValue, this.state.selectedYear);

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

  render() {
    if (this.state.searchIsOpen) {
      return (
        <div className="container">
          <PlacesModal
            defaultSearch={this.state.selectedActivity}
            handleClick={place => {
              this.setState({
                address: place.formatted_address,
                searchIsOpen: false
              });
            }}
          />
        </div>
      );
    }

    if (this.state.contactsIsOpen) {
      return (
        <ContactsListModal />
      );
    }
    return (
      <div className="container">
        <div className="form-container">
          <h1 className="form-title center row">Date</h1>
          <form>
            <InputActivity
              value={this.state.selectedActivity}
              options={activities}
              handleChange={event => {
                this.setState({
                  selectedActivity: event.target.value
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
              handleClick={this.setState({ contactsIsOpen: true })}
            />
            <div className="notes-container">
              <textarea
                className="notes"
                defaultValue="Write a note ..."
                onChange={this.handleNotesChange}
              />
            </div>
            <MakeDecisions />
            <Navbar />
          </form>
        </div>
      </div>
    );
  }

}

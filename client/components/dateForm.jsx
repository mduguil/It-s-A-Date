import React from 'react';
import InputTime from './inputTime';
import InputSelect from './inputSelect';
import InputActivity from './inputActivity';

export default class DateForm extends React.Component {
  constructor(props) {
    super(props);
    const selectedMonth = new Date().getMonth();
    const selectedYear = new Date().getFullYear();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const activities = ['Eating', 'Shopping', 'Hiking', 'Picnic', 'Movies', 'Spa Day', 'Bowling', 'Other'];
    this.state = {
      selectedMonth,
      selectedYear,
      dayNames,
      monthNames,
      activities,
      selectedActivity: 'Eating',
      day: new Date().getDate(),
      days: this.getDaysOfTheMonth(dayNames, selectedMonth, selectedYear),
      months: this.populateNumbers(0, 11),
      years: this.populateNumbers(2021, 2025),
      time: '15:30'
    };
    this.populateDays = this.populateNumbers.bind(this);
    this.getMonthName = this.getMonthName.bind(this);
    this.getDaysInAMonth = this.getDaysInAMonth.bind(this);
    this.getDaysOfTheMonth = this.getDaysOfTheMonth.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  getMonthName(monthNum) {
    return this.state.monthNames[monthNum];
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

  onSelectChange({ target: { value } }, fieldName, isString) {
    const newSelectedFieldValue = isString ? value : +value;
    const newDays = this.getDaysOfTheMonth(this.state.dayNames, newSelectedFieldValue, this.state.selectedYear);
    this.setState({
      [fieldName]: newSelectedFieldValue,
      days: newDays
    });
  }

  render() {
    return (
      <div className="container">
        <div className="form-container">
          <h1 className="form-title center row">Date</h1>
          <form>
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
                  onChange={event => this.onSelectChange(event, 'selectedMonth')}
                  formatFunction={this.getMonthName}
                  />
                  <InputSelect
                    value={this.state.selectedYear}
                    options={this.state.years}
                    onChange={event => this.onSelectChange(event, 'selectedYear')}
                  />
                </div>
              </label>
            </div>
            <InputTime time={this.state.time} handleChange={event => this.onSelectChange(event, 'time')}/>
            <InputActivity
              value={this.state.selectedActivity}
              options={this.state.activities}
              handleChange={event => {
                this.setState({
                  selectedActivity: event.target.value
                });
              }
              }
            />
          </form>
        </div>
      </div>
    );
  }
}

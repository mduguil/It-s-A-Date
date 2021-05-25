import React from 'react';
import InputTime from './inputTime';

export default class DateForm extends React.Component {
  constructor(props) {
    super(props);
    const selectedMonth = new Date().getMonth();
    const selectedYear = new Date().getFullYear();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.state = {
      selectedMonth,
      selectedYear,
      dayNames,
      monthNames,
      day: new Date().getDate(),
      days: this.getDaysOfTheMonth(dayNames, selectedMonth, selectedYear),
      months: this.populateNumbers(0, 11),
      years: this.populateNumbers(2021, 2025)
    };
    this.populateDays = this.populateNumbers.bind(this);
    this.getMonthName = this.getMonthName.bind(this);
    this.getDaysInAMonth = this.getDaysInAMonth.bind(this);
    this.getDaysOfTheMonth = this.getDaysOfTheMonth.bind(this);
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

  render() {
    return (
      <div className="container">
        <div className="form-container">
          <h1 className="form-title center row">Date</h1>
          <form>
            <div className="input-container row">
              <label className=" row">
                <div className=" col-half row">
                  Day
                </div>
                <div className="day-options col-half row">
                    <select className="day col-third"
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
                  <select
                      className="month col-third"
                  value={this.state.selectedMonth}
                  onChange={event => {
                    const newSelectedMonth = +event.target.value;
                    const newDays = this.getDaysOfTheMonth(this.state.dayNames, newSelectedMonth, this.state.selectedYear);
                    this.setState({
                      selectedMonth: newSelectedMonth,
                      days: newDays
                    });
                  }}>
                    {this.state.months.map(monthNum => {
                      return (
                        <option
                          value={monthNum}
                          key={monthNum}
                        >
                          {this.getMonthName(monthNum)}
                        </option>
                      );
                    })}
                  </select>
                  <select
                      className="year col-third"
                    value={this.state.selectedYear}
                    onChange={event => {
                      const newSelectedYear = +event.target.value;
                      const newDays = this.getDaysOfTheMonth(this.state.dayNames, this.state.selectedMonth, newSelectedYear);
                      this.setState({
                        selectedYear: event.target.value,
                        days: newDays
                      });
                    }}>
                    {this.state.years.map(year => {
                      return (
                        <option value={year} key={year}>{year}</option>
                      );
                    })}
                  </select>
                </div>
              </label>
            </div>
            <InputTime />
          </form>
        </div>
      </div>
    );
  }
}

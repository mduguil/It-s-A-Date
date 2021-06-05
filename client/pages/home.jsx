import React from 'react';
import Calendar from '../components/calendar';
import WeeklyView from '../components/weeklyView';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeklyViewIsOpen: false,
      selectedDay: null
    };
    this.isSelected = this.isSelected.bind(this);
  }

  isSelected(day) {
    this.setState({
      selectedDay: day,
      weeklyViewIsOpen: true
    });
  }

  render() {
    if (this.state.weeklyViewIsOpen) {
      return (
      <WeeklyView
        selectedDay={this.state.selectedDay}/>
      );
    }

    return (
      <Calendar
        handleDayClick={(event, day) => {
          this.isSelected(day);
        }}
      />
    );

  }
}

import React from 'react';
import DateForm from '../client/components/dateForm';
import Home from './pages/home';
import Navbar from '../client/components/navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFormIsOpen: false
    };
  }

  render() {
    if (this.state.dateFormIsOpen) {
      return (
        <>
        <DateForm />
          <Navbar
            calendarIcon="far fa-calendar nav-icon"
            handleHomeClick={event => {
              this.setState({
                dateFormIsOpen: false
              });
            }}/>
        </>
      );
    }
    return (
      <>
        <Home />
        <Navbar
          calendarIcon="far fa-calendar nav-icon home-calendar-icon"
          handleDateClick={event => {
            this.setState({
              dateFormIsOpen: true
            });
          }}
        />
      </>
    );
  }
}

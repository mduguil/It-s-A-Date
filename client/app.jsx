import React from 'react';
import DateForm from '../client/components/dateForm';
import Home from './pages/home';

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
        <DateForm />
      );
    }
    return (
      <Home />
    );
  }
}

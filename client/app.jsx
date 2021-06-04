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
        <Navbar />
        </>
      );
    }
    return (
      <>
      <Home />
      <Navbar />
      </>
    );
  }
}

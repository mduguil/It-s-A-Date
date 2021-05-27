import React from 'react';
import DateForm from '../client/components/dateForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      places: [],
      isfetching: false
    };

  }

  render() {
    return (
      <DateForm />
    );
  }
}

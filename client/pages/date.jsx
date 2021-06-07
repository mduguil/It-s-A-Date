
import React from 'react';
import { useHistory } from 'react-router-dom';
import DateForm from '../components/dateForm';

export default function Home(props) {
  const history = useHistory();

  function redirectOnCompleted() {
    history.push('/');
  }

  return (
    <DateForm
      onSubmitSuccess={redirectOnCompleted}
    />
  );
}

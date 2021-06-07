import moment from 'moment';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Calendar from '../components/calendar/calendar';
import WeeklyView from '../components/calendar/weeklyView';

export default function Home(props) {
  const history = useHistory();

  function handleClick(day) {
    history.push(`/weekly-view/${day.format('M D YYYY')}`);
  }

  const { day } = useParams();

  if (props.weeklyView) {
    return (
      <WeeklyView
        selectedDay={moment(day)}
      />
    );
  }

  return (
      <Calendar
        handleDayClick={(event, day) => {
          handleClick(day);
        }}
      />
  );
}

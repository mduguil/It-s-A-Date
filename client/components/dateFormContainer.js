import React, { useEffect, useState } from 'react';
import DateForm from './dateForm';
import { useHistory, useParams } from 'react-router-dom';

export default function DateFormContainer() {
  const history = useHistory();
  const { dateId } = useParams();
  const [editingDate, setEditingDate] = useState(null);

  function redirectOnCompleted() {
    history.push('/');
  }

  useEffect(() => {
    fetch(`/api/dates/${dateId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(date => {
        setEditingDate(date[0]);
      });
  }, []);

  return (
    <>
      {
        !editingDate
          ? <div className="loading-placeholder center">Loading...</div>
          : <DateForm dateId={dateId} editingDate={editingDate} onSubmitSuccess={redirectOnCompleted}/>
      }
    </>
  );
}

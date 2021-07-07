import React, { useEffect, useState } from 'react';
import DateForm from './dateForm';
import { useParams } from 'react-router-dom';

export default function DateFormContainer() {
  const { dateId } = useParams();
  const [editingDate, setEditingDate] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(`/api/dates/${dateId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(date => {
        setEditingDate(date[0]);
      })
      .catch(err => {
        setErr(err);
      });
  }, []);

  return (
    <>
      {
        !editingDate
          ? <div className="loading-placeholder center">Loading...</div>
          : <DateForm dateId={dateId} editingDate={editingDate}/>
      }
    </>
  );
}

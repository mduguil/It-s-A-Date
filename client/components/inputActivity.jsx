import React, { useState, useEffect, useRef } from 'react';

const Activity = ({ options, selectedActivity, handleChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = event => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true
      });
    };
  }, []);

  const renderActivities = options.map(activity => {
    if (activity === selectedActivity) {
      return null;
    }

    return (
      <div className="row" key={activity}>
        <div className={activity === 'Spa Day' ? 'spa-bubble bubble' : `${activity.toLowerCase()}-bubble bubble`}></div>
        <div
          value={activity}
          onClick={handleChange}
          className="item"
        >
          {activity}
        </div>
      </div>
    );
  });

  return (
    <div ref={ref}>
      <div className="field input-container row">
        <label className="row">
          <div className="activity-label col-half row">
             Activity
           </div>
        </label>
        <div className="activity-input col-half row">
          <div
            onClick={() => setOpen(!open)}
            className={`ui selection dropdown activity col-half ${open ? 'visible active' : ''}`}
          >
            <i className="dropdown icon"></i>
            <div className="text">{selectedActivity}</div>
            <div className={`menu ${open ? 'visible transition' : ''}`}>
              {renderActivities}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;

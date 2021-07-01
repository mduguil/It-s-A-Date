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
      <div
        value={activity}
        key={activity}
        className="item"
        onClick={handleChange}
      >
        {activity}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field input-container row">
        <label className="label">Activity</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selectedActivity}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderActivities}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;

// export default class InputActivity extends React.Component {
//   render() {
//     return (
//       <div className="input-container row">
//         <label className="row">
//           <div className="activity-label col-half row">
//             Activity
//           </div>
//           <div className="activity-input col-half row">
//             <select
//               className="activity col-half"
//               value={this.props.selectedActivity}
//               onChange={this.props.handleChange}
//               required
//             >
//               {
//               this.props.options.map(activity => {
//                 return (
//                   <activity value={activity} key={activity} className={activity.toLowerCase()}>{activity}</activity>
//                 );
//               })
//               }
//             </select>
//           </div>
//         </label>
//       </div>
//     );
//   }
// }

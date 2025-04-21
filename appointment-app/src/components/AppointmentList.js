import React from 'react';

const AppointmentList = ({ appointments, onEdit, onDelete }) => {
  if (!appointments.length) {
    return <p>No appointments found. Create one!</p>;
  }

  return (
    <div className="appointment-list">
      {appointments.map(appointment => (
        <div key={appointment.id} className="appointment-card">
          <div className="appointment-header">
            <h3>{appointment.title}</h3>
            <div className="appointment-actions">
              <button 
                onClick={() => onEdit(appointment)} 
                className="btn btn-edit"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(appointment.id)} 
                className="btn btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="appointment-details">
            <p>{appointment.description}</p>
            <div className="appointment-meta">
              <span>Date: {appointment.date}</span>
              <span>Time: {appointment.time}</span>
            </div>
            <div className="appointment-attendees">
              <strong>Attendees:</strong>
              <ul>
                {appointment.attendees.map((attendee, index) => (
                  <li key={index}>{attendee}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;

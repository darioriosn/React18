import React, { useState, useEffect } from 'react';

const AppointmentForm = ({ appointment, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    attendees: ''
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        title: appointment.title || '',
        description: appointment.description || '',
        date: appointment.date || '',
        time: appointment.time || '',
        attendees: appointment.attendees ? appointment.attendees.join(', ') : ''
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const attendeesArray = formData.attendees
      .split(',')
      .map(attendee => attendee.trim())
      .filter(attendee => attendee);

    onSubmit({
      ...formData,
      attendees: attendeesArray,
      id: appointment?.id
    });
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="time">Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="attendees">Attendees (comma separated)</label>
        <input
          type="text"
          id="attendees"
          name="attendees"
          value={formData.attendees}
          onChange={handleChange}
          placeholder="John Doe, Jane Smith"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {appointment ? 'Update' : 'Create'} Appointment
        </button>
        {onCancel && (
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AppointmentForm;

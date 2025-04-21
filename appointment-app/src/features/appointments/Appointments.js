import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAppointments, 
  addAppointment, 
  updateAppointment, 
  deleteAppointment 
} from './appointmentsSlice';
import AppointmentForm from '../../components/AppointmentForm';
import AppointmentList from '../../components/AppointmentList';

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector(state => state.appointments);
  const [editing, setEditing] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  const handleSubmit = (appointmentData) => {
    if (editing) {
      dispatch(updateAppointment(appointmentData));
      setEditing(null);
    } else {
      dispatch(addAppointment(appointmentData));
    }
    setIsFormVisible(false);
  };

  const handleEdit = (appointment) => {
    setEditing(appointment);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      dispatch(deleteAppointment(id));
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setIsFormVisible(false);
  };

  if (status === 'loading') {
    return <div>Loading appointments...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="appointments-container">
      <h1>Appointments</h1>
      
      {!isFormVisible ? (
        <button 
          className="btn btn-primary" 
          onClick={() => setIsFormVisible(true)}
        >
          Create New Appointment
        </button>
      ) : (
        <div className="form-container">
          <h2>{editing ? 'Edit Appointment' : 'Create New Appointment'}</h2>
          <AppointmentForm 
            appointment={editing} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel}
          />
        </div>
      )}

      {!isFormVisible && (
        <AppointmentList 
          appointments={appointments} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default Appointments;

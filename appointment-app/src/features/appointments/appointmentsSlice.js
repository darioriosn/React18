import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// For demo purposes, we'll use JSON Placeholder as a mock API
// In a real app, you would use your own API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Async thunks for CRUD operations
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async () => {
    const response = await axios.get(API_URL);
    // Transform the data to match our appointment structure
    return response.data.slice(0, 10).map(post => ({
      id: post.id,
      title: post.title,
      description: post.body,
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      attendees: ['John Doe']
    }));
  }
);

export const addAppointment = createAsyncThunk(
  'appointments/addAppointment',
  async (appointment) => {
    const response = await axios.post(API_URL, appointment);
    return { ...appointment, id: response.data.id };
  }
);

export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async (appointment) => {
    await axios.put(`${API_URL}/${appointment.id}`, appointment);
    return appointment;
  }
);

export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add appointment
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })
      // Update appointment
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(
          appointment => appointment.id === action.payload.id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      // Delete appointment
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter(
          appointment => appointment.id !== action.payload
        );
      });
  }
});

export default appointmentsSlice.reducer;

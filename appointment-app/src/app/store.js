import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from '../features/appointments/appointmentsSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
  },
});

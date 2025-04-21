import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Appointments from './features/appointments/Appointments';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Appointment Manager</h1>
        </header>
        <main>
          <Appointments />
        </main>
      </div>
    </Provider>
  );
}

export default App;

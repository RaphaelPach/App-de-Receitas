import React from 'react';
import './App.css';
import Login from './components/Login';
/* import rockGlass from './images/rockGlass.svg'; */
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Login />
    </Provider>
  );
}

export default App;

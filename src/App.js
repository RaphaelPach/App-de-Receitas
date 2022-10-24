import React from 'react';
import './App.css';
import Login from './context/components/Login';
/* import rockGlass from './images/rockGlass.svg'; */
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import Provider from './context/Provider';

function App() {
  return (
    <div>
      <Provider>
        <Login />
      </Provider>
    </div>
  );
}

export default App;

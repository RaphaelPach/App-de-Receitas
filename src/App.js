import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Meals from './components/Meals';
/* import rockGlass from './images/rockGlass.svg'; */
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
      </Switch>
    </Provider>
  );
}

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Meals from './components/Meals';
import Provider from './context/Provider';
import Drinks from './components/Drinks';
import DoneRecipes from './components/DoneRecipes';
import Profile from './components/Profile';
import FavoriteRecipes from './components/FavoriteRecipes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Meals } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

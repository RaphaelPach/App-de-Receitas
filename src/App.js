import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Meals from './components/Meals';
import Provider from './context/Provider';
import Drinks from './components/Drinks';
import DoneRecipes from './components/DoneRecipes';
import Profile from './components/Profile';
import RecipeDetails from './components/RecipeDetails';
import FavoriteRecipes from './components/FavoriteRecipes';
import Footer from './components/Footer';
import DrinksInProgress from './components/DrinksInProgress';
import MealsInProgress from './components/MealsInProgress';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route
          exact
          path="/meals/:id"
          render={
            (routeProps) => <RecipeDetails type="meal" { ...routeProps } />
          }
        />
        <Route
          exact
          path="/drinks/:id"
          render={
            (routeProps) => <RecipeDetails type="drink" { ...routeProps } />
          }
        />
        <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
        <Route exact path="/meals/:id/in-progress" component={ MealsInProgress } />
        <Route exact path="/footer" component={ Footer } />
      </Switch>
    </Provider>
  );
}

export default App;

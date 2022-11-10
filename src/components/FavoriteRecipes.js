import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from './Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function FavoritesRecipes() {
  const [favoritesItens, setFavoritesItens] = useState([]);
  const [sharedMessage, setSharedMessage] = useState(false);

  useEffect(() => {
    setFavoritesItens(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const filterByType = (filter) => {
    if (filter === '') {
      return setFavoritesItens(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
    const doneRecipies = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoritesItens(doneRecipies.filter((e) => e.type === filter));
  };

  const handleClickShare = (type, id) => {
    if (type === 'meal') {
      copy(`http://localhost:3000/meals/${id}`);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
    }
    setSharedMessage(true);
  };

  if (sharedMessage === true) {
    const time = 2000;
    const HidePopUp = () => setSharedMessage(false);
    setTimeout(HidePopUp, time);
  }

  const cardsForDoneRecipies = () => favoritesItens
    ?.map((e, index) => (
      <div key={ e.id }>
        <Link to={ e.type === 'meal' ? `/meals/${e.id}` : `/drinks/${e.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            key={ e.id }
            src={ e.image }
            alt={ e.name }
            style={ { width: '100%' } }
          />
        </Link>
        <Link to={ e.type === 'meal' ? `/meals/${e.id}` : `/drinks/${e.id}` }>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { `Nome: ${e.name}` }
          </p>
        </Link>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { e.type === 'meal'
            ? `${e.nationality} - ${e.category}` : `${e.alcoholicOrNot}` }
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          { `Categoria: ${e.doneDate}` }
        </p>
        <button type="button" onClick={ () => handleClickShare(e.type, e.id) }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="whiteHeart"
            style={ { marginRight: '4px' } }
          />
        </button>
        <button type="button">
          <img
            src={ blackHeartIcon }
            alt="blackHeart"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    ));

  return (
    <div>
      { sharedMessage && (
        <div
          style={ {
            display: 'block',
            textAlign: 'center',
            backgroundColor: 'lightgoldenrodyellow',
            position: 'fixed',
            width: '100%',
          } }
        >
          <p id="link">Link copied!</p>
          <button
            type="button"
            onClick={ () => setSharedMessage(false) }
          >
            Fechar
          </button>
        </div>
      ) }
      <Header title="Favorite Recipes" profile />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterByType('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => filterByType('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterByType('drink') }
      >
        Drinks
      </button>
      <div>
        { cardsForDoneRecipies() }
      </div>
    </div>
  );
}

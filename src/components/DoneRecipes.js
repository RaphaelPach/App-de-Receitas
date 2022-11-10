import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import Header from './Header';

const copy = require('clipboard-copy');

export default function DoneRecipes(props) {
  const { history: { location: { pathname } } } = props;

  const [favoritesItens, setFavoritesItens] = useState([]);
  const [sharedMessage, setSharedMessage] = useState(false);

  useEffect(() => {
    setFavoritesItens(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  useEffect(() => {
    console.log(favoritesItens);
  }, [favoritesItens]);

  const handleClickShare = () => {
    copy(`http://localhost:3000${pathname}`);
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
        <img
          data-testid={ `${index}-horizontal-image` }
          key={ e.id }
          src={ e.image }
          alt={ e.name }
          style={ { width: '100%' } }
        />
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { `Nome: ${e.name}` }
        </p>
        {/* <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `Categoria: ${e.category}` }
        </p> */}
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          { `Categoria: ${e.doneDate}` }
        </p>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {
            e.type === 'meal' ? `${e.nationality} - ${e.category}` : `${e.alcoholicOrNot}`
          }
        </p>
        {
          e.tags.map((el) => (
            <p
              key={ el }
              data-testid={ `${index}-${el}-horizontal-tag` }
            >
              { `Categoria: ${el}` }
            </p>
          ))
        }
        <button type="button" onClick={ handleClickShare }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="whiteHeart"
            style={ { marginRight: '4px' } }
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
          <p>Link copied!</p>
          <button
            type="button"
            onClick={ () => setSharedMessage(false) }
          >
            Fechar
          </button>
        </div>
      ) }
      <Header title="Done Recipes" profile />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <div>
        { cardsForDoneRecipies() }
      </div>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

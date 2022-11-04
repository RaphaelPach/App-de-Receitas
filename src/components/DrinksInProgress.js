import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DetailsDrinks(props) {
  const { id } = props;

  const [data, setData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [sharedMessage, setSharedMessage] = useState(false);

  useEffect(() => {
    const fetchId = async (itemId) => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`;
      const response = await fetch(URL);
      const { drinks } = await response.json();

      setData(drinks[0]);
      setIngredients(
        Object.keys(drinks[0]).filter((e) => e.includes('strIng')),
      );

      return drinks[0];
    };

    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    fetchId(id);
  }, [id]);

  useEffect(() => {
    if (favoriteRecipes && favoriteRecipes.some((e) => e.id === data.idDrink)) {
      setIsFavorite(true);
    }
  }, [data, favoriteRecipes]);

  const handleClickShare = () => {
    const {
      history: {
        location: { pathname },
      },
    } = props;
    copy(`http://localhost:3000${pathname}`);
    setSharedMessage(true);
  };

  if (sharedMessage === true) {
    const time = 5000;
    const HidePopUp = () => setSharedMessage(false);
    setTimeout(HidePopUp, time);
  }

  const handleClickFavorite = () => {
    if (favoriteRecipes && favoriteRecipes.some((e) => e.id === data.idDrink)) {
      const newFavorites = favoriteRecipes.filter((e) => e.id !== data.idDrink);

      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavoriteRecipes(newFavorites);
      setIsFavorite(false);

      return null;
    }

    const recipe = {
      id: data.idDrink,
      type: 'drink',
      nationality: '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic,
      name: data.strDrink,
      image: data.strDrinkThumb,
    };

    if (favoriteRecipes) {
      const atualFavorites = [...favoriteRecipes, recipe];

      localStorage.setItem('favoriteRecipes', JSON.stringify(atualFavorites));
      setFavoriteRecipes(atualFavorites);
      setIsFavorite(true);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
      setFavoriteRecipes([recipe]);
      setIsFavorite(true);
    }
  };

  return (
    <>
      <Carousel show={ 2 } type="meals" />
      <div>
        <h1 data-testid="recipe-title">{data.strDrink}</h1>
        <p data-testid="recipe-category">{data.strAlcoholic}</p>
        <div style={ { position: 'absolute' } }>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ handleClickShare }
          >
            <img
              src={ shareIcon }
              alt="whiteHeart"
              style={ { marginRight: '4px' } }
            />
          </button>
          <button
            data-testid="favorite-btn"
            type="button"
            onClick={ handleClickFavorite }
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="whiteHeart"
            />
          </button>
        </div>
        {sharedMessage && (
          <div
            style={ {
              display: 'block',
              textAlign: 'center',
              backgroundColor: 'lightgoldenrodyellow',
              position: 'absolute',
              width: '100%',
            } }
          >
            <p>Link copied!</p>
            <button type="button" onClick={ () => setSharedMessage(false) }>
              Fechar
            </button>
          </div>
        )}
        <img
          data-testid="recipe-photo"
          src={ data.strDrinkThumb }
          alt={ data.strDrink }
          style={ { width: '100%' } }
        />
        <p data-testid="instructions">{data.strInstructions}</p>
        {ingredients?.map((e, i) => (
          <div data-testid={ `${i}-ingredient-name-and-measure` } key={ e }>
            <p>{data[e]}</p>
            <p>{data[`strMeasure${i + 1}`]}</p>
          </div>
        ))}
      </div>
      <button data-testid="finish-recipe-btn" type="button">
        Finish recipe
      </button>
    </>
  );
}

DetailsDrinks.propTypes = {
  history: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

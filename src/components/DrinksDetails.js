import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import StartRecipe from './StartRecipe';

export default function DetailsDrinks(props) {
  const { id } = props;

  const [data, setData] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchId = async (itemId) => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`;
      const response = await fetch(URL);
      const { drinks } = await response.json();

      setData(drinks[0]);
      setIngredients(Object.keys(drinks[0]).filter((e) => e.includes('strIng')));
    };

    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    fetchId(id);
  }, [id]);

  const recipeButton = (name, itemId) => {
    if (inProgress && inProgress.drinks) {
      const result = Object.keys(inProgress.drinks).some((e) => e === itemId);

      if (result) {
        return doneRecipes?.filter((e) => e.name === name)
          .length < 0 ? null
          : <StartRecipe inProgress id={ itemId } type="drinks" />;
      }
    }

    return doneRecipes?.filter((e) => e.name === name)
      .length < 0 ? null
      : <StartRecipe id={ itemId } type="drinks" />;
  };

  const handleClickFavorite = () => {
    const recipe = {
      id: data.idDrink,
      type: 'drink',
      nationality: '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic,
      name: data.strDrink,
      image: data.strDrinkThumb,
    };

    if (favoriteRecipes && favoriteRecipes.some((e) => e.id === data.idDrink)) {
      return null;
    }

    if (favoriteRecipes) {
      const atualFavorites = [...favoriteRecipes, recipe];

      localStorage.setItem('favoriteRecipes', JSON.stringify(atualFavorites));
      setFavoriteRecipes(atualFavorites);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
      setFavoriteRecipes([recipe]);
    }
  };

  return (
    <>
      <Carousel show={ 2 } type="meals" />
      <div>
        <h1 data-testid="recipe-title">{ data.strDrink }</h1>
        <p data-testid="recipe-category">{ data.strAlcoholic }</p>
        <div style={ { position: 'absolute' } }>
          <button type="button">
            <img
              src={ shareIcon }
              alt="whiteHeart"
              data-testid="share-btn"
              style={ { marginRight: '4px' } }
            />
          </button>
          <button type="button" onClick={ handleClickFavorite }>
            <img
              src={ whiteHeartIcon }
              alt="whiteHeart"
              data-testid="favorite-btn"
            />
          </button>
        </div>
        <img
          data-testid="recipe-photo"
          src={ data.strDrinkThumb }
          alt={ data.strDrink }
          style={ { width: '100%' } }
        />
        <p data-testid="instructions">{ data.strInstructions }</p>
        {
          ingredients?.map((e, i) => (
            <div data-testid={ `${i}-ingredient-name-and-measure` } key={ e }>
              <p>{data[e]}</p>
              <p>{ data[`strMeasure${i + 1}`] }</p>
            </div>
          ))
        }
      </div>
      {
        recipeButton(data.strDrink, data.idDrink)
      }
    </>
  );
}

DetailsDrinks.propTypes = {
  id: PropTypes.string.isRequired,
};

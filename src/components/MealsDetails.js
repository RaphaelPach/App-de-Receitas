import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import StartRecipe from './StartRecipe';

const copy = require('clipboard-copy');

export default function MealsDetails(props) {
  const { id, history: { location: { pathname } } } = props;

  const [data, setData] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [sharedMessage, setSharedMessage] = useState(false);

  useEffect(() => {
    const fetchId = async (itemId) => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`;
      const response = await fetch(URL);
      const { meals } = await response.json();
      setData(meals[0]);
      setIngredients(Object.keys(meals[0]).filter((e) => e.includes('strIng')));

      const embedVideo = meals[0].strYoutube.replace('watch?v=', 'embed/');
      setVideoUrl(embedVideo);
    };

    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    fetchId(id);
  }, [id]);

  useEffect(() => {
    if (favoriteRecipes && favoriteRecipes.some((e) => e.id === data.idMeal)) {
      setIsFavorite(true);
    }
  }, [data, favoriteRecipes]);

  const handleClickShare = () => {
    // const { history: { location: { pathname } } } = props;
    copy(`http://localhost:3000${pathname}`);
    setSharedMessage(true);
  };

  if (sharedMessage === true) {
    const time = 5000;
    const HidePopUp = () => setSharedMessage(false);
    setTimeout(HidePopUp, time);
  }

  const handleClickFavorite = () => {
    const recipe = {
      id: data.idMeal,
      type: 'meal',
      nationality: data.strArea,
      category: data.strCategory,
      alcoholicOrNot: '',
      name: data.strMeal,
      image: data.strMealThumb,
    };

    if (favoriteRecipes && favoriteRecipes.some((e) => e.id === data.idMeal)) {
      return null;
    }

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

  const recipeButton = (name, itemId) => {
    if (inProgress && inProgress.meals) {
      const result = Object.keys(inProgress.meals).some((e) => e === itemId);

      if (result) {
        return doneRecipes?.filter((e) => e.name === name).length < 0 ? null : (
          <StartRecipe inProgress id={ itemId } type="meals" />
        );
      }
    }

    return doneRecipes?.filter((e) => e.name === name).length < 0 ? null : (
      <StartRecipe id={ itemId } type="meals" />
    );
  };

  return (
    <>
      <Carousel show={ 2 } type="drinks" />
      <div>
        <h1 data-testid="recipe-title">{data.strMeal}</h1>
        <p data-testid="recipe-category">{data.strCategory}</p>
        <div style={ { display: 'flex', position: 'absolute' } }>
          <button type="button" onClick={ handleClickShare }>
            <img
              src={ shareIcon }
              alt="whiteHeart"
              data-testid="share-btn"
              style={ { marginRight: '4px' } }
            />
          </button>
          <button type="button" onClick={ handleClickFavorite }>
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="whiteHeart"
              data-testid="favorite-btn"
            />
          </button>
        </div>
        { sharedMessage && (
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
            <button
              type="button"
              onClick={ () => setSharedMessage(false) }
            >
              Fechar
            </button>
          </div>
        ) }
        <img
          data-testid="recipe-photo"
          src={ data.strMealThumb }
          alt={ data.strMeal }
          style={ { width: '100%' } }
        />
        <p data-testid="instructions">{data.strInstructions}</p>
        {ingredients?.map((e, i) => (
          <div data-testid={ `${i}-ingredient-name-and-measure` } key={ e }>
            <p>{data[e]}</p>
            <p>{data[`strMeasure${i + 1}`]}</p>
          </div>
        ))}
        <iframe data-testid="video" src={ videoUrl } title="Recipe Video" />
      </div>

      {recipeButton(data.strMeal, data.idMeal)}
    </>
  );
}
// Requisito 28 e 29 adiconado
MealsDetails.propTypes = {
  history: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

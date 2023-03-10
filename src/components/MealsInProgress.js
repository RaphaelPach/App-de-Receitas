import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function MealsInProgress(props) {
  const {
    id,
    history: {
      location: { pathname },
    },
  } = props;

  const [data, setData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inProgress, setInProgress] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
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
    fetchId(id);
  }, [id]);

  useEffect(() => {
    const initial = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!initial) {
      const storage = {
        drinks: {},
        meals: {},
      };

      setInProgress(storage);
      localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
    } else {
      setInProgress(initial);
    }
  }, []);

  useEffect(() => {
    if (favoriteRecipes && favoriteRecipes.some((e) => e.id === data.idMeal)) {
      setIsFavorite(true);
    }
  }, [data, favoriteRecipes]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }, [inProgress]);

  const handleClickShare = () => {
    // const { history: { location: { pathname } } } = props;
    const path = pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${path}`);
    setSharedMessage(true);
  };

  if (sharedMessage === true) {
    const time = 5000;
    const HidePopUp = () => setSharedMessage(false);
    setTimeout(HidePopUp, time);
  }

  const handleClickFavorite = () => {
    if (favoriteRecipes && favoriteRecipes.some((e) => e.id === data.idMeal)) {
      const newFavorites = favoriteRecipes.filter((e) => e.id !== data.idMeal);

      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavoriteRecipes(newFavorites);
      setIsFavorite(false);
      return null;
    }

    const recipe = {
      id: data.idMeal,
      type: 'meal',
      nationality: data.strArea,
      category: data.strCategory,
      alcoholicOrNot: '',
      name: data.strMeal,
      image: data.strMealThumb,
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

  const checkIngredient = ({ target }, e) => {
    const ingredientNumber = e.replace(/[^0-9]/g, '');

    const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (target.parentNode.className.includes('finished')) {
      target.parentNode.className = '';

      const newObj = {
        ...obj,
        meals: {
          ...obj.meals,
          [id]: obj.meals[id].filter((item) => item !== Number(ingredientNumber)),
        },
      };
      setInProgress(newObj);
    } else {
      target.parentNode.className = 'finished';

      const alredyInStorage = Object.keys(obj.meals);
      if (alredyInStorage.some((z) => z === id)) {
        const newObj = {
          ...obj,
          meals: {
            ...obj.meals,
            [id]: [...obj.meals[id], Number(ingredientNumber)],
          },
        };
        setInProgress(newObj);
      } else {
        const newObj = {
          ...obj,
          meals: {
            ...obj.meals,
            [id]: [Number(ingredientNumber)],
          },
        };
        setInProgress(newObj);
      }
    }
  };

  return (
    <>
      <Carousel show={ 2 } type="drinks" />
      <div>
        <h1 data-testid="recipe-title">{data.strMeal}</h1>
        <p data-testid="recipe-category">{data.strCategory}</p>
        <div style={ { display: 'flex', position: 'absolute' } }>
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
          src={ data.strMealThumb }
          alt={ data.strMeal }
          style={ { width: '100%' } }
        />
        <p data-testid="instructions">{data.strInstructions}</p>
        {ingredients
          ?.filter((a) => data[a]?.length > 0)
          .map((e, i) => (
            <div data-testid={ `${i}-ingredient-name-and-measure` } key={ e }>
              <label
                className={
                  inProgress?.meals[id]?.some((a) => `strIngredient${a}` === e)
                    ? 'finished'
                    : ''
                }
                data-testid={ `${i}-ingredient-step` }
                htmlFor={ data[e] }
              >
                <input
                  onClick={ (event) => checkIngredient(event, e) }
                  defaultChecked={
                    inProgress?.meals[id]?.some((a) => `strIngredient${a}` === e)
                  }
                  id={ data[e] }
                  type="checkbox"
                  value={ data[e] }
                />
                {data[e]}
                <p>{data[`strMeasure${i + 1}`]}</p>
              </label>
            </div>
          ))}
        <iframe data-testid="video" src={ videoUrl } title="Recipe Video" />
      </div>

      <button data-testid="finish-recipe-btn" type="button">
        Finish recipe
      </button>
    </>
  );
}

export default MealsInProgress;
MealsInProgress.propTypes = {
  history: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
};

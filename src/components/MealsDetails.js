import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import StartRecipe from './StartRecipe';


export default function MealsDetails(props) {
  const { id } = props;

  const [data, setData] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchId = async (itemId) => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`;
      const response = await fetch(URL);
      const { meals } = await response.json();
      console.log(meals[0]);
      setData(meals[0]);
      setIngredients(Object.keys(meals[0]).filter((e) => e.includes('strIng')));

      const embedVideo = meals[0].strYoutube.replace('watch?v=', 'embed/');
      setVideoUrl(embedVideo);
    };

    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    fetchId(id);
  }, [id]);

  const copy = required('clipboard-copy');

  const handleClick = () => {
    copy('This is some cool text');
    console.log(copy);
  };
  
  const handleClick2 = () => console.log('click2');

  const recipeButton = (name, itemId) => {
    if (inProgress && inProgress.meals) {
      const result = Object.keys(inProgress.meals).some((e) => e === itemId);

      if (result) {
        return doneRecipes?.filter((e) => e.name === name)
          .length < 0 ? null
          : <StartRecipe inProgress />;
      }
    }

    return doneRecipes?.filter((e) => e.name === name)
      .length < 0 ? null
      : <StartRecipe />;
  };


  return (
    <>
      <Carousel show={ 2 } type="drinks" />
      <div>
        <h1 data-testid="recipe-title">{ data.strMeal }</h1>
        <p data-testid="recipe-category">{ data.strCategory }</p>
        <div style={ { display: 'flex', position: 'absolute' } }>
          <img
            onClick={ () => handleClick() }
            src={ shareIcon }
            alt="whiteHeart"
            data-testid="share-btn"
            style={ { marginRight: '4px' } }
          />
          <img
            onClick={ () => handleClick2() }
            src={ whiteHeartIcon }
            alt="whiteHeart"
            data-testid="favorite-btn"
          />
        </div>
        <img
          data-testid="recipe-photo"
          src={ data.strMealThumb }
          alt={ data.strMeal }
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
        <iframe data-testid="video" src={ videoUrl } title="Recipe Video" />
      </div>

      {
        recipeButton(data.strMeal, data.idMeal)
      }

    </>
  );
}
// Requisito 28 e 29 adiconado
MealsDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

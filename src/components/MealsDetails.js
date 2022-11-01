import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import StartRecipe from './StartRecipe';

export default function MealsDetails(props) {
  const { id } = props;

  const [data, setData] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

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

    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    fetchId(id);
  }, [id]);

  return (
    <>
      <Carousel show={ 2 } type="drinks" />
      <div>
        <h1 data-testid="recipe-title">{ data.strMeal }</h1>
        <p data-testid="recipe-category">{ data.strCategory }</p>
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
        doneRecipes?.filter((e) => e.name === data.strMeal)
          .length === 0 && <StartRecipe />
      }
    </>
  );
}
// Requisito 28 e 29 adiconado
MealsDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import StartRecipe from './StartRecipe';

export default function DetailsDrinks(props) {
  const { match: { params: { id } } } = props;

  const [data, setData] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchId = async (itemId) => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`;
      const response = await fetch(URL);
      const { drinks } = await response.json();

      setData(drinks[0]);
      setIngredients(Object.keys(drinks[0]).filter((e) => e.includes('strIng')));
    };

    fetchId(id);
  }, [id]);

  return (
    <>
      <Carousel show={ 2 } type="meals" />
      <div>
        <h1 data-testid="recipe-title">{ data.strDrink }</h1>
        <p data-testid="recipe-category">{ data.strAlcoholic }</p>
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
      <StartRecipe />
    </>
  );
}

DetailsDrinks.propTypes = {
  match: PropTypes.shape().isRequired,
};

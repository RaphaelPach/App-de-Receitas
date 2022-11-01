import React from 'react';
import PropTypes from 'prop-types';
import DrinksDetails from './DrinksDetails';
import MealsDetails from './MealsDetails';

export default function RecipeDetails(props) {
  const { type, match: { params: { id } } } = props;
  console.log(type, id);
  return (
    <>
      {
        type === 'meal' && <MealsDetails id={ id } />
      }
      {
        type === 'drink' && <DrinksDetails id={ id } />
      }
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

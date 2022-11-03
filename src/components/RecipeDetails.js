import React from 'react';
import PropTypes from 'prop-types';
import DrinksDetails from './DrinksDetails';
import MealsDetails from './MealsDetails';

export default function RecipeDetails(props) {
  const { type, match: { params: { id } } } = props;
  return (
    <>
      {
        type === 'meal' && <MealsDetails id={ id } { ...props } />
      }
      {
        type === 'drink' && <DrinksDetails id={ id } { ...props } />
      }
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
};

RecipeDetails.defaultProps = {
  id: '0',
};

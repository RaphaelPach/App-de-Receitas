import React from 'react';
import PropTypes from 'prop-types';
import DrinksInProgress from './DrinksInProgress';
import MealsInProgress from './MealsInProgress';

export default function RecipeInProgress(props) {
  const { type, match: { params: { id } } } = props;

  return (
    <div>
      {
        type === 'drinks' ? (
          <DrinksInProgress { ...props } id={ id } />
        ) : <MealsInProgress { ...props } id={ id } />
      }
    </div>
  );
}

RecipeInProgress.propTypes = {
  type: PropTypes.string.isRequired,
  match: PropTypes.shape().isRequired,
};

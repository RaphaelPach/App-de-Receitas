import React from 'react';
import PropTypes from 'prop-types';
import '../css/startrecipe.css';

export default function StartRecipe(props) {
  const { inProgress } = props;

  return (
    <button
      data-testid="start-recipe-btn"
      className="start-recipe"
      name="Start Recipe"
      type="button"
      aria-label="start-recipe"
    >
      {inProgress ? 'Continue Recipe' : 'Start recipe' }
    </button>
  );
}

StartRecipe.propTypes = {
  inProgress: PropTypes.bool,
};

StartRecipe.defaultProps = {
  inProgress: false,
};

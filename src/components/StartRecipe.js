import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/startrecipe.css';

export default function StartRecipe(props) {
  const { inProgress, type, id } = props;

  return (
    <Link to={ `/${type}/${id}/in-progress` }>
      <button
        data-testid="start-recipe-btn"
        className="start-recipe"
        name="Start Recipe"
        type="button"
        aria-label="start-recipe"
      >
        {inProgress ? 'Continue Recipe' : 'Start recipe' }
      </button>
    </Link>
  );
}

StartRecipe.propTypes = {
  inProgress: PropTypes.bool,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

StartRecipe.defaultProps = {
  inProgress: false,
};

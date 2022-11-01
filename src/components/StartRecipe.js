import React from 'react';
import '../css/startrecipe.css';

export default function StartRecipe() {
  return (
    <button
      data-testid="start-recipe-btn"
      className="start-recipe"
      name="Start Recipe"
      type="button"
      aria-label="start-recipe"
    >
      Start recipe
    </button>
  );
}

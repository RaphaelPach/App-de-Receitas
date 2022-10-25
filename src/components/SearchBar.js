import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input
        type="text"
        placeholder="pesquisar"
        data-testid="search-input"
      />

      <label htmlFor="ingredientSearch">
        Ingrediente:
        <input
          type="radio"
          id="ingredientSearch"
          name="filter"
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="nameSearch">
        Nome:
        <input
          type="radio"
          id="nameSearch"
          name="filter"
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="firstLetterSearch">
        Primeira Letra:
        <input
          type="radio"
          id="firstLetterSearch"
          name="filter"
          data-testid="first-letter-search-radio"
        />
      </label>

      <button type="button" data-testid="exec-search-btn">Pesquisar</button>
    </div>
  );
}

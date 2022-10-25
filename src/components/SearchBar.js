import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

export default function SearchBar() {
  const {
    getFoodByIngredient,
    getFoodByName,
    getFoodByFirstLetter,
  } = useContext(AppContext);
  const [option, setOption] = useState('ingredient');
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (option === 'ingredient') {
      getFoodByIngredient(search);
    }

    if (option === 'name') {
      getFoodByName(search);
      console.log('entrou em name');
    }

    if (option === 'firstLetter') {
      if (search.length === 1) {
        getFoodByFirstLetter(search);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  const searchValue = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="pesquisar"
        value={ search }
        onChange={ searchValue }
        data-testid="search-input"
      />

      <label htmlFor="ingredientSearch">
        Ingrediente:
        <input
          type="radio"
          id="ingredientSearch"
          onClick={ () => setOption('ingredient') }
          name="filter"
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="nameSearch">
        Nome:
        <input
          type="radio"
          id="nameSearch"
          onClick={ () => setOption('name') }
          name="filter"
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="firstLetterSearch">
        Primeira Letra:
        <input
          type="radio"
          id="firstLetterSearch"
          onClick={ () => setOption('firstLetter') }
          name="filter"
          data-testid="first-letter-search-radio"
        />
      </label>

      <button
        onClick={ handleSearch }
        type="button"
        data-testid="exec-search-btn"
      >
        Pesquisar

      </button>
    </div>
  );
}

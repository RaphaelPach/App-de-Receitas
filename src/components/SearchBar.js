import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export default function SearchBar(props) {
  const { history: { location: { pathname } } } = props;

  const {
    getFoodByIngredient,
    getFoodByName,
    getFoodByFirstLetter,
    getDrinkByIngredient,
    getDrinksByName,
    getDrinksByFirstLetter,
    foodList,
    setFoodList,
    drinkList,
    setDrinkList,
  } = useContext(AppContext);

  const [option, setOption] = useState('ingredient');
  const [search, setSearch] = useState('');

  useEffect(() => {

  }, []);

  useEffect(() => {
    const { history } = props;
    if (foodList?.length === 1) {
      const id = foodList[0].idMeal;
      history.push(`/meals/${id}`);
      setFoodList([]);
    }
  }, [foodList, props, setFoodList]);

  useEffect(() => {
    const { history } = props;
    if (drinkList?.length === 1) {
      const id = drinkList[0].idDrink;
      history.push(`/drinks/${id}`);
      setDrinkList([]);
    }
  }, [drinkList, props, setDrinkList]);

  const searchFood = () => {
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
    } else {
      global.alert(`${'Sorry, we haven\'t found any recipes for these filters.'}`);
    }
  };

  const searchDrink = () => {
    if (option === 'ingredient') {
      getDrinkByIngredient(search);
    }

    if (option === 'name') {
      getDrinksByName(search);
      console.log('entrou em name');
    }

    if (option === 'firstLetter') {
      if (search.length === 1) {
        getDrinksByFirstLetter(search);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    } else {
      global.alert(`${'Sorry, we haven\'t found any recipes for these filters.'}`);
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
        onClick={ pathname === '/meals' ? searchFood : searchDrink }
        type="button"
        data-testid="exec-search-btn"
      >
        Pesquisar

      </button>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape().isRequired,
};

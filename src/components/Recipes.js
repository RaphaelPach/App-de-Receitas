import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export default function CategoriesFilter(props) {
  const { drinks, meals } = props;

  const [categories, setCategories] = useState([{}]);
  const { getDrinkByCategory,
    getFoodByCategory, getFoods, getDrinks } = useContext(AppContext);

  useEffect(() => {
    const fetchCategoriesFoods = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(URL);
      const data = await response.json();

      setCategories(data.meals);
    };

    const fetchCategoriesDrinks = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(URL);
      const data = await response.json();

      setCategories(data.drinks);
    };

    if (meals) {
      fetchCategoriesFoods();
    }

    if (drinks) {
      fetchCategoriesDrinks();
    }
  }, [meals, drinks]);

  const FIVE = 5;

  return (
    <div>
      {categories?.filter((ele, index) => index < FIVE).map((e, i) => (
        <button
          data-testid={ `${e.strCategory}-category-filter` }
          onClick={ meals ? () => getFoodByCategory(e.strCategory)
            : () => getDrinkByCategory(e.strCategory) }
          type="button"
          key={ `${e.strCategory}-${i}` }
        >
          { e.strCategory }
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ meals ? getFoods : getDrinks }
        type="button"
      >
        All
      </button>
    </div>
  );
}

CategoriesFilter.propTypes = {
  drinks: PropTypes.bool,
  meals: PropTypes.bool,
};

CategoriesFilter.defaultProps = {
  drinks: false,
  meals: false,
};

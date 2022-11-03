import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from './Header';
import ItemCard from './ItemCard';
import Footer from './Footer';
import CategoriesFilter from './Recipes';

function Recipes(props) {
  const [getFood, setGetFood] = useState([]);

  const { foodList } = useContext(AppContext);
  const MAX_ITENS = 12;

  const renderFoodCards = (info) => info
    .filter((_, i) => i < MAX_ITENS)
    .map((e, index) => (
      <Link key={ e.idMeal } to={ `/meals/${e.idMeal}` }>
        <ItemCard
          index={ index }
          name={ e.strMeal }
          img={ e.strMealThumb }
        />
      </Link>
    ));

  useEffect(() => {
    const getFoodList = async () => {
      const responseName = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const { meals } = await responseName.json();
      setGetFood(renderFoodCards(meals));
    };
    getFoodList();
  }, []);

  return (
    <div>
      <Header { ...props } title="Meals" search profile />
      <CategoriesFilter meals />
      {
        foodList?.length > 0 ? renderFoodCards(foodList) : getFood
      }
      <Footer />
    </div>

  );
}

export default Recipes;

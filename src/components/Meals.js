import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import Header from './Header';
import ItemCard from './ItemCard';
import Footer from './Footer';

function Recipes(props) {
  const [getFood, setGetFood] = useState([]);

  const { foodList } = useContext(AppContext);
  const MAX_ITENS = 12;

  const renderFoodCards = (data) => data
    .filter((_, i) => i < MAX_ITENS)
    .map((e, index) => (<ItemCard
      key={ e.idMeal }
      index={ index }
      name={ e.strMeal }
      img={ e.strMealThumb }
    />));

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
      {
        foodList?.length > 0 ? renderFoodCards(foodList) : getFood
      }
      <Footer />
    </div>
  );
}

export default Recipes;

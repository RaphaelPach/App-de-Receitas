import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Header from './Header';
import ItemCard from './ItemCard';

function Recipes(props) {
  const { foodList } = useContext(AppContext);
  const MAX_ITENS = 12;

  return (
    <div>
      <Header { ...props } title="Meals" search profile />
      {
        foodList?.filter((_, i) => i < MAX_ITENS).map((e, index) => (<ItemCard
          key={ e.idMeal }
          index={ index }
          name={ e.strMeal }
          img={ e.strMealThumb }
        />))
      }
    </div>
  );
}

export default Recipes;

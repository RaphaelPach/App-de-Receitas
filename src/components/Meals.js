import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Header from './Header';
import ItemCard from './ItemCard';
import Footer from './Footer';

function Recipes(props) {
  const { foodList, getFoodByName } = useContext(AppContext);
  const MAX_ITENS = 12;

  // const getFood = () => {
  // };

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
        // foodList?.filter((_, i) => i < MAX_ITENS).map((e, index) => (<ItemCard
        //   key={ e.idMeal }
        //   index={ index }
        //   name={ e.strMeal }
        //   img={ e.strMealThumb }
        // />))
      }
      <Footer />
    </div>
  );
}

export default Recipes;

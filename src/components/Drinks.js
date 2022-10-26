import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Header from './Header';
import ItemCard from './ItemCard';

export default function Drinks(props) {
  const { drinkList } = useContext(AppContext);
  const MAX_ITENS = 12;

  return (
    <div>
      <Header { ...props } title="Drinks" profile search />

      {
        drinkList?.filter((_, i) => i < MAX_ITENS).map((e, index) => (<ItemCard
          key={ e.idDrink }
          index={ index }
          name={ e.strDrink }
          img={ e.strDrinkThumb }
        />))
      }
    </div>
  );
}

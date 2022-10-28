import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import Header from './Header';
import ItemCard from './ItemCard';
import Footer from './Footer';

export default function Drinks(props) {
  const [getDrink, setGetDrink] = useState([]);

  const { drinkList } = useContext(AppContext);
  const MAX_ITENS = 12;

  const renderDrinkCards = (data) => data
    .filter((_, i) => i < MAX_ITENS)
    .map((e, index) => (<ItemCard
      key={ e.idDrink }
      index={ index }
      name={ e.strDrink }
      img={ e.strDrinkThumb }
    />));

  useEffect(() => {
    const getDrinkList = async () => {
      const responseName = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      const { drinks } = await responseName.json();
      setGetDrink(renderDrinkCards(drinks));
    };
    getDrinkList();
  }, []);

  return (
    <div>
      <Header { ...props } title="Drinks" profile search />
      {
        drinkList.length > 0 ? renderDrinkCards(drinkList) : getDrink
      }
      <Footer />
    </div>
  );
}

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from './Header';
import ItemCard from './ItemCard';
import Footer from './Footer';
import CategoriesFilter from './Recipes';

export default function Drinks(props) {
  const [getDrink, setGetDrink] = useState([]);

  const { drinkList } = useContext(AppContext);
  const MAX_ITENS = 12;

  const renderDrinkCards = (data) => data
    .filter((_, i) => i < MAX_ITENS)
    .map((e, index) => (
      <Link key={ e.idDrink } to={ `/drinks/${e.idDrink}` }>
        <ItemCard
          index={ index }
          name={ e.strDrink }
          img={ e.strDrinkThumb }
        />
      </Link>
    ));

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
      <CategoriesFilter drinks />
      {/*   <Carousel show={ 2 } type="meals" /> */}
      {
        drinkList?.length > 0 ? renderDrinkCards(drinkList) : getDrink
      }
      <Footer />
    </div>
  );
}

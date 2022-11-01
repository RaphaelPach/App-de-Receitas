import PropTypes from 'prop-types';
import { useMemo, useState, useCallback, useEffect } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [disabled, setDisable] = useState(true);
  const [foodList, setFoodList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);

  const verifyBtn = useCallback(() => {
    const Regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const verifyEmail = Regex.test(email);
    const SEVEN = 7;
    const vPass = passWord.length >= SEVEN;
    setDisable(!(verifyEmail && vPass));
  }, [email, passWord]);

  const verifEmail = useCallback(({ target }) => {
    setEmail(target.value);
    /*  verifyBtn(); */
  }, []);
  const verifPassWord = useCallback(({ target }) => {
    setPassWord(target.value);
    /*  verifyBtn(); */
  }, []);

  const getFoods = async () => {
    const responseName = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await responseName.json();

    setFoodList(meals);
  };

  const GLOBAL_ALERT = `${'Sorry, we haven\'t found any recipes for these filters.'}`;
  const getFoodByIngredient = async (ingrediente) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
    );
    const { meals } = await response.json();
    setFoodList(meals);
    if (meals === null) {
      return global.alert(GLOBAL_ALERT);
    }
    return meals;
  };
  const getFoodByName = async (nome) => {
    const responseName = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`,
    );
    const { meals } = await responseName.json();
    setFoodList(meals);
    if (meals === null) {
      return global.alert(GLOBAL_ALERT);
    }
    return meals;
  };

  const getFoodByFirstLetter = async (primeiraLetra) => {
    const responseLetter = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`,
    );
    const { meals } = await responseLetter.json();
    console.log('log', meals);

    setFoodList(meals);
    return meals;
  };

  const getFoodByCategory = async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const { meals } = await response.json();

    setFoodList(meals);
  };

  const getDrinks = async () => {
    const responseName = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await responseName.json();
    setDrinkList(drinks);
  };

  const getDrinkByCategory = async (category) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const { drinks } = await response.json();
    setDrinkList(drinks);
  };

  const getDrinkByIngredient = async (ingrediente) => {
    const responseDrink = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
    );
    const { drinks } = await responseDrink.json();

    setDrinkList(drinks);
    if (drinks === null) {
      return global.alert(GLOBAL_ALERT);
    }
    return drinks;
  };

  const getDrinksByName = async (nome) => {
    const responseDrinkByName = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`,
    );
    const { drinks } = await responseDrinkByName.json();

    setDrinkList(drinks);
    if (drinks === null) {
      return global.alert(GLOBAL_ALERT);
    }
    return drinks;
  };

  const getDrinksByFirstLetter = async (primeiraLetra) => {
    const responseDrinkByFirstLetter = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`,
    );
    const { drinks } = await responseDrinkByFirstLetter.json();

    setDrinkList(drinks);
    return drinks;
  };
  useEffect(() => {
    verifyBtn();
  }, [email, passWord, verifyBtn]);

  const handleClickSubmit = useCallback(() => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
  }, [email]);

  const contexto = useMemo(
    () => ({
      email,
      passWord,
      disabled,
      verifEmail,
      verifPassWord,
      verifyBtn,
      handleClickSubmit,
      foodList,
      setFoodList,
      drinkList,
      setDrinkList,
      getFoods,
      getDrinks,
      getFoodByIngredient,
      getFoodByName,
      getFoodByFirstLetter,
      getDrinkByIngredient,
      getDrinksByName,
      getDrinksByFirstLetter,
      getDrinkByCategory,
      getFoodByCategory,

    }),
    [
      email,
      passWord,
      verifPassWord,
      verifEmail,
      verifyBtn,
      disabled,
      handleClickSubmit,
      drinkList,
      foodList,
      getFoodByIngredient,
      getFoodByName,

    ],
  );
  return <AppContext.Provider value={ contexto }>{children}</AppContext.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node,
  history: PropTypes.objectOf.isRequired,
}.isRequired;

export default Provider;

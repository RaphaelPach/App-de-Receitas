import PropTypes from 'prop-types';
import { useMemo, useState, useCallback, useEffect } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [disabled, setDisable] = useState(true);

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
  const getFoodByIngredient = async (ingrediente) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const { meals } = await response.json();
    console.log('log', meals);
    return meals;
  };
  const getFoodByName = async (nome) => {
    const responseName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
    const { meals } = await responseName.json();
    console.log('log', meals);
    return meals;
  };

  const getFoodByFirstLetter = async (primeiraLetra) => {
    const responseLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${primeiraLetra}`);
    const { meals } = await responseLetter.json();
    console.log('log', meals);
    return meals;
  };
  useEffect(() => {
    verifyBtn();
  }, [email, passWord, verifyBtn]);

  const handleClickSubmit = useCallback(() => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
  }, [email]);

  const contexto = useMemo(() => ({
    email,
    passWord,
    disabled,
    verifEmail,
    verifPassWord,
    verifyBtn,
    handleClickSubmit,
    getFoodByIngredient,
    getFoodByName,
    getFoodByFirstLetter,

  }), [email,
    passWord,
    verifPassWord,
    verifEmail,
    verifyBtn,
    disabled,
    handleClickSubmit]);
  return (
    <AppContext.Provider value={ contexto }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
  history: PropTypes.objectOf.isRequired,
}.isRequired;

export default Provider;

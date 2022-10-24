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

  useEffect(() => {
    verifyBtn();
  }, [email, passWord, verifyBtn]);

  const handleClickSubmit = () => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
  };

  const contexto = useMemo(() => ({
    email,
    passWord,
    disabled,
    verifEmail,
    verifPassWord,
    verifyBtn,
    handleClickSubmit,

  }), [email, passWord, verifPassWord, verifEmail, verifyBtn, disabled]);
  return (
    <AppContext.Provider value={ contexto }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;

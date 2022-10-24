import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Login() {
  const { email,
    passWord,
    verifEmail,
    verifPassWord,
    disabled, handleClickSubmit } = useContext(AppContext);

  return (
    <div>
      <label htmlFor="email">
        <input
          id="email"
          type="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ verifEmail }
          value={ email }
          required
        />

      </label>
      <label htmlFor="passWord">
        <input
          id="passWord"
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          onChange={ verifPassWord }
          value={ passWord }
          required
        />

      </label>
      <button
        type="button"
        disabled={ disabled }
        data-testid="login-submit-btn"
        onClick={ handleClickSubmit }
      >
        ENTRAR
      </button>
    </div>
  );
}

export default Login;

import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email">
        <input
          name="email"
          type="email"
          data-testid="email-input"
          placeholder="Email"

        />

      </label>
      <label htmlFor="pass">
        <input
          name="pass"
          type="password"
          data-testid="password-input"
          placeholder="Senha"

        />

      </label>
      <button type="button" data-testid="login-submit-btn">
        ENTRAR
      </button>
    </div>
  );
}

export default Login;

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';

describe('Testando App de Receitas', () => {
  it('Testando Funcionamento da tela de login', async () => {
    /* const { history } =  */renderWithRouter(<App />);
    const textBox = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(textBox, 'teste@teste.com');
    userEvent.type(password, '123456');
    expect(textBox).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    userEvent.click(btn);
    /* await waitFor(() => expect(history.location.pathname).toBe('/meals'), { timeout: 3000 }); */
  });
});

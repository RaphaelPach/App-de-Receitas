import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';
import meals from '../../cypress/mocks/meals';

// import renderWithContext from './services/renderWithRouter';

afterEach(() => jest.clearAllMocks());

describe.only('Implementa testes na tela de Busca', () => {
  test('Testa elementos na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));

    const { history } = renderWithRouter(<App />, ['/meals']);
    // act(() => {
    // history.push('/meals');
    // });
    expect(history.location.pathname).toBe('/meals');
    const iconSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBtn);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterRadio);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'p');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=p');
  });
});

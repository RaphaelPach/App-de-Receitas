import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';
import meals from '../../cypress/mocks/meals';

// import renderWithContext from './services/renderWithRouter';

afterEach(() => jest.clearAllMocks());

const ICON_SEARCH_BTN = 'search-top-btn';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';
const SEARCH_BTN = 'exec-search-btn';
const SEARCH_INPUT = 'search-input';

describe('Implementa testes na tela de Busca', () => {
  test('Testa elementos na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));

    const { history } = renderWithRouter(<App />, ['/meals']);
    // act(() => {
    // history.push('/meals');
    // });
    expect(history.location.pathname).toBe('/meals');
    const iconSearchBtn = screen.getByTestId(ICON_SEARCH_BTN);
    userEvent.click(iconSearchBtn);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    userEvent.click(firstLetterRadio);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'p');
    const searchBtn = screen.getByTestId();
    userEvent.click(searchBtn);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=p');
  });
  it('Testando Funcionamento do SearchBar', () => {
    act(() => {
      renderWithRouter(<App />);
    });

    const openSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(openSearchBar);

    /*  abriu searchBar */

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchBtn = screen.getByTestId(SEARCH_BTN);
    const ingredientFilter = screen.getByTestId('ingredient-search-radio');
    const nameFilter = screen.getByTestId('name-search-radio');
    const firstLetterFilter = screen.getByTestId(FIRST_LETTER_RADIO);

    expect(searchInput).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(ingredientFilter).toBeInTheDocument();
    expect(nameFilter).toBeInTheDocument();
    expect(firstLetterFilter).toBeInTheDocument();

    userEvent.click(ingredientFilter);
    userEvent.type(searchInput, 'chicken congee');
    // const ALERTVALUE = 'Your search must have only 1 (one) character';
    userEvent.click(firstLetterFilter);
    userEvent.type('aa');
    userEvent.click(searchBtn);
    userEvent.click(nameFilter);
    userEvent.type('chicken');

    userEvent.click(searchBtn);
  });
  it('Testando Drinks', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const searchIcon = screen.getByTestId(iconBtn);
    userEvent.click(searchIcon);
    const searchInp = screen.getByTestId(SEARCH_INPUT);
    const searchBtn = screen.getByTestId('exec-search-btn');
    const ingredientFilter = screen.getByTestId('ingredient-search-radio');
    const nameFilter = screen.getByTestId('name-search-radio');
    const firstLetterFilter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(ingredientFilter);
    userEvent.type(searchInp, 'mint');
    userEvent.click(firstLetterFilter);
    userEvent.type('bb');
    userEvent.click(nameFilter);
    userEvent.type('Mojito');
    userEvent.click(searchBtn);
  });

  it('Testando se a barra de busca desaparece', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    // const searchBtn = screen.getByTestId('exec-search-btn');
    // const ingredientFilter = screen.getByTestId('ingredient-search-radio');
    // const nameFilter = screen.getByTestId('name-search-radio');
    // const firstLetterFilter = screen.getByTestId('first-letter-search-radio');
    const searchIcon = screen.getByTestId(iconBtn);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT);

    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(screen.queryByTestId(SEARCH_INPUT)).toBeNull();
  });
});
